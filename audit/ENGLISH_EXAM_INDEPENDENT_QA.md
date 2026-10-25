# English Exam Independent QA

## Result

`FULL_INDEPENDENT_QA = PASS`

This read-only browser rerun was performed after the scoped Back/Forward route
remediation. No official content, canonical data, answers, Practice, Quiz,
Supplement, or verifier was changed.

## Baseline

- Official unique: `76`
- Release complete: `76/76`
- Official answer mismatch: `0`
- QuestionGroup mapping: `PASS`
- Lessons / Views: `24 / 111`
- Practice / Quiz / Supplement: `240 / 192 / 2000`
- Practice duplicates: `0`
- Official integrity: `260 PASS_EXACT`, `5 SUMMARY`, `0 FAIL`

## Runtime checks

- Choice leak: `0`
- Translation leak: `0`
- Composition leak: `0`
- Q31: `PASS` — C selected as correct; reset cleared state
- Q42: `PASS` — D selected as correct; reset cleared state
- Q21: `PASS` — E selected as correct; reset cleared state
- Shared passage groups: `PASS`; one passage and one current question card
- Translation 111–115: `PASS`; real prompts, controls, authority labels, and
  route reset verified
- Composition 111–115: `PASS`; canonical IDs 5/5, Confirm, deferred analysis,
  and route reset verified
- Deep link: `PASS`
- Reload: `PASS`
- Back: `PASS`
- Forward: `PASS`
- Curriculum ↔ Exam: `PASS`
- Supplement ↔ Exam: `PASS`
- Responsive 320 / 390 / 430 / 768 / 1024 / 1440: `PASS`
- Console errors / page errors / request failures / network 404: `0 / 0 / 0 / 0`

## History evidence

Back/Forward restored each route and its mounted root in sequence. The previous
`BACK_FORWARD_HISTORY_ROUTE_SYNC_FAILURE` did not reproduce. Detailed evidence
is recorded in [ENGLISH_EXAM_HISTORY_ROUTE_REMEDIATION.md](./ENGLISH_EXAM_HISTORY_ROUTE_REMEDIATION.md).

## Scope and release state

- Runtime file changed: `docs/exam-mode.js`
- QA files updated: this report, `ENGLISH_EXAM_INDEPENDENT_QA.json`, and
  `ENGLISH_EXAM_NAVIGATION_QA.md`
- Git commit: `NOT RUN`
- Push: `NOT RUN`
- `ENGLISH_EXAM_MODE_RELEASE_READY = NO` pending PM review and the later
  release process.
