#!/usr/bin/env bash
set -euo pipefail

work_dir="/Users/MAC/hackathon-toolkit/active/flare-summer-signal"
audit_dir="$work_dir/research/roster-audit"
page_size=50
hackathon_id=2234
endpoint="https://dorahacks.io/api/v1/hub/hackathons/$hackathon_id/hackers"
referer="https://dorahacks.io/hackathon/flaresummersignal/hackers"
user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
event_start="2026-06-29T00:00:00Z"

mkdir -p \
  "$audit_dir/derived" \
  "$audit_dir/github/audits" \
  "$audit_dir/github/profiles" \
  "$audit_dir/github/repos" \
  "$audit_dir/github/readmes" \
  "$audit_dir/errors"

fetch_page() {
  local page="$1"
  curl --retry 3 --retry-all-errors -fsS \
    -H 'hackerlink-token: undefined' \
    -H "referer: $referer" \
    -H 'content-language: en-US' \
    -H 'accept: application/json, text/plain, */*' \
    -H "user-agent: $user_agent" \
    "$endpoint?page=$page&page_size=$page_size&include_following=true"
}

normalize_roster() {
  jq -s '[.[].results[]] | unique_by(.id)' "$audit_dir"/page-*.json \
    > "$audit_dir/derived/roster.json"

  jq -r '
    ["registration_id","hacker_id","username","nickname","github_raw","registered_at"],
    (.[] | [
      .id,
      .hacker.id,
      .hacker.username,
      (.hacker.nick_name // ""),
      (.hacker.github_v2 // ""),
      .created_at
    ]) | @csv
  ' "$audit_dir/derived/roster.json" > "$audit_dir/roster.csv"
}

extract_github_handles() {
  jq -r '
    .[] | .hacker.github_v2 // empty
    | gsub("^[[:space:]]+|[[:space:]]+$"; "")
    | select(length > 0)
    | sub("^https?://(www\\.)?github\\.com/"; ""; "i")
    | sub("^github\\.com/"; ""; "i")
    | sub("^@"; "")
    | split("?")[0] | split("#")[0] | split("/")[0]
    | select(test("^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$") and ascii_downcase != "n/a")
  ' "$audit_dir/derived/roster.json" \
    | awk '!seen[tolower($0)]++' \
    | sort -f > "$audit_dir/github-handles.txt"
}

audit_github_handle() {
  local handle="$1"
  local audit_path="$audit_dir/github/audits/$handle.json"
  local profile_path="$audit_dir/github/profiles/$handle.json"
  local repos_path="$audit_dir/github/repos/$handle.ndjson"

  if [[ -s "$audit_path" ]]; then
    if [[ "$(jq -r '.resolved' "$audit_path")" == "false" ]]; then
      return
    fi
    if [[ -f "$repos_path" ]]; then
      local expected_repos collected_repos
      expected_repos="$(jq -r '.public_repos' "$audit_path")"
      collected_repos="$(wc -l < "$repos_path" | tr -d ' ')"
      if [[ "$expected_repos" == "$collected_repos" ]] \
          && jq -e --arg handle "$handle" 'select(.declared_handle == $handle)' "$repos_path" >/dev/null; then
        return
      fi
    fi
  fi

  if ! gh api "users/$handle" > "$profile_path" 2> "$audit_dir/errors/$handle-profile.err"; then
    jq -cn --arg handle "$handle" '{declared_handle:$handle,resolved:false}' > "$audit_path"
    return
  fi

  jq -c --arg handle "$handle" \
    '{declared_handle:$handle,resolved:true,login,html_url,name,company,blog,location,bio,public_repos,followers,created_at,updated_at}' \
    "$profile_path" > "$audit_path"

  if ! gh api --paginate "/users/$handle/repos?per_page=100&type=public&sort=updated&direction=desc" \
      --jq '.[] | {owner:.owner.login,full_name,html_url,name,description,fork,archived,disabled,created_at,updated_at,pushed_at,language,size,stargazers_count,forks_count,open_issues_count,default_branch,topics,license:(.license.spdx_id // null)}' \
      > "$repos_path" 2> "$audit_dir/errors/$handle-repos.err"; then
    return
  fi

  local enriched_path="$repos_path.enriched"
  jq -c --arg declared_handle "$handle" '. + {declared_handle:$declared_handle}' "$repos_path" \
    > "$enriched_path"
  mv "$enriched_path" "$repos_path"
}

audit_github_handles() {
  local worker_count=0
  while IFS= read -r handle; do
    audit_github_handle "$handle" &
    worker_count=$((worker_count + 1))
    if (( worker_count % 16 == 0 )); then
      wait
    fi
  done < "$audit_dir/github-handles.txt"
  wait

  jq -s '.' "$audit_dir"/github/audits/*.json > "$audit_dir/derived/profile-audit.json"
  : > "$audit_dir/derived/repos.ndjson"
  for repos_path in "$audit_dir"/github/repos/*.ndjson; do
    [[ -f "$repos_path" ]] && cat "$repos_path" >> "$audit_dir/derived/repos.ndjson"
  done

  jq -n \
    --slurpfile profiles "$audit_dir/derived/profile-audit.json" \
    --rawfile repos "$audit_dir/derived/repos.ndjson" '
    ($repos | split("\n") | map(select(length>0) | fromjson) | group_by(.declared_handle|ascii_downcase)
      | map({key:(.[0].declared_handle|ascii_downcase),value:length}) | from_entries) as $counts
    | $profiles[0] | map(select(.resolved) | {
        handle:.declared_handle,
        expected:.public_repos,
        collected:($counts[.declared_handle|ascii_downcase] // 0),
        count_match:(.public_repos == ($counts[.declared_handle|ascii_downcase] // 0))
      })
  ' > "$audit_dir/derived/repo-count-validation.json"

  jq -r '.[] | select(.resolved|not) | [.declared_handle,"profile","unresolved"] | @tsv' \
    "$audit_dir/derived/profile-audit.json" > "$audit_dir/errors/github-errors.tsv"
  jq -r '.[] | select(.count_match|not) | [.handle,"repos",("expected="+(.expected|tostring)+" collected="+(.collected|tostring))] | @tsv' \
    "$audit_dir/derived/repo-count-validation.json" >> "$audit_dir/errors/github-errors.tsv"
}

classify_metadata() {
  jq --arg event_start "$event_start" '
    def text: ([.name,.description,((.topics // []) | join(" "))] | map(. // "") | join(" ") | ascii_downcase);
    def explicit_event: text | test("flare summer signal|flaresummersignal|summer[ -]?signal");
    def flare_stack: text | test("flare confidential compute|flare network|coston2|fassets|fxrp|fce[ -]extension|flare smart account|protocol managed wallet|ftso|flare data connector");
    def track_theme: text | test("trusted execution|tee|confidential compute|private auction|sealed bid|private order|interoperab|cross[ -]?chain|xrp|asset bridge|privacy preserving");
    def competition_timing: (.created_at >= $event_start or .pushed_at >= $event_start);
    map(. + {
      metadata_explicit_event: explicit_event,
      metadata_flare_stack: flare_stack,
      metadata_track_theme: track_theme,
      competition_timing: competition_timing,
      metadata_class: (
        if explicit_event then "explicit-current"
        elif flare_stack and competition_timing then "strong-current-candidate"
        elif track_theme and .created_at >= $event_start then "thematic-current-candidate"
        elif flare_stack then "flare-prior-art"
        elif track_theme and competition_timing then "weak-thematic-overlap"
        else "no-signal"
        end
      )
    })
  ' "$audit_dir/derived/all-repos.json" \
    > "$audit_dir/derived/repository-classification-metadata.json"
}

fetch_candidate_readmes() {
  jq -r '.[] | select(.metadata_class != "no-signal") | .full_name' \
    "$audit_dir/derived/repository-classification-metadata.json" \
    > "$audit_dir/derived/readme-candidates.txt"

  local worker_count=0
  while IFS= read -r full_name; do
    fetch_candidate_readme "$full_name" &
    worker_count=$((worker_count + 1))
    if (( worker_count % 16 == 0 )); then
      wait
    fi
  done < "$audit_dir/derived/readme-candidates.txt"
  wait
}

fetch_candidate_readme() {
  local full_name="$1"
  local safe_name="${full_name//\//__}"
  gh api -H 'Accept: application/vnd.github.raw+json' "repos/$full_name/readme" \
    > "$audit_dir/github/readmes/$safe_name.md" \
    2> "$audit_dir/errors/$safe_name-readme.err" || true
}

scan_readmes() {
  : > "$audit_dir/derived/readme-evidence.ndjson"
  while IFS= read -r full_name; do
    local safe_name="${full_name//\//__}"
    local readme_path="$audit_dir/github/readmes/$safe_name.md"
    [[ -s "$readme_path" ]] || continue

    local explicit=false flare_stack=false track_theme=false proof=false
    rg -qi 'Flare Summer Signal|flaresummersignal|Summer Signal' "$readme_path" && explicit=true
    rg -qi 'Flare Confidential Compute|Flare Network|Coston2|FAssets|FXRP|FCE Extension|Flare Smart Account|Protocol Managed Wallet|FTSO|Flare Data Connector' "$readme_path" && flare_stack=true
    rg -qi 'trusted execution|TEE|confidential compute|private auction|sealed.bid|private order|interoperab|cross.chain|XRP|asset bridge|privacy.preserving' "$readme_path" && track_theme=true
    rg -qi 'contract address|chain.?id|transaction|explorer|deployed|Coston2|Songbird|mainnet|demo' "$readme_path" && proof=true

    jq -cn \
      --arg full_name "$full_name" \
      --arg readme_path "$readme_path" \
      --argjson explicit "$explicit" \
      --argjson flare_stack "$flare_stack" \
      --argjson track_theme "$track_theme" \
      --argjson proof "$proof" \
      '{full_name:$full_name,readme_path:$readme_path,readme_explicit_event:$explicit,readme_flare_stack:$flare_stack,readme_track_theme:$track_theme,readme_proof_marker:$proof}' \
      >> "$audit_dir/derived/readme-evidence.ndjson"
  done < "$audit_dir/derived/readme-candidates.txt"
  jq -s '.' "$audit_dir/derived/readme-evidence.ndjson" > "$audit_dir/derived/readme-evidence.json"
}

merge_classification() {
  jq -n \
    --slurpfile repos "$audit_dir/derived/repository-classification-metadata.json" \
    --slurpfile readmes "$audit_dir/derived/readme-evidence.json" '
    ($readmes[0] | map({key:.full_name,value:.}) | from_entries) as $rm
    | $repos[0]
    | map(. as $r | ($rm[$r.full_name] // {}) as $m
      | . + $m
      | .final_class = (
          if (.metadata_explicit_event or ($m.readme_explicit_event // false)) then "explicit-current"
          elif (.competition_timing and (.metadata_flare_stack or ($m.readme_flare_stack // false))) then "strong-current-candidate"
          elif (.created_at >= "2026-06-29T00:00:00Z" and (.metadata_track_theme or ($m.readme_track_theme // false))) then "thematic-current-candidate"
          elif (.metadata_flare_stack or ($m.readme_flare_stack // false)) then "flare-prior-art"
          elif (.competition_timing and (.metadata_track_theme or ($m.readme_track_theme // false))) then "weak-thematic-overlap"
          else "no-signal"
          end
        )
    )
  ' > "$audit_dir/derived/repository-classification.json"

  for class_name in explicit-current strong-current-candidate thematic-current-candidate flare-prior-art weak-thematic-overlap; do
    jq --arg class_name "$class_name" '[.[] | select(.final_class == $class_name)]' \
      "$audit_dir/derived/repository-classification.json" \
      > "$audit_dir/derived/$class_name.json"
  done
}

build_participant_audit() {
  jq -n \
    --slurpfile roster "$audit_dir/derived/roster.json" \
    --slurpfile profiles "$audit_dir/derived/profile-audit.json" \
    --slurpfile repos "$audit_dir/derived/repository-classification.json" '
    def norm:
      (. // "")
      | sub("^https?://(www\\.)?github.com/"; ""; "i")
      | sub("^github.com/"; ""; "i")
      | sub("^@"; "")
      | if length == 0 then "" else split("?")[0] | split("#")[0] | split("/")[0] end;
    ($profiles[0] | map({key:(.declared_handle|ascii_downcase),value:.}) | from_entries) as $pm
    | ($repos[0] | group_by(.declared_handle|ascii_downcase) | map({key:(.[0].declared_handle|ascii_downcase),value:.}) | from_entries) as $rm
    | $roster[0] | map(
        (.hacker.github_v2 | norm) as $handle
        | ($pm[$handle|ascii_downcase] // null) as $profile
        | ($rm[$handle|ascii_downcase] // []) as $account_repos
        | {
            registration_id:.id,
            hacker_id:.hacker.id,
            username:.hacker.username,
            nickname:.hacker.nick_name,
            registered_at:.created_at,
            github_raw:.hacker.github_v2,
            github_handle:(if ($handle|length)>0 then $handle else null end),
            github_resolved:($profile.resolved // false),
            github_url:$profile.html_url,
            public_repo_count:($account_repos|length),
            explicit_current_repos:[$account_repos[] | select(.final_class=="explicit-current") | .full_name],
            strong_current_candidates:[$account_repos[] | select(.final_class=="strong-current-candidate") | .full_name],
            thematic_current_candidates:[$account_repos[] | select(.final_class=="thematic-current-candidate") | .full_name]
          }
      )
  ' > "$audit_dir/derived/participant-audit.json"
}

write_summary() {
  local api_count collected_count unique_hackers linked_participants unique_handles resolved repo_total errors_total
  api_count="$(jq -r '.count' "$audit_dir/page-1.json")"
  collected_count="$(jq 'length' "$audit_dir/derived/roster.json")"
  unique_hackers="$(jq '[.[].hacker.id] | unique | length' "$audit_dir/derived/roster.json")"
  linked_participants="$(jq '[.[] | select((.hacker.github_v2 // "") | length > 0)] | length' "$audit_dir/derived/roster.json")"
  unique_handles="$(wc -l < "$audit_dir/github-handles.txt" | tr -d ' ')"
  resolved="$(jq '[.[] | select(.resolved)] | length' "$audit_dir/derived/profile-audit.json")"
  repo_total="$(jq 'length' "$audit_dir/derived/all-repos.json")"
  errors_total="$(awk 'NF {n++} END {print n+0}' "$audit_dir/errors/github-errors.tsv")"

  jq -n \
    --arg audited_at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    --arg endpoint "$endpoint?page=N&page_size=$page_size&include_following=true" \
    --argjson api_count "$api_count" \
    --argjson collected_count "$collected_count" \
    --argjson unique_hackers "$unique_hackers" \
    --argjson linked_participants "$linked_participants" \
    --argjson unique_handles "$unique_handles" \
    --argjson resolved "$resolved" \
    --argjson repo_total "$repo_total" \
    --argjson repo_count_mismatches "$(jq '[.[] | select(.count_match|not)] | length' "$audit_dir/derived/repo-count-validation.json")" \
    --argjson explicit "$(jq 'length' "$audit_dir/derived/explicit-current.json")" \
    --argjson strong "$(jq 'length' "$audit_dir/derived/strong-current-candidate.json")" \
    --argjson thematic "$(jq 'length' "$audit_dir/derived/thematic-current-candidate.json")" \
    --argjson prior "$(jq 'length' "$audit_dir/derived/flare-prior-art.json")" \
    --argjson weak "$(jq 'length' "$audit_dir/derived/weak-thematic-overlap.json")" \
    --argjson errors "$errors_total" '
    {
      audited_at:$audited_at,
      dorahacks_endpoint:$endpoint,
      api_count:$api_count,
      collected_count:$collected_count,
      unique_hackers:$unique_hackers,
      count_match:($api_count==$collected_count and $collected_count==$unique_hackers),
      participants_with_github_disclosure:$linked_participants,
      unique_valid_github_handles:$unique_handles,
      profiles_resolved:$resolved,
      unresolved_or_invalid_handles:($unique_handles-$resolved),
      public_repositories_enumerated:$repo_total,
      github_repo_count_mismatches:$repo_count_mismatches,
      explicit_current_repositories:$explicit,
      strong_current_candidates:$strong,
      thematic_current_candidates:$thematic,
      flare_prior_art_repositories:$prior,
      weak_thematic_overlap:$weak,
      github_errors:$errors,
      caveat:"Public profile and repository activity supports competitive reconnaissance. It does not prove formal submission, team composition, private work, or prize eligibility."
    }
  ' > "$audit_dir/roster-github-audit.json"
}

main() {
  if [[ "${REFRESH_ROSTER:-0}" == "1" ]]; then
    rm -f "$audit_dir"/page-*.json
  fi
  if [[ "${RESET_AUDIT:-0}" == "1" ]]; then
    rm -f "$audit_dir"/github/audits/*.json
    rm -f "$audit_dir"/github/profiles/*.json
    rm -f "$audit_dir"/github/repos/*.ndjson
    rm -f "$audit_dir"/github/readmes/*.md
  fi
  : > "$audit_dir/derived/repos.ndjson"

  if [[ ! -s "$audit_dir/page-1.json" ]]; then
    fetch_page 1 > "$audit_dir/page-1.json"
  fi
  local api_count page_count
  api_count="$(jq -r '.count' "$audit_dir/page-1.json")"
  page_count=$(( (api_count + page_size - 1) / page_size ))
  for ((page=2; page<=page_count; page++)); do
    if [[ ! -s "$audit_dir/page-$page.json" ]]; then
      fetch_page "$page" > "$audit_dir/page-$page.json"
    fi
  done

  normalize_roster
  [[ "$(jq 'length' "$audit_dir/derived/roster.json")" == "$api_count" ]] || {
    echo "Roster mismatch. Re-run after registration activity settles." >&2
    exit 2
  }
  extract_github_handles

  audit_github_handles
  jq -s 'unique_by(.full_name | ascii_downcase)' "$audit_dir/derived/repos.ndjson" \
    > "$audit_dir/derived/all-repos.json"
  classify_metadata
  fetch_candidate_readmes
  scan_readmes
  merge_classification
  build_participant_audit
  write_summary
  jq '.' "$audit_dir/roster-github-audit.json"
}

main "$@"
