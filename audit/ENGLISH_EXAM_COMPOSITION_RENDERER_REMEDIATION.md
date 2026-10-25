# English Exam Composition Renderer Remediation

## Scope

Renderer-only behavior is unchanged in this backfill. The source-of-truth correction is recorded separately in `ENGLISH_EXAM_COMPOSITION_CANONICAL_BACKFILL_AUDIT.md`; no official prompt, visual, sample, outline, brainstorm, or analysis was generated.

## Root cause

The generic non-choice submit handler treated `sourceHtml` as an immediately renderable explanation. It therefore produced only a Confirm flow and did not provide the required second action for writing analysis.

## Remediation contract

- Initial render contains the existing prompt metadata and response area only.
- Confirm mounts `查看寫作解析`, but does not mount source teaching material.
- Clicking `查看寫作解析` mounts the existing source-backed `sourceHtml` once.
- Reset and route changes remount the current unit, clearing confirmation and analysis state.
- No hidden sample essay, outline, brainstorm, or analysis is pre-rendered.

## QA status

Targeted browser QA after canonical backfill: PASS for 111–115. Each year has one current composition unit; initial sample/analysis nodes are zero; Confirm adds `查看寫作解析`; the second action mounts the existing source HTML.

The previous `FAIL_SOURCE_DATA_UNAVAILABLE` was caused by missing canonical records, not by the renderer. Full Independent QA must still be rerun from the beginning and is not promoted by this targeted result alone.
