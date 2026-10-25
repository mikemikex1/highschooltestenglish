# Exam Pre-Submit Leak Audit

## Static/runtime design

- Answer text and explanation nodes are created only from the submit handler.
- Before submit, the mounted question card contains the prompt, options or response textarea, and controls only.
- Correct/incorrect classes are added only after submit.
- No all-year question or solution collection is mounted.
- Reset re-renders the current question and removes feedback state.

## Local spot result

- 115 Q3 pre-submit feedback: absent
- 115 Q3 pre-submit correct/wrong classes: absent
- 115 Q3 wrong submit: feedback and classes appeared after submit
- 115 Q3 reset: feedback and selection cleared

## Shared-passage remediation result

Final rerun: choice leak `0`, translation leak `0`, composition leak `0`.
Leak QA passed independently; overall Independent QA remains FAIL because
browser Back/Forward route synchronization failed.

- 112 Q42: one `.exam-passage` with `data-passage-id="passage-7cb1c189"`, one current question card
- 112 Q35/Q42/Q45: same canonical passage reused without duplicate passage nodes
- Q42 pre-submit answer leak = 0; no feedback, solution, correct/incorrect class, or selected option
- The audit is not a release pass because translation/composition UI gates remain unresolved.
- Translation remediation runtime check: five years had zero mounted reference/explanation nodes before the reference action.
- Composition remediation runtime check: existing 112/113 records had zero mounted sample/analysis nodes before Confirm; zero analysis nodes after Confirm and before `查看寫作解析`.
- The five-year composition gate remains FAIL because source records for 111/114/115 are absent; no substitute content was generated.
