# Official Question Rendering Integrity Audit

## Result

PASS — renderer integrity fixed locally; online release verification remains pending until the committed Pages deployment is checked.

## Scope

This audit covers rendering only. Official question text, answer data, passages, translations, compositions, quiz records, MCQ mappings, PDF references, and image references were not rewritten.

## Root Cause

The mounted-view enhancement treated every `form.mcq-card` as a four-option single-select card. Shared-option cloze, paragraph-structure, mixed-question, image/map, multi-select, and short-answer records therefore received generated A–D controls. When their source payload had no four options, the generated controls displayed placeholder text or `undefined`.

The minimal fix adds an official question-type renderer. For non-standard official questions it removes only the generated fake A–D form and its placeholder option analysis, then displays the correct type notice while preserving the existing official source-context, passage, and image/PDF references. Standard single-select cards continue to use the existing MCQ renderer.

## Before / After Evidence

Before the fix, the static package contained 14 affected official question groups and 48 affected rendered card copies. The affected groups were:

- 115 Q21–30: shared-option cloze
- 115 Q31–34: paragraph structure
- 112 Q45, 114 Q42, 115 Q38, 115 Q43: image/map or other non-standard item cards
- 111 Q47–49, 112 Q47, 113 Q47, 114 Q47, 115 Q47, 115 Q50: mixed/non-standard items

After the fix, all 111 lesson-view routes were opened and checked. Results:

- visible placeholder or `undefined` text: 0
- non-standard official cards retaining fake A–D controls: 0
- canonical runtime records containing placeholder or `undefined` data: 0
- lessons: 24
- lesson views: 111
- quiz records: 192
- MCQ mapping baseline: 408
- answer leak baseline: 0

## Representative Type Checks

### 115 Q21–30

115 Q21–30 is rendered as `SHARED_OPTION_CLOZE`, not as independent A–D MCQs. The official shared pool remains visible in the official source context and the renderer shows:

`A retain｜B depend on｜C atmosphere｜D delay｜E unproductive｜F risk｜G function｜H minimal｜I dramatic｜J point to`

The original passage and numbered blanks remain in the source-context disclosure.

### 115 Q31–34

These cards are rendered as `PARAGRAPH_STRUCTURE`; the renderer does not manufacture A–D options. The official passage and candidate sentences remain in the existing source context.

### Mixed, image, map, multi-select, and short-answer items

The renderer assigns explicit non-standard types (`MIXED_ITEM`, `IMAGE_OR_MAP_ITEM`, `MULTI_SELECT`, or `SHORT_ANSWER`) and removes only the invalid generated single-select controls. Existing official text, passages, and references remain in the card.

## Regression Checks

The local file URL was tested after the fix. A standard single-select card still accepts a radio choice, reports a wrong selection as incorrect and the official answer as correct, and reset clears the feedback. No quiz record was changed; the runtime quiz count remained 192.

## Official Integrity Baseline

The existing official-source baseline remains:

- PASS_EXACT: 260
- PASS_SUMMARY_CORRECTLY_LABELED: 5
- FAIL: 0

The fix does not relabel or rewrite official question text. It changes only the rendering path used when a record is not a four-option single-select item.

## Online Gate

GitHub Pages must still be checked after commit. The final online audit must confirm HTTP 200, the frozen runtime metrics, zero visible placeholders, zero console errors, zero network 404 responses, and the required responsive/navigation/interaction gates before release readiness is declared.

