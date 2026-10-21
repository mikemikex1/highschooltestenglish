# Practice Cross-Lesson Uniqueness Audit

## Result

`PENDING_MANUAL_PRACTICE_REPLACEMENT`

The source contains 230 practice records across 23 practice-bearing lessons. Lesson 03 has no practice source block. The canonical practice count remains 230/230.

## Counts

- Lessons with practice: 23 (01, 02, 04–24)
- Practice records: 230
- Exact duplicate question groups across lessons: 11
- Duplicate instances requiring manual replacement review: 201
- Exact duplicate practice sets: 1 group (the same ten-item set in Lessons 04–24)
- Parser duplication evidenced: 0
- Canonical mapping duplication evidenced: 0
- Renderer duplication evidenced: 0
- View binding errors evidenced: 0
- Lesson 01 option mismatch: 1 before, 0 after

## Root Cause

`SOURCE_PRACTICE_DUPLICATION`.

The Lesson 01/02 first question is identical in the source. The ten-item practice set in Lessons 04–24 is also identical in the source. This is not evidence that the parser copied a distinct source question into another lesson, so no replacement question was generated.

Lesson 01 versus Lesson 02: one exact duplicate question, source-native; queued for PM review.

## Learning-target review

The source practice blocks for Lessons 08, 13, and 19 are present and represented. Their cross-lesson reuse is a source-content issue, not a renderer or view-binding failure. Any replacement must be supplied and approved manually.

## Artifacts

- [PRACTICE_CROSS_LESSON_UNIQUENESS_MANIFEST.json](./PRACTICE_CROSS_LESSON_UNIQUENESS_MANIFEST.json)
- [PRACTICE_DUPLICATE_MATRIX.json](./PRACTICE_DUPLICATE_MATRIX.json)
- [MANUAL_PRACTICE_REPLACEMENT_QUEUE.json](./MANUAL_PRACTICE_REPLACEMENT_QUEUE.json)
- [MANUAL_PRACTICE_REPLACEMENT_QUEUE.md](./MANUAL_PRACTICE_REPLACEMENT_QUEUE.md)
