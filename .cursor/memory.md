# SynthioChat Progress

## Current Phase
Nice-to-haves — complete

## Completed
- Composer clears immediately on send; mic draft resets (recognition restarts so interim cannot refill)
- User messages right-aligned in chat column
- Session rename + delete
- Lightweight markdown for assistant replies
- Light/dark theme toggle (persisted)
- Toast notifications for key actions
- Audio chat TTS already present from earlier work

## Files Modified
- Stores: `chatStore`, `voiceStore`, `uiStore`, `rootStore`
- Chat UI alignment + markdown bubble
- Sidebar: ChatItem actions, ThemeToggle, ToastHost

## Remaining Work
- Real icons/images (still placeholders by design)

## Notes / Decisions
- No new libraries for markdown (small custom renderer)
- Icons remain placeholders
