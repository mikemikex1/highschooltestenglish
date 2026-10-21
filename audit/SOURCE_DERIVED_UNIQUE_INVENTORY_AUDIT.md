# Source-Derived Unique Inventory Reconciliation Audit

## Result

`PENDING_MANUAL_PRACTICE_REPLACEMENT`

The source-derived logical inventory is complete: 508/508 logical source records have canonical representation. The four missing selfCreated groups were recovered from existing source. The Lesson 01 practice option serialization mismatch changed from 1 to 0. Release remains pending because source-native cross-lesson practice duplication requires manual replacement approval.

## Inventory totals

| source type | expected logical | represented | missing |
|---|---:|---:|---:|
| official | 76 | 76 | 0 |
| selfCreated logical groups | 10 | 10 | 0 |
| practice | 230 | 230 | 0 |
| quiz | 192 | 192 | 0 |
| **total** | **508** | **508** | **0** |

The physical canonical release record count is 516 after adding four source-backed logical group records while retaining existing lesson/view representations. This physical count is not used as the logical source baseline.

## Recovered groups

- `source-translation-112`
- `source-translation-113`
- `source-composition-112`
- `source-composition-113`

All retain source-backed prompts/content and lesson/view references. No new question, answer, explanation, translation, or composition was generated.

## Practice option correction

The Lesson 01 practice record `lesson-1-practice-7d7c5e3f` now serializes four exact source options. Option mismatch: 1 before, 0 after. Stem and answer payload were not changed.

## Historical count

`632` remains `HISTORICAL_UNSTABLE_SERIALIZED_COUNT`; it is not used as the unique-question baseline.

## Release impact

The source practice audit found 201 duplicate instances across lessons. Therefore the remediation result is `PENDING_MANUAL_PRACTICE_REPLACEMENT`, not release PASS. See [PRACTICE_CROSS_LESSON_UNIQUENESS_AUDIT.md](./PRACTICE_CROSS_LESSON_UNIQUENESS_AUDIT.md).
