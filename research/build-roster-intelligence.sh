#!/usr/bin/env bash
set -euo pipefail

work_dir="/Users/MAC/hackathon-toolkit/active/flare-summer-signal"
audit_dir="$work_dir/research/roster-audit"

jq -n \
  --slurpfile candidates "$audit_dir/derived/candidate-evidence-summary.json" \
  --slurpfile attribution "$audit_dir/derived/candidate-attribution.json" \
  --slurpfile manual "$audit_dir/manual-classification.json" '
  ($attribution[0] | map({key:.full_name,value:.}) | from_entries) as $am
  | ($manual[0].excluded_support_or_unrelated | map({key:.,value:true}) | from_entries) as $excluded
  | ($manual[0].same_project_variants | map(.repositories[1:][]) | map({key:.,value:true}) | from_entries) as $variants
  | ($candidates[0]
      | map(select(($excluded[.full_name] // false) | not))
      | map(select(($variants[.full_name] // false) | not))
      | map(. + {
          current_period_commit_count:($am[.full_name].current_period_commit_count // 0),
          current_period_contributors:($am[.full_name].current_period_contributors // []),
          languages:($am[.full_name].languages // {})
        })
    ) as $repo_projects
  | {
      methodology:{
        canonical_population:"DoraHacks registered-hacker API",
        repository_scope:"All public repositories from every resolved participant-disclosed GitHub account",
        evidence_layers:["DoraHacks profile disclosure","repository metadata","README","current-period commits","contributors","languages"],
        classification_caveat:"Likely-current is competitive intelligence, not proof of final DoraHacks submission or eligibility."
      },
      totals:{
        likely_current_repository_projects:($repo_projects|length),
        profile_recovered_repositories:($manual[0].profile_recovered_current_repositories|length),
        profile_only_or_unlinked_signals:($manual[0].profile_only_or_unlinked_current_signals|length),
        total_public_or_profile_signals:(($repo_projects|length)+($manual[0].profile_recovered_current_repositories|length)+($manual[0].profile_only_or_unlinked_current_signals|length))
      },
      repository_projects:$repo_projects,
      profile_recovered_repositories:$manual[0].profile_recovered_current_repositories,
      profile_only_or_unlinked_signals:$manual[0].profile_only_or_unlinked_current_signals,
      exclusions:$manual[0].excluded_support_or_unrelated,
      merged_variants:$manual[0].same_project_variants
    }
' > "$audit_dir/derived/roster-intelligence.json"

{
  printf '# Flare Summer Signal: Roster Intelligence Registry\n\n'
  printf '**Audited:** %s  \n' "$(jq -r '.audited_at' "$audit_dir/roster-github-audit.json")"
  printf '**Canonical roster:** %s/%s registrations  \n' \
    "$(jq -r '.collected_count' "$audit_dir/roster-github-audit.json")" \
    "$(jq -r '.api_count' "$audit_dir/roster-github-audit.json")"
  printf '**GitHub coverage:** %s disclosed, %s valid unique, %s resolved  \n' \
    "$(jq -r '.participants_with_github_disclosure' "$audit_dir/roster-github-audit.json")" \
    "$(jq -r '.unique_valid_github_handles' "$audit_dir/roster-github-audit.json")" \
    "$(jq -r '.profiles_resolved' "$audit_dir/roster-github-audit.json")"
  printf '**Repositories enumerated:** %s with %s count mismatches  \n\n' \
    "$(jq -r '.public_repositories_enumerated' "$audit_dir/roster-github-audit.json")" \
    "$(jq -r '.github_repo_count_mismatches' "$audit_dir/roster-github-audit.json")"
  printf '## Methodology\n\n'
  printf 'The registered DoraHacks roster is the canonical population. Every participant-disclosed GitHub handle was normalized, resolved, and paginated through all public repositories. Metadata filters advanced candidates to README review; current-period commits, contributors, languages, and profile disclosures were then reconciled manually. Public evidence does not prove final submission, private work, team membership, or eligibility. [A2] [C2]\n\n'
  printf '## Coverage\n\n'
  jq -r '.totals | to_entries[] | "- **\(.key|gsub("_";" ")):** \(.value)"' "$audit_dir/derived/roster-intelligence.json"
  printf '\n## Likely-current public repository projects\n\n'
  printf '| Repository | Signal class | Track heuristic | Commits | Current contributors | Proof score |\n'
  printf '|---|---|---|---:|---:|---:|\n'
  jq -r '.repository_projects | sort_by(-.proof_score,-.current_period_commit_count,.full_name)[] | "| [\(.full_name)](https://github.com/\(.full_name)) | \(.class) | \(.lane_heuristic) | \(.current_period_commit_count) | \(.current_period_contributors|length) | \(.proof_score)/5 |"' \
    "$audit_dir/derived/roster-intelligence.json"
  printf '\n## Repositories recovered from participant profiles\n\n'
  printf '| Project | Repository | Track | Basis |\n|---|---|---|---|\n'
  jq -r '.profile_recovered_repositories[] | "| \(.project) | [\(.repository)](https://github.com/\(.repository)) | \(.track) | \(.basis) |"' \
    "$audit_dir/derived/roster-intelligence.json"
  printf '\n## Profile-only or unlinked current signals\n\n'
  printf '| Project | DoraHacks user | GitHub | Track | Evidence status |\n|---|---|---|---|---|\n'
  jq -r '.profile_only_or_unlinked_signals[] | "| \(.project) | \(.dorahacks_username) | \(.github // "none disclosed") | \(.track) | \(.status) |"' \
    "$audit_dir/derived/roster-intelligence.json"
  printf '\n## Exclusions and merged variants\n\n'
  jq -r '.exclusions[] | "- Excluded support, ecosystem, or unrelated repository: `\(.)`."' "$audit_dir/derived/roster-intelligence.json"
  jq -r '.merged_variants[] | "- Merged `\(.repositories|join("` and `"))` as one project variant: **\(.project)**."' "$audit_dir/derived/roster-intelligence.json"
  printf '\n## Unresolved GitHub disclosures\n\n'
  while IFS=$'\t' read -r handle _ reason; do
    printf -- '- `%s`: %s.\n' "$handle" "$reason"
  done < "$audit_dir/errors/github-errors.tsv"
} > "$work_dir/research/roster-intelligence.md"

jq '.totals' "$audit_dir/derived/roster-intelligence.json"
