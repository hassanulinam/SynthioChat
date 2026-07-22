# SynthioChat Progress

## Current Phase
Phase 10 — Complete

## Completed
- Phase 0: types, utils, constants, `index.css` app shell, `memory.md`
- Phase 1: `chat.service.ts` (1s mock + `force error`) and `voice.service.ts` (SpeechRecognition STT)
- Phase 2: `ChatStore` (composerText), `VoiceStore` → ChatStore wiring, `rootStore`, `StoreProvider`
- Phase 3: common UI — Button, IconButton (placeholder), Spinner, ErrorBanner, EmptyState
- Phase 4: Sidebar, ChatList, ChatItem, NewChatButton
- Phase 5: ChatWindow, controlled MessageComposer, MessageList, bubbles, typing indicator
- Phase 6: VoicePanel with live STT transcript, Start/End Call, status labels
- Phase 7: AppLayout + HomePage responsive shell (desktop / tablet / mobile drawer)
- Phase 8: Error banners with retry/dismiss for chat and voice (mic / unsupported browser)
- Phase 9: localStorage persistence for sessions + active session id
- Phase 10: `pnpm build` and `pnpm lint` pass

## Files Modified
- Full MVP under `src/`
- Removed Vite demo `App.css` and starter assets
- `.cursor/memory.md`

## Remaining Work
- Nice-to-haves (deferred): session rename/delete, markdown, theme toggle, toasts, real icons/images, TTS

## Notes / Decisions
- Icons/images: CSS/`data-icon` placeholders only
- Voice: browser SpeechRecognition; interim fills composer; final auto-sends; no TTS
- Chat error demo: include `force error` in a message; Retry always succeeds
- Voice not persisted; corrupt localStorage ignored
- Persistence keys: `synthiochat.sessions`, `synthiochat.activeSessionId`
