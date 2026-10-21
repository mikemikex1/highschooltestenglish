# Canonical Dedup Reconciliation Audit

## Result

`FAIL_INSUFFICIENT_HISTORICAL_RECORD_LEVEL_EVIDENCE`

The aggregate arithmetic is consistent:

`632 historical serialized records = 512 current canonical unique records + 120 difference`.

However, the repository does not contain the required historical 632-record inventory. Without each old serialized record's ID, lesson, view, source type, stem/options/answer/explanation fingerprint, the 120 records cannot be mapped one by one to retained stable IDs. It would be unsafe to label all 120 as duplicates.

## Required reconciliation status

| Metric | Required | Verified |
|---|---:|---:|
| Historical serialized records | 632 | 632 aggregate only |
| Canonical unique records | 512 | 512 |
| Difference | 120 | 120 |
| Removed instances mapped to retained IDs | 120 | 0 |
| Unmapped removed instances | 0 | 120 |

## Source-type arithmetic

| Source type | Historical | Canonical | Difference | Record-level proof |
|---|---:|---:|---:|---|
| Official | 161 | 76 | 85 | NOT AVAILABLE |
| SelfCreated | 49 | 14 | 35 | NOT AVAILABLE |
| Practice | 230 | 230 | 0 | Aggregate unchanged |
| Quiz | 192 | 192 | 0 | Aggregate unchanged |

The 85 official and 35 self-created differences are numerically consistent with duplicate serialization, but the required `oldSerializedId → retainedStableId` evidence is absent. Different stems/options/answers cannot be ruled out from aggregate counts alone.

## Current canonical checks

- 24 lessons: verified.
- 111 views: verified.
- Canonical stable IDs: unique in current runtime.
- Canonical instance IDs: unique in current runtime.
- Quiz: 192.
- MCQ mappings: 408.
- Answer leak: 0.
- Current lesson/view references preserve 24 lesson references and 85 answerable-view references; the remaining views are teaching-only views without question records.

## Spot checks

- 115 Q18: present with stable ID, canonical prompt, answer, and retained view references.
- 115 Q21–24: present as a shared group with retained lesson/view references.
- Lesson 08 practice: present.
- Lesson 09: present.
- Lesson 13: present.
- Lesson 19: present.

These spot checks show no observed loss in the current canonical runtime, but they do not prove that no unique content was lost among the 120 historical records.

## Missing evidence needed for PASS

To turn this audit into `CANONICAL_DEDUP_RECONCILIATION_PASS`, preserve or provide the historical 632-record snapshot containing, for every record:

`oldSerializedId`, `oldLesson`, `oldView`, `oldSourceType`, stem/prompt, context/passage reference, options, answer, explanation fingerprint, and the retained stable ID.

Only then can `mappedRemovedInstances = 120`, `unmappedRemovedInstances = 0`, unique content loss = 0, official unique loss = 0, self-created unique loss = 0, and lesson/view coverage loss = 0 be asserted.

## Mutation guard

- Website modified: NO
- Canonical data modified: NO
- Parser modified: NO
- Renderer modified: NO
- Commit created: NO
- Push performed: NO
