# Supplement Example Completeness Audit

## Result

`SUPPLEMENT_EXAMPLE_COMPLETENESS_PASS`

The example gate was evaluated against all 2,000 canonical supplement records. No source-backed example was lost by parsing, and no canonical example was omitted by the renderer. Records whose canonical source has no example remain explicitly marked as source-missing; no example was invented.

## Category coverage

| Category | Total | Source example exists | Canonical example exists | Rendered example | Source example missing |
|---|---:|---:|---:|---:|---:|
| Vocabulary | 250 | 0 | 0 | 0 | 250 |
| Collocation | 750 | 0 | 0 | 0 | 750 |
| Sentence Patterns | 1,000 | 750 | 750 | 750 | 250 |
| **Total** | **2,000** | **750** | **750** | **750** | **1,250** |

## Gate results

- `SOURCE_EXAMPLE_EXISTS_CANONICAL_MISSING = 0`
- `CANONICAL_EXAMPLE_EXISTS_RENDERER_MISSING = 0`
- `SUPPLEMENT_SOURCE_EXAMPLE_MISSING = 1,250`
- `SUPPLEMENT_PARSER_EXAMPLE_OMISSION = 0`
- `SUPPLEMENT_RENDERER_EXAMPLE_OMISSION = 0`

The source-missing count is expected from the canonical source records. Vocabulary and collocation records contain term/meaning or term-only entries, not source example sentences. Sentence-pattern records contain 750 source example entries and 250 pattern-only entries.

## Spot checks

### Required sentence-pattern term

`It is + adj. + for sb. to V` occurs in four source records:

| ID | Source rawText | Canonical example | Rendered status |
|---|---|---|---|
| sentencePattern-0001 | `#1001 句型：對某人而言做某事是……的` | none | `SOURCE_EXAMPLE_MISSING` |
| sentencePattern-0002 | `#1002 例句：It is important for students to review regularly.` | It is important for students to review regularly. | PASS |
| sentencePattern-0003 | `#1003 例句：It is difficult for beginners to avoid every mistake.` | It is difficult for beginners to avoid every mistake. | PASS |
| sentencePattern-0004 | `#1004 例句：It is necessary for us to protect the environment.` | It is necessary for us to protect the environment. | PASS |

For records 0002–0004, the rendered card visibly includes `例句：...`. Record 0001 is correctly not given a fabricated example.

### Five Vocabulary spot checks

`ability`, `access`, `achieve`, `adapt`, and `advantage` were checked. All are `SOURCE_EXAMPLE_MISSING`; no canonical or rendered example exists.

### Five Collocation spot checks

`academic ability`, `language ability`, `have the ability to`, `access information`, and `gain access to` were checked. All are `SOURCE_EXAMPLE_MISSING`; no canonical or rendered example exists.

### Five Sentence Pattern spot checks

`sentencePattern-0002` through `sentencePattern-0004`, plus two later source-example records, were checked. Each has a non-empty canonical example and the card renders a visible `例句：` line. Status: PASS.

## UI rule verification

The existing card renderer emits `例句：` whenever `item.example` is non-empty and emits no empty example label otherwise. This satisfies the source-backed display rule without changing canonical data or adding generated content.

