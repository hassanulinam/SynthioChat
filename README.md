# SynthioChat

SynthioChat is a lightweight ChatGPT-style AI assistant UI built for the Synthio Labs frontend assignment. It focuses on clean architecture, polished UX, and browser-native voice features — with mocked chat responses for the MVP.

## Features

### Chat
- Create, switch, rename, delete, and pin/unpin conversations
- Pinned chats appear in a dedicated **Pinned** section
- Controlled message composer with Enter to send and Shift+Enter for newlines
- Auto-growing multi-line input
- Typing indicator and disabled send while waiting for a reply
- Markdown rendering for assistant messages (`react-markdown` + `remark-gfm`)
- Empty chats (no messages yet) are kept in memory only and are not persisted

### Voice
- **Mic mode:** live speech-to-text fills the composer; send manually
- **Audio chat mode:** dedicated panel with listening / processing / speaking states
- Silence detection auto-sends in audio chat, then reads the reply aloud (TTS)
- Graceful errors for unsupported browsers or denied microphone access

### Layout & UX
- Collapsible, **resizable sidebar** (up to ~40% of viewport width on desktop)
- Chat search in the sidebar
- Light / dark theme toggle (persisted)
- Responsive mobile drawer sidebar
- Toasts for key actions (new chat, pin, rename, delete, theme)

### Architecture
```
UI Components → MobX Stores → Services
```
Components never call services directly. Chat replies and voice APIs are abstracted behind services so real backends can be swapped in later.

## Tech stack

- React 19 + TypeScript
- Vite
- MobX (`mobx` / `mobx-react`)
- `react-markdown` + `remark-gfm`
- Browser `SpeechRecognition` / `speechSynthesis` (no extra voice libraries)

## Local setup

### Prerequisites
- Node.js 20+ recommended
- [pnpm](https://pnpm.io/) 

### Install & run

```bash
pnpm install
pnpm dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Other scripts

```bash
pnpm build    # typecheck + production build
pnpm preview  # preview the production build
pnpm lint     # oxlint
```

### Voice tips
- Prefer **Chrome** or **Edge** for speech recognition
- Use `localhost` or HTTPS (secure context required for mic access)
- Allow microphone permission when prompted

### Demo helpers
- Include `force error` in a chat message to exercise the chat error banner / retry flow

## Project structure (high level)

```
src/
  components/   # chat, sidebar, voice, common UI
  stores/       # ChatStore, VoiceStore, UiStore
  services/     # mock chat API, STT wrapper, TTS helper
  Icons/        # SVG icon components
  pages/        # HomePage shell
  layouts/      # AppLayout
  types/ utils/ constants/
```

## Persistence

Chat sessions with at least one message (plus active session id and theme) are stored in `localStorage`. Voice state and empty draft chats are not persisted.

## Future scope

Ideas to evolve SynthioChat toward a production ChatGPT-like product:

- **Authentication & accounts** — sign-in, multi-device sync, per-user history
- **Real GenAI backends** — OpenAI / Anthropic / custom LLM APIs instead of mocked delays
- **Streaming responses** — token-by-token assistant output with cancel / stop generation
- **Conversation context** — system prompts, tools/function calling, longer memory
- **Rich content** — code highlighting, file/image uploads, canvas / artifacts
- **Realtime voice** — WebRTC / websocket voice agents beyond Web Speech API
- **Collaboration** — shared chats, team workspaces, export / import
- **Observability** — analytics, rate limits, usage quotas, moderation
- **Offline & sync** — IndexedDB + backend reconciliation
- **Accessibility polish** — deeper keyboard workflows, screen-reader live regions for streaming

## License

Private assignment project — not licensed for redistribution unless Synthio Labs states otherwise.
