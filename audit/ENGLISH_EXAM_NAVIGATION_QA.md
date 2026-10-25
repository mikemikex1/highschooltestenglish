# Exam Navigation QA

## Result

`HISTORY_ROUTE_SYNC = PASS`

The browser runtime preserved and restored Exam, Translation, Composition,
Curriculum, and Supplement routes through real hash history navigation.

## Route evidence

Starting at `#mode=exam&year=112&section=reading&group=39-42&question=42`,
the targeted route sequence was Translation, Composition, Curriculum,
Supplement, and a 115 reading route. Back restored each prior route and
Forward restored each next route.

The required checkpoints passed:

- Back 1 → Composition
- Back 2 → Translation
- Back 3 → Q42 reading
- Forward 1 → Translation
- Forward 2 → Composition
- Forward 3 → Curriculum

At every checkpoint the hash and visible root matched. Exam views mounted one
current question card and only the required shared passage; no duplicate
passage was observed.

## Root cause and remediation

Root cause: `HASH_NORMALIZATION_OVERWRITE` combined with
`REPLACE_STATE_COLLAPSED_HISTORY`. The Exam router rewrote the user-selected
`#mode=curriculum` / `#mode=supplement` hash to legacy hashes without directly
delegating the existing renderer, causing the legacy fallback to re-enter and
collapse Back/Forward at `#lesson-01`.

The scoped remediation in `docs/exam-mode.js` canonicalizes those two mode
routes with `replaceState` and delegates directly to the existing curriculum or
supplement renderer. Exam routes remain under the Exam router and are not
rewritten by the legacy lesson fallback.

## Additional checks

- Intra-exam shared-passage route transition: PASS
- Q42 reload after route restoration: PASS; one passage and one question card
- Composition reload after Forward: PASS; initial analysis state restored
- Console errors: 0
- Page errors: 0
- Request failures: 0
- Network responses >= 400: 0
- Commit: NOT RUN
- Push: NOT RUN
