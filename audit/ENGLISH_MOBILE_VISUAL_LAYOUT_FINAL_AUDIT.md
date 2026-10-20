# English Mobile Visual Layout Final Audit

## Result

PASS for the completed presentation-only responsive fix. The browser render checks below were run against the canonical `offline-package-v4/index.html` file URL. No lesson, question, answer, explanation, PDF, image, or interaction data was changed.

## Root cause

The page contained legacy fixed-width and minimum-width declarations in older style blocks. They were not always visible as an overflow at the initial route, but could widen content chains at narrow widths, especially when a question card, long English token, table, tab row, or grid child participated in a flex/grid layout. The hotfix adds a final presentation-only constraint layer: `min-width:0`, `max-width:100%`, bounded media, wrapping long tokens, local table scrolling, mobile grid collapse, and wrapped action/SOP groups.

## Browser overflow audit

The dense official-question view was opened at each width. Main-content descendants were checked for effective bounding boxes outside the viewport; intentional tab/table scroll containers were excluded.

| Width | document client width | document scroll width | visible main-content offenders | Result |
|---:|---:|---:|---:|---|
| 320 | 305 | 305 | 0 | PASS |
| 360 | 345 | 345 | 0 | PASS |
| 375 | 360 | 360 | 0 | PASS |
| 390 | 375 | 375 | 0 | PASS |
| 393 | 378 | 378 | 0 | PASS |
| 412 | 397 | 397 | 0 | PASS |
| 430 | 415 | 415 | 0 | PASS |
| 768 | 753 | 753 | 0 | PASS |
| 820 | 805 | 805 | 0 | PASS |
| 1024 | 1009 | 1009 | 0 | PASS |
| 1440 | 1425 | 1425 | 0 | PASS |

The 15px difference is the browser vertical scrollbar; the viewport comparison is `scrollWidth == clientWidth`, and both values match at every width.

## Component gates

| Component | Result | Evidence |
|---|---|---|
| Lesson title/header | PASS | wraps within the content column |
| Paragraph and long English text | PASS | wrapping rules applied; no visible offender |
| Core teaching cards | PASS | bounded cards and collapsed mobile grids |
| Contrast cards | PASS | single-column at narrow widths |
| Quiz / MCQ | PASS | 390px browser test completed |
| Official question cards | PASS | 390px dense official view; 240 radios rendered in the selected view |
| Passage/context blocks | PASS | max-width and wrapping rules |
| Translation/composition blocks | PASS | max-width and wrapping rules |
| Supplement controls/cards | PASS | bounded controls/cards and local overflow handling |
| View tabs | PASS | bounded horizontal tab row |
| Mobile navigation | PASS | course select remains usable at 390px |
| Floating/action controls | PASS | action groups wrap and retain 44px targets |

## Interaction spot check

At 390px, Lesson 04 → view 2 was opened from the file URL. The first MCQ was submitted with the correct option B:

- before submission: no answer text leak in the question card;
- after submission: B had `correct` styling and green feedback;
- after reset: no checked option, no result, and no correct/incorrect classes remained.

## Regression metrics

- Lessons: 24
- Runtime lesson views: 111 (canonical `window.canonicalLessonData`: 24 lessons; actual lesson view records: 111)
- Quiz records: 192
- MCQ mappings: 408
- Answer leak: 0
- Official integrity: 260 `PASS_EXACT`, 5 `PASS_SUMMARY_CORRECTLY_LABELED`, 0 `FAIL`
- File URL: PASS
- `fetch(`: 0
- `XMLHttpRequest`: 0
- module scripts: 0
- remote dependency references: 0
- external CSS references: 0
- external JS references: 0
- parent-directory references: 0

## Screenshot status

`SCREENSHOT_NOT_AVAILABLE`: browser DOM/layout rendering and interaction checks ran successfully, but no local screenshot artifact was saved in the workspace.

## Package

- Canonical source: `offline-package-v4/index.html`
- Repo Pages build synchronized: `學測英文24課_GitHub/docs/index.html`
- ZIP rebuilt: `學測英文24課_GitHub/release/學測英文24課_手機離線完整版.zip`
- Package contents remain `index.html`, `PDF/`, `assets/`, and `README.txt`.
