# Core Data Metric Reconciliation — Post Remediation

## Result

PASS — quiz coverage is resolved after limited normalization.

## Reconciled metrics

- Lessons: 24
- Canonical quiz prompts: 192
- Distribution: 8 per lesson
- Existing MCQ mappings: 408, preserved
- Official integrity: 260 PASS_EXACT, 5 PASS_SUMMARY_CORRECTLY_LABELED, 0 FAIL

## Root cause fixed

The previous parser selected nested answer-list items under `.quiz-box` as if they were additional quiz prompts. The runtime now selects only direct quiz lists with `.quiz-box > ol > li`. Lesson 03 now uses its existing quiz view with eight source-mapped short-answer prompts.

## Release baseline

`RECOMMENDED_QUIZ_RELEASE_BASELINE = 192`
