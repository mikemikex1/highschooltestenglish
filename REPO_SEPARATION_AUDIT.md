# 學測英文 24 課｜Repo Separation Audit

## Result

`FAIL`

Repo 結構、檔案複製、content freeze 與路徑驗證完成；但來源附件要求的核心 runtime 基準與實際離線頁面 runtime 統計不一致，因此不宣告 separation PASS。

## Source Verification

- website source = `英文快速複習/offline-package-v4/`
- index = `英文快速複習/offline-package-v4/index.html`
- assets = `英文快速複習/offline-package-v4/assets/`
- PDF = `英文快速複習/offline-package-v4/PDF/`
- PDF count = `21`
- ZIP = `英文快速複習/學測英文24課_手機離線完整版.zip`

## New Repo

- path = `學測英文24課_GitHub/`
- `.git` = `YES`
- git root = `C:/Users/Daming/Documents/香魚學測/學測英文24課_GitHub`
- branch = `main`
- initial commit = `YES` (`1aa5002`)
- clean tree = `YES`
- remote = `REMOTE_NOT_SET`

## Docs

- index = `YES`
- `.nojekyll` = `YES`
- assets = `YES`（3 files）
- PDF = `YES`（21 files）
- source index SHA-256 = `DFA6B3E0DA1A8AC77CD4750ECC2A6A7A13AE41F64E321A03E20257A8E5B85CBB`
- docs index SHA-256 = `DFA6B3E0DA1A8AC77CD4750ECC2A6A7A13AE41F64E321A03E20257A8E5B85CBB`
- broken assets = `0`
- broken PDF refs = `0`
- case mismatch = `0`（依實體相對引用檢查）
- subpath safe = `YES`（HTML 未發現 `/assets/`、`/PDF/` root-absolute references）

## Core Data

### Required baseline from task specification

| Metric | Required | Actual runtime | Result |
|---|---:|---:|---|
| lessons | 24 | 24 | PASS |
| views | 111 | 111 | PASS |
| official | 187 | 160 | FAIL |
| selfCreated | 38 | 29 | FAIL |
| practice | 23 | 230 | FAIL |
| quiz | 192 | 198 | FAIL |
| singleSelect | 408 | 173 canonical records / 28 rendered on current view | FAIL / needs semantic reconciliation |
| passages | 12 | 12 | PASS |
| translation | 20 | 20 expected baseline retained in source audit; not independently re-derived from DOM | NOT independently verified |
| composition | 10 | 10 expected baseline retained in source audit; not independently re-derived from DOM | NOT independently verified |
| supplement | 2000 | 2000 | PASS |
| answer leak | 0 | 0 on current file:// runtime check | PASS |

Runtime values were measured from the copied `docs/index.html` on file:// via its serialized runtime state. The mismatch is recorded rather than corrected because this task forbids modifying website content/runtime.

## Content Freeze

- CURRICULUM_CONTENT_FREEZE = `PASS`
- source/docs index hash identical = `PASS`
- canonical data changed = `NO`
- runtime logic changed = `NO`
- theme = `Cream Pudding Study Theme`, `style#phase4c-theme` retained

## Mobile Visual

- `MOBILE_VISUAL_FINAL_AUDIT = PENDING`
- `ENGLISH_MOBILE_VISUAL_LAYOUT_FINAL_AUDIT.md` was not present in the source inventory and was not fabricated.

## Official Integrity

Based on the existing source audit record:

- PASS_EXACT = `260`
- PASS_SUMMARY_CORRECTLY_LABELED = `5`
- FAIL = `0`

## Release

- offline ZIP source exists = `YES`
- copied without re-zipping = `YES`
- release path = `release/學測英文24課_手機離線完整版.zip`

## Exclusions

The new repo contains no copied subject directories or development folders for:

- 國文
- 社會
- 數學B
- 國寫
- tmp
- scripts
- OCR / crop / screenshots
- offline-package-v3
- old dist

## Security

Static scan of copied HTML for API keys, bearer tokens, passwords, private-key markers and local absolute paths:

- secret count = `0`
- `C:\` references = `0`
- `/Users/` references = `0`
- `/home/` references = `0`
- `file://` references in HTML = `0`
- fetch = `0`
- XMLHttpRequest = `0`
- module scripts = `0`
- remote URLs in HTML = `0`

## Root Git

- old `.git` existed = `NO` on actual filesystem verification
- legacy bundle = `NOT_CREATED`（無母 repo history 可封存）
- bundle verified = `NOT_APPLICABLE`
- old `.git` removed = `NOT_APPLICABLE`
- old root is repo after cleanup = `NO`（本輪未刪除任何 `.git`）

## GitHub Pages

- branch = `main`
- folder = `/docs`
- repo structure ready = `YES`
- deployment final ready = `NO — MOBILE_VISUAL_FINAL_AUDIT_PENDING`
- origin / remote = `NOT_SET`

## Notes

本輪已建立獨立 repo、複製正式離線網站資產、建立初始 commit；沒有修改來源網站、canonical data、PDF、圖片或 runtime。由於核心資料實測與指定基準不一致，保留 `FAIL`，待資料基準釐清後再進行後續修正。
