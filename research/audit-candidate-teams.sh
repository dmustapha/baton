#!/usr/bin/env bash
set -euo pipefail

audit_dir="/Users/MAC/hackathon-toolkit/active/flare-summer-signal/research/roster-audit"
candidate_file="$audit_dir/derived/candidate-evidence-summary.json"
team_dir="$audit_dir/github/candidate-teams"
language_dir="$audit_dir/github/candidate-languages"
commit_dir="$audit_dir/github/candidate-commits"

mkdir -p "$team_dir" "$language_dir" "$commit_dir"

fetch_repo_attribution() {
  local full_name="$1"
  local safe_name="${full_name//\//__}"

  gh api --paginate "repos/$full_name/contributors?per_page=100&anon=1" \
    > "$team_dir/$safe_name.json" 2> "$audit_dir/errors/$safe_name-contributors.err" || \
    printf '[]\n' > "$team_dir/$safe_name.json"

  gh api "repos/$full_name/languages" \
    > "$language_dir/$safe_name.json" 2> "$audit_dir/errors/$safe_name-languages.err" || \
    printf '{}\n' > "$language_dir/$safe_name.json"

  gh api --paginate "repos/$full_name/commits?since=2026-06-28T20:00:00Z&per_page=100" \
    > "$commit_dir/$safe_name.json" 2> "$audit_dir/errors/$safe_name-commits.err" || \
    printf '[]\n' > "$commit_dir/$safe_name.json"
}

worker_count=0
while IFS= read -r full_name; do
  fetch_repo_attribution "$full_name" &
  worker_count=$((worker_count + 1))
  if (( worker_count % 16 == 0 )); then
    wait
  fi
done < <(jq -r '.[].full_name' "$candidate_file")
wait

: > "$audit_dir/derived/candidate-attribution.ndjson"
while IFS= read -r full_name; do
  safe_name="${full_name//\//__}"
  jq -cn \
    --arg full_name "$full_name" \
    --slurpfile contributors "$team_dir/$safe_name.json" \
    --slurpfile languages "$language_dir/$safe_name.json" \
    --slurpfile commits "$commit_dir/$safe_name.json" '
    {
      full_name:$full_name,
      contributors:($contributors[0] | map({login:(.login // .name // "anonymous"),contributions})),
      contributor_count:($contributors[0] | length),
      languages:$languages[0],
      current_period_commit_count:($commits[0] | length),
      current_period_contributors:($commits[0]
        | map(.author.login // .commit.author.email // .commit.author.name // "anonymous")
        | unique),
      current_period_contributor_count:($commits[0]
        | map(.author.login // .commit.author.email // .commit.author.name // "anonymous")
        | unique | length)
    }
  ' >> "$audit_dir/derived/candidate-attribution.ndjson"
done < <(jq -r '.[].full_name' "$candidate_file")

jq -s '.' "$audit_dir/derived/candidate-attribution.ndjson" \
  > "$audit_dir/derived/candidate-attribution.json"

jq '
  [ .[] as $repo
    | $repo.contributors[]
    | select(.login != "anonymous")
    | {login,repo:$repo.full_name,contributions}
  ]
  | group_by(.login|ascii_downcase)
  | map({
      login:.[0].login,
      candidate_repositories:map(.repo)|unique,
      repository_count:(map(.repo)|unique|length),
      contributions:map(.contributions)|add
    })
  | sort_by(-.repository_count,-.contributions)
' "$audit_dir/derived/candidate-attribution.json" \
  > "$audit_dir/derived/cross-repo-contributors.json"

jq '
  [ .[] as $repo
    | $repo.current_period_contributors[]
    | select(. != "anonymous")
    | {identity:.,repo:$repo.full_name}
  ]
  | group_by(.identity|ascii_downcase)
  | map({
      identity:.[0].identity,
      candidate_repositories:map(.repo)|unique,
      repository_count:(map(.repo)|unique|length)
    })
  | sort_by(-.repository_count,.identity)
' "$audit_dir/derived/candidate-attribution.json" \
  > "$audit_dir/derived/current-period-cross-repo-contributors.json"

jq '{candidate_repositories:length,total_named_contributors:([.[].current_period_contributors[]|select(.!="anonymous")|ascii_downcase]|unique|length),current_period_commits:([.[].current_period_commit_count]|add)}' \
  "$audit_dir/derived/candidate-attribution.json"
