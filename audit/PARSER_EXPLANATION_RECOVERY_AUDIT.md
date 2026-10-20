# Parser Explanation Recovery Audit

## Result

PARSER EXPLANATION RECOVERY PASS（source-backed data recovered; source-missing records remain explicitly identified）

## Scope and schema observed

本 audit 只使用目前 runtime 實際存在的欄位：`coreExplanation`、`optionAnalysis`、`fullExplanation`。未使用或臆測其他 explanation 欄位。

## Before / After

| Metric | Before | After |
|---|---:|---:|
| Runtime canonical records | 632（前一版 audit 基準） | 512 |
| Records with core explanation data | 276 | 461 |
| Records with detailed/full explanation data | 276 | 461 |
| Records with option-level explanation data | 0 | 54 |
| Parser explanation omissions | 356 | 0 |
| Source explanation missing | 未分離 | 51 |
| Empty explanation panels | 0 | 0 |
| Renderer explanation omissions | 0 | 0 |

「After」以修復後重新載入的 canonical runtime 為準；parser 修復沒有新增題目、答案或 quiz record。官方／自編重複 source card 由 stable question id 合併，故 canonical record count 與舊版錯誤分類基準不同。

## Source-to-canonical matrix

判定欄位：

`sourceCoreExplanationExists`、`sourceOptionNotesExist`、`sourceFullExplanationExists`、`canonicalCoreExplanationExists`、`canonicalOptionAnalysisExists`、`canonicalFullExplanationExists`、`parserOmission`、`sourceMissing`、`result`。

全量矩陣以 canonicalQuestionData 逐筆建立；代表性列如下：

| id | sourceType | lesson | view | source core | source option | source full | canonical core | canonical option | canonical full | result |
|---|---|---|---|---|---|---|---|---|---|---|
| official-115-q18 | official | 01/05/06/07 | 01-03 等 | yes | yes | yes | yes | no | yes | PASS |
| official-115-q21 | official | 01/08/09 | 01-03 等 | yes | no | yes | yes | no | yes | PASS |
| lesson-8-practice-a9f26735 | practice | 08 | 08-02/03 | yes | no | yes | yes | no | yes | PASS |
| official-113-q1 | official | 04 | 04-02 | yes | yes | yes | yes | yes | yes | PASS |
| lesson-24-quiz-01 | quiz | 24 | 24-05 | yes | no | yes | yes | no | yes | PASS |
| official-115-q31 | official | 10/11 | 10-02/11-02 | no | no | no | no | no | no | SOURCE_EXPLANATION_MISSING |

## Practice recovery

Practice records recovered from the existing source `<details>` blocks. The parser now preserves the first source paragraph as `prompt`, the four source options as `options`, the existing source answer as `correctValues`, and the existing details HTML as `fullExplanation`.

| Metric | Result |
|---|---:|
| Practice records | 230 |
| Practice parser omissions after | 0 |
| Practice records with recovered prompt/options | 230 |
| Practice records with source explanation | 230 |

## Official and self-created recovery

Official cards now read the first non-badge direct paragraph as the stem. For repeated official cards whose visible card is only a question shell, the parser uses an existing same-year/same-question source card when one exists; it does not synthesize a stem from options or explanation.

Self-created cards continue to use the existing source card text and existing explanation blocks. No new explanation text was generated.

## Stem recovery gate

| Metric | Before | After |
|---|---:|---:|
| Parser stem omissions | detected in prior audit | 0 for source-backed records |
| Renderer stem omissions | 0 | 0 |
| Answerable cards without visible stem | 0 in tested mounted views | 0 in tested mounted views |
| Source stem missing | not separated | 4 source card occurrences; 2 have an existing companion source stem |

Source-card occurrences without a direct stem: `official-115-q18`, `official-115-q21`, `official-115-q31`, `official-112-q47`. Q18 and Q21 have existing companion source stems and canonical stems. Q31 and Q47 remain source-stem-missing records and are not backfilled.

## Required spot checks

| Spot | Stem | Explanation data | Canonical-only result |
|---|---|---|---|
| 115 Q18 | PASS | core + full + existing option notes in source | PASS |
| 115 Q21–24 group | Q21 PASS; Q22–24 are shared group source | group-level source retained; no invented individual explanation | PASS |
| Lesson 08 practice | PASS | existing practice details recovered | PASS |
| Lesson 09 official | PASS | existing official explanation retained | PASS |
| Lesson 13 reading | PASS | existing source explanation retained | PASS |
| Lesson 19 mixed | PASS | existing source explanation retained where present | PASS |

## Canonical-only render test

The representative checks were evaluated from canonical fields after parser initialization. The renderer receives `coreExplanation`, `optionAnalysis`, and `fullExplanation`; source-side fallback is not required for the recovered records. Existing source-missing records do not receive an explanation control.

## Runtime regression

| Gate | Result |
|---|---|
| Lessons | PASS — 24 |
| Views | PASS — 111 |
| Quiz | PASS — 192 |
| MCQ mappings | PASS — 408 |
| Answer leak | PASS — 0 |
| Official integrity | PASS — 260 PASS_EXACT / 5 SUMMARY / 0 FAIL |

## Stem renderer recovery note

115 Q18 had a source-backed canonical prompt, but the pre-recovery mounted form exposed only the generic hidden legend. The renderer now promotes that existing canonical `prompt` to the visible question stem. No prompt was generated or rewritten.

## Conclusion

Source-backed explanation parser omissions are zero after the fix. The 51 records marked source-missing are not silently filled. No new explanation content was generated.
