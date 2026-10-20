# View Count Regression Audit

## Result

PASS — the reported 111 → 112 difference was an audit counting bug. No lesson view was added or removed, so no runtime fix was required.

## Expected

111 canonical lesson views.

## Before

The prior mobile audit reported 112. Its literal `class="lesson-page"` count included the document root `<body class="lesson-page">` plus the 111 actual lesson-page wrappers.

## Root Cause

The previous count used an unscoped literal class-string search. It counted the body state class as if it were a lesson view. The corrected count uses `window.canonicalLessonData[].views[]` and the actual lesson-page wrapper elements, excluding the body class and CSS/data/template text.

## Extra View

- lesson = None
- view id = None
- label = None
- reason = No extra canonical view exists; `EXTRA_VIEW_IDS = []`.

## After

111.

## Current View IDs

The canonical runtime contains the expected 111 IDs. Lesson 03 is exactly:

- `lesson-03-view-01`｜基礎
- `lesson-03-view-02`｜正式教學
- `lesson-03-view-03`｜課後檢查

There is no `lesson-03-view-04`.

## Extra / Missing IDs

- `EXTRA_VIEW_IDS = []`
- `MISSING_VIEW_IDS = []`

## Lesson Distribution

| Lesson | Expected frozen | Current canonical | Result |
|---:|---:|---:|---|
| 01 | 3 | 3 | PASS |
| 02 | 4 | 4 | PASS |
| 03 | 3 | 3 | PASS |
| 04 | 5 | 5 | PASS |
| 05 | 5 | 5 | PASS |
| 06 | 5 | 5 | PASS |
| 07 | 5 | 5 | PASS |
| 08 | 4 | 4 | PASS |
| 09 | 4 | 4 | PASS |
| 10 | 4 | 4 | PASS |
| 11 | 4 | 4 | PASS |
| 12 | 5 | 5 | PASS |
| 13 | 5 | 5 | PASS |
| 14 | 5 | 5 | PASS |
| 15 | 5 | 5 | PASS |
| 16 | 5 | 5 | PASS |
| 17 | 5 | 5 | PASS |
| 18 | 5 | 5 | PASS |
| 19 | 5 | 5 | PASS |
| 20 | 5 | 5 | PASS |
| 21 | 5 | 5 | PASS |
| 22 | 5 | 5 | PASS |
| 23 | 5 | 5 | PASS |
| 24 | 5 | 5 | PASS |

## Quiz

192 canonical quiz records. Lesson 03 remains on its existing view 03; no quiz view was added.

## MCQ mappings

408.

## Mobile Regression

The existing browser regression results remain unchanged after the counting correction:

- 320 = PASS, offenders 0
- 390 = PASS, offenders 0
- 430 = PASS, offenders 0
- 1440 = PASS, offenders 0

## Decision

- `RECOMMENDED_QUIZ_RELEASE_BASELINE = 192`
- `QUIZ_REMEDIATION_REQUIRED = NO`
- `repoSeparationStructurallyValid = YES`
- Content changed = NO
- Runtime changed = NO
