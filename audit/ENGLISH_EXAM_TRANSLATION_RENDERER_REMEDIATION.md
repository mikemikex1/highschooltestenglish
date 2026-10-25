# English Exam Translation Renderer Remediation

## Scope

Renderer-only remediation. Existing `canonicalTranslationData` is the sole source for the five-year Chinese prompts, reference translations, and teaching explanations. No official source, answer, practice, quiz, supplement, or theme data was changed.

## Root cause

`docs/exam-mode.js` routed translation records through the generic non-choice renderer. The generic renderer read the placeholder `source-translation-*` summary record and did not resolve the two canonical translation items or mount a reference-answer control.

## Remediation contract

- Resolve the current year through `window.canonicalTranslationData`.
- Render both source-order Chinese prompts in the current translation cognitive unit.
- Mount no reference translation or explanation before the user action.
- Mount the reference only after `查看參考答案`; expose `查看解析` only when the existing explanation is available.
- Reset and route changes remount the unit, clearing response/reference/explanation state.
- Authority labels distinguish `SOURCE_BACKED_REFERENCE`, `EDITORIAL_REFERENCE`, and `NO_OFFICIAL_REFERENCE_SOURCE`.

## QA status

Targeted browser QA: PASS for 111, 112, 113, 114, and 115. Each route renders two real Chinese prompts, two reference controls, and zero pre-reference answer/explanation nodes. `SOURCE_BACKED_REFERENCE` is shown for 112/113; `EDITORIAL_REFERENCE` is shown for the other existing reference records.

Full Independent QA: BLOCKED by the separate composition-source availability issue for 111/114/115. No translation source was changed.
