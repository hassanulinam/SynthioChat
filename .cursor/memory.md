# SynthioChat Progress

## Current Phase
UI polish — ChatGPT-style layout

## Completed
- Pill composer matching reference (mic + pink audio CTA; no plus)
- Auto-growing multi-line input
- Full-width main chat area after voice panel removal
- Centered chat column (`max-width: 48rem`) for messages + composer
- ChatGPT-like empty greeting and message styling

## Files Modified
- `src/index.css`, layout/chat CSS, `MessageComposer`, `ComposerVoiceControls`, `SendButton`

## Remaining Work
- Nice-to-haves (deferred): real icons, rename/delete, markdown

## Notes / Decisions
- Composer actions order: Send (when text) → Mic → Audio chat
- Icons remain placeholders
