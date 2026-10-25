# English Exam History Route Remediation

## Result

`HISTORY_ROUTE_SYNC = PASS`

## Root cause

`HASH_NORMALIZATION_OVERWRITE` with `REPLACE_STATE_COLLAPSED_HISTORY`.
When a user navigated to `#mode=curriculum` or `#mode=supplement`, the Exam
router rewrote the hash to a legacy route and allowed the legacy fallback to
run again. Back/Forward therefore re-entered the fallback and appeared stuck
at `#lesson-01`.

## Remediation

Changed only [exam-mode.js](../docs/exam-mode.js). Mode routes now use one
canonicalization step and directly delegate to the existing curriculum or
supplement renderer. Exam routes remain handled by the Exam renderer. No
question, answer, passage, lesson, Practice, Quiz, Supplement, or Theme data
was changed.

## Targeted browser evidence

Initial A was Q42 reading. User navigation then produced B Translation, C
Composition, D Curriculum, Supplement, and a 115 reading route. Back restored
each prior route and Forward restored each next route. The required sequence
passed:

- Back 1 → Composition
- Back 2 → Translation
- Back 3 → Q42 reading
- Forward 1 → Translation
- Forward 2 → Composition
- Forward 3 → Curriculum

The extended sequence also passed across Supplement and the 115 reading route.
At every step the hash and visible root matched; Exam had one current question
card and only the required passage.

## Regression checks

- Q31 C interaction: PASS
- Q42 D interaction: PASS
- Q21 interaction: PASS
- Shared passage samples: PASS
- Translation 111–115: PASS
- Composition 111–115: PASS
- Q42 reload after history restoration: PASS
- Composition reload after Forward: PASS
- Console errors: 0
- Page errors: 0
- Request failures: 0
- Network responses >= 400: 0
- Full Independent QA rerun: PASS
- Git commit: NOT RUN
- Push: NOT RUN

`ENGLISH_EXAM_MODE_RELEASE_READY` remains `NO` pending PM review and the
separate release process.
