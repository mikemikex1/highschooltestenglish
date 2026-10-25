# English Exam Mode Inventory

Status: IMPLEMENTED WITH SOURCE-DATA LIMITATIONS

The exam mode is a renderer over existing canonical records. It does not create a second official question authority.

## Canonical scope

- Official unique records: 76 (`sourceType === "official"`)
- Existing non-choice exam source records reused by the mode: `source-translation-*` and `source-composition-*`
- Runtime exam records exposed by the index: 82
- Years: 111, 112, 113, 114, 115
- State: `mode`, `year`, `section`, `group`, `question`
- Navigation: hash-driven with `hashchange`; one current question card is mounted at a time.

## Sections

Vocabulary / 詞彙, Cloze / 綜合測驗, Context / 文意選填, Discourse / 篇章結構, Reading / 閱讀測驗, Mixed / 混合題, Translation / 中譯英, Composition / 英文作文.

## Known source limitations

- Some official canonical records intentionally contain the placeholder `正式題組內容由官方題卡呈現` and no options. The mode does not invent missing official content.
- Existing translation source records are incomplete for 111, 114, and 115 reference-answer data; 114 translation source record was not present in the inspected canonical data.
- Passage rendering is used only when a question has an explicit `passageRefs` relation; no passage is guessed from lesson text.

## Data authority

`window.canonicalQuestionData` and `window.canonicalPassageData` remain the only runtime sources for question and passage content.
