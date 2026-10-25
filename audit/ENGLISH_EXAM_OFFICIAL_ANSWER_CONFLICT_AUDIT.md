# English Exam Official Answer Conflict Audit

## Result

`OFFICIAL_ANSWER_CONFLICT_RESOLVED`

This audit preserves the prior 115 Q31 remediation and records the subsequent 112 Q42 remediation. No other source-recovery record was changed.

## 115 Q31 historical remediation

- Official PDF answer: **C**
- Canonical before: **D**
- Canonical after: **C**
- Root cause: `ANSWER_SERIALIZATION_ERROR`
- Option-order mismatch: 0
- Explanation conflict: 0
- Status: `RESOLVED_DATA_LEVEL`

## 112 Q42 evidence and reconciliation

| Field | Official source / before | Canonical after |
|---|---|---|
| Year / question | 112 / Q42 | 112 / Q42 |
| Canonical ID | `official-112-q42` | `official-112-q42` |
| Prompt | `What does “it” in the last paragraph refer to?` | exact match |
| Options | A–D, exact official order | exact match |
| Official answer | D | D |
| Canonical answer before | B | — |
| Passage | `passage-7cb1c189` | exact mapping |
| Passage questionRefs | Q35, Q42, Q45 | includes Q42 |
| Root cause | `ANSWER_SERIALIZATION_ERROR` | resolved |

Official question PDF: `docs/PDF/02-112學測英文試卷.pdf`, page 7.

Official answer PDF: `docs/PDF/02-112學測英文選擇題答案.pdf`, page 1, Q42 = **D**.

The canonical record now contains the exact official prompt and option order, `correctValues = [D]`, `passageRefs = [passage-7cb1c189]`, and no stale option-analysis answer. No new explanation was generated.

## Explanation and repository reference check

- Direct canonical explanation conflict: 1 stale option-analysis answer pointing to B was found; 1 was cleared. No new explanation was generated.
- Direct Q42 mapping references checked: `docs/index.html`, `docs/exam-mode.js`, canonical passage data, lesson historical-question material, and both conflict/source-completeness audits.
- Official answer authority used: the official answer PDF only.
- No change was made to prompt text, option text, passage content, other official records, Practice, Quiz, or Supplement.

## 112 answer comparison

- Canonical 112 official records with an answer authority checked: 13
- Matches: 13
- Mismatches: 0

## 111–115 answer comparison

- Canonical official records with a non-empty official answer authority checked: 68
- Matches: 68
- Mismatches: 0

## Runtime verification

- Q42 canonical answer after reload: `D`
- Exam mode Q42 answer authority: `D`
- Option order: exact
- Passage mapping: PASS
- Select D → correct; D receives `is-correct`.
- Select B → incorrect; B receives `is-wrong`, D receives `is-correct`, other options remain neutral.
- Reset → selected choice, feedback, solution state, and option classes cleared.
- Pre-submit answer leak: 0 for the current Q42 card; no solution/answer panel is mounted before submit.

## Final status for this remediation

- `OFFICIAL_ANSWER_CONFLICT`: `RESOLVED`
- `SOURCE_COMPLETENESS`: `PASS` for the previously complete source-field gate; no new source-field blocker remains.
- `ENGLISH_EXAM_MODE_RELEASE_READY`: `NO` (Independent QA, commit/push, and Public QA remain out of scope).
- Git commit: not run
- Push: not run
