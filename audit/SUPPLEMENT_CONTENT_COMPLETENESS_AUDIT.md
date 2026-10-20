# Supplement Content Rendering Completeness Audit

## Result

`SUPPLEMENT_CONTENT_RENDERING_COMPLETENESS_PASS`

The audit found no renderer omission and no parser omission for fields that are actually present in the canonical records. The source-missing counts below are reported, not filled with generated content.

## Canonical inventory

All 2,000 canonical records were inspected record-by-record in the loaded runtime, including every available field listed below and the rendered card contract.

| Category | Count | Term | Meaning | Part of speech | Pattern | Example | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|
| vocabulary | 250 | 250 | 250 | 0 | 0 | 0 | 0 |
| collocation | 750 | 750 | 0 | 0 | 0 | 0 | 0 |
| sentencePattern | 1,000 | 1,000 | 250 | 0 | 1,000 | 750 | 0 |
| **total** | **2,000** | **2,000** | **500** | **0** | **1,000** | **750** | **0** |

The runtime canonical schema contains: `id`, `category`, `term`, `meaning`, `partOfSpeech`, `pattern`, `example`, `notes`, `tags`, `lessonRefs`, `questionRefs`, `sourceRef`, and `rawText`.

## Source and parser result

`sourceRef` for all records is `高中學測常考單字句型2000項.md`. The raw source records for the audited missing fields do not contain those fields; therefore these are `SUPPLEMENT_SOURCE_FIELD_MISSING`, not parser omissions.

| Field | Present | Source missing |
|---|---:|---:|
| meaning | 500 | 1,500 |
| partOfSpeech | 0 | 2,000 |
| pattern | 1,000 | 1,000 |
| example | 750 | 1,250 |
| notes | 0 | 2,000 |

`SUPPLEMENT_PARSER_OMISSION = 0`.

## Renderer result

The supplement card renderer conditionally emits every populated canonical field:

- `meaning` → 中文
- `pattern` → 句型
- `example` → 例句
- `partOfSpeech` → 詞性
- `notes` → 備註

Empty source fields do not produce empty headings. Therefore:

- `SUPPLEMENT_RENDERER_OMISSION_BEFORE = 0`
- `SUPPLEMENT_RENDERER_OMISSION_AFTER = 0`
- `SUPPLEMENT_RENDERER_OMISSION = 0`
- empty detail labels = 0

## Required spot checks

| Term | Category | Canonical fields | Rendered result | Status |
|---|---|---|---|---|
| academic ability | collocation | term only; source has no meaning/pattern/example | term, category, id, controls | PASS_SOURCE_FIELDS_EXACT |
| language ability | collocation | term only; source has no meaning/pattern/example | term, category, id, controls | PASS_SOURCE_FIELDS_EXACT |
| have the ability to | collocation | term only; source has no meaning/pattern/example | term, category, id, controls | PASS_SOURCE_FIELDS_EXACT |

The three requested collocation cards are not parser or renderer failures: their canonical `rawText` contains only the collocation term.

Additional sampled records from each category confirmed the same conditional rendering behavior. Existing canonical fields appear on cards; absent source fields do not create fabricated content.

## Mobile structural check

No source or renderer changes were made in this audit. The existing card markup uses normal flow text and conditional paragraphs; no long-field data was added. A browser visual measurement was not rerun for this audit, so this document does not claim a new visual PASS.

## Release gate

- canonical total remains 2,000: PASS
- vocabulary 250 / collocation 750 / sentence patterns 1,000: PASS
- parser omissions: 0: PASS
- renderer omissions: 0: PASS
- source-field-missing records: non-zero and explicitly reported: PASS
- source content invented or supplemented: NO

Example completeness is gated separately in `SUPPLEMENT_EXAMPLE_COMPLETENESS_AUDIT.md`: source-backed examples are canonical and rendered; source-missing examples remain unfilled.
