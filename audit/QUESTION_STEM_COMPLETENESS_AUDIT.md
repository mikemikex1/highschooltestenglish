# Question Stem Completeness Audit

## Result

`PASS_WITH_EXPLICIT_SOURCE_EXCEPTIONS`

All answerable records with a reliable source stem have a canonical `prompt` and a visible rendered stem. The two source-missing non-standard official records are not fabricated.

## Schema fields observed

`prompt`, `options`, `passageRefs`, `sourceRefs`, `questionType`, `sourceType`, `lessonId`, `viewId`, and `viewRefs`.

## Counts

| Metric | Count |
|---|---:|
| Canonical records | 512 |
| Answerable MCQ mappings | 408 |
| Source/canonical stem omission | 0 |
| Renderer stem omission | 0 |
| Source stem missing | 2 |
| Placeholder option records | 0 after official integrity sanitization |

## Source-missing IDs

- `official-115-q31`
- `official-112-q47`

These records are non-standard official group items. The runtime retains the official group content and does not invent a missing standalone prompt.

## Required spot checks

`115 Q18`, `115 Q21–24`, Lesson 08 practice, Lesson 09, Lesson 13, and Lesson 19 all have source-backed question text or group context and preserved answer interaction.
