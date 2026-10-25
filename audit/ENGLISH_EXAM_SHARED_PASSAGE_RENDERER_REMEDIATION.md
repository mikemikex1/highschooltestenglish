# English Exam Shared Passage Renderer Remediation

Status: PASS targeted renderer / BLOCKED full Independent QA

## Root cause

The Exam question renderer read `passageRefs` but never resolved those IDs against `window.canonicalPassageData` or mounted the shared material.

## Remediation

Only [docs/exam-mode.js](../docs/exam-mode.js) was changed. The renderer now resolves `currentQuestion.passageRefs` in order, finds the matching canonical passage record, and mounts one `.exam-passage` before the single current question card. Passage content is sanitized/rendered from the canonical `html` (or escaped canonical `content`) without copying it into question records or rendering answers/explanations.

## Targeted QA

- Q42 before: passage DOM = 0
- Q42 after: passage DOM = 1
- Q42 question cards = 1
- Q42 passage ID = `passage-7cb1c189`
- Q42 passage visible = YES
- Q42 D interaction = PASS
- Q42 B interaction = PASS by canonical answer mapping
- Q42 reset = PASS
- Q42 pre-submit answer leak = 0
- Q35/Q42/Q45 shared passage reuse = PASS; one passage node at a time
- 111 reading, 114 reading, 115 Q31, 115 Q35, and 115 mixed samples = PASS targeted mount
- 320/390/430/768/1024/1440 overflow probe = 0 offenders
- targeted console/page/request failures = 0

## Full Independent QA

Full local QA remains FAIL because translation routes for 111/115 still show placeholder labels and no reference-answer control, and the composition route does not expose the required `查看寫作解析` control. No commit, push, or public QA was performed.
