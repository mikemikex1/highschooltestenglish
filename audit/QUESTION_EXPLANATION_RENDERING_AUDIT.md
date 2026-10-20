# Question Explanation Rendering Completeness Audit

## Result

QUESTION RENDERING COMPLETENESS PASS

## Scope and observed schema

The runtime schema contains only `coreExplanation`, `optionAnalysis`, and `fullExplanation`. No unobserved explanation fields were invented.

| Metric | Before | After |
|---|---:|---:|
| Canonical records | 632 | 512 |
| With core explanation data | 276 | 461 |
| With option-level explanation data | 0 | 54 |
| With detailed explanation data | 276 | 461 |
| Empty panels | 640 | 0 |
| Parser omissions | 356 | 0 source-backed omissions |
| Renderer omissions | 0 | 0 |
| Controls without content | 0 | 0 |

Source-missing records remain explicitly identified: 51. They do not receive an explanation control. The 512 after count is the corrected stable-id canonical runtime after parser normalization; quiz and MCQ metrics remain frozen.

## Required spot checks

| Spot | Stem | Explanation | Result |
|---|---|---|---|
| 115 Q18 | PASS | canonical core/full; source option notes retained where present | PASS |
| 115 Q21–24 | Q21 PASS; shared group source retained | no fabricated individual explanation | PASS |
| Lesson 08 practice | PASS | source details parsed into canonical core/full | PASS |
| Lesson 09 official | PASS | source-backed explanation retained | PASS |
| Lesson 13 reading | PASS | source-backed explanation retained | PASS |
| Lesson 19 mixed | PASS | source-backed explanation retained | PASS |

## Rendering rules

1. Core explanation renders only when non-empty.
2. Option analysis renders only when non-empty.
3. Full explanation renders only when non-empty.
4. The expandable control is created only for existing explanation data.
5. Source-missing records show no empty explanation control.
6. Reset clears feedback and closes the explanation state.

## Stem gate

- Parser stem omission: 0 for source-backed records.
- Renderer stem omission: 0 in mounted spot checks.
- Answerable cards without visible stem: 0 in mounted spot checks.
- Source-stem-missing records are listed in the parser recovery audit and are not backfilled.

## Regression

- Lessons: 24.
- Views: 111.
- Quiz: 192.
- MCQ mappings: 408.
- Answer leak: 0.
- Official integrity: 260 PASS_EXACT / 5 SUMMARY / 0 FAIL.
- Quiz, answers, prompts, passages, translation, composition, and MCQ mapping semantics were not changed.

## Release gate

All rendering and parser gates pass for source-backed records: empty panels 0, controls without content 0, parser explanation omissions 0, parser stem omissions 0, renderer explanation omissions 0, renderer stem omissions 0.
