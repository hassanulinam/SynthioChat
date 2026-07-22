# SynthioChat

**SynthioChat** is an MVP chat + voice assistant for **life-sciences customer engagement** — built in the spirit of Synthio Labs’ agentic AI platform for pharma GTM teams.

It helps field, medical, patient-support, and commercial users draft **compliant-minded** conversations across HCPs and patients: visit prep, evidence framing, objection handling, and supportive scripts — with browser-native voice for hands-free practice.

> Demo responses are illustrative only. They are **not** approved promotional content, **not** medical advice, and **not** a substitute for label / PI / MLR review.

## Who it’s for

| Audience | Typical workflows in this MVP |
| --- | --- |
| **Field** | HCP visit agendas, openers, objection handling, Audio chat role-play |
| **Medical Affairs** | Evidence summaries, guideline framing, MLR-minded FAQ drafts |
| **Patient Support** | Plain-language titration / adherence scripts, supportive call flows |
| **Commercial** | Channel planning, educational nurture outlines, campaign briefs |

## Product highlights

### Life-sciences engagement layer
- Role-aware empty state with Synthio positioning copy
- Persisted audience roles that filter starter prompts
- GPT-style suggestion chips (prefill composer; one chip launches **Audio chat**)
- Follow-up chips: shorter rewrite, safety caveats, HCP role-play, patient-friendly tone
- Domain mock replies with visit tables, evidence bullets, blockquotes, and safety notes
- Persistent demo compliance disclaimer under the composer

### Chat core
- Multi-session workspace: create, switch, rename, delete, pin / unpin
- Dedicated **Pinned** section and sidebar search
- Markdown assistant replies (`react-markdown` + `remark-gfm`) — headings, lists, tables, code, quotes
- Typing indicator, slide-in message animation, Enter / Shift+Enter composer behavior
- Empty draft chats stay in memory only (not persisted until they have messages)

### Voice (clinical conversation practice)
- **Mic mode:** speech-to-text into the composer; send when ready
- **Audio chat:** listening → processing → speaking panel for hands-free Q&A
- Silence auto-send + TTS readback of the assistant reply
- Graceful handling when Speech APIs or mic permission are unavailable

### Shell & UX
- Collapsible / resizable sidebar (desktop), mobile drawer that starts closed and auto-collapses after navigate
- Light / dark theme (dark default, persisted)
- Toasts for key actions

## Architecture

```
UI Components → MobX Stores → Services
```

Components never call services directly. Mock chat and browser voice sit behind services so a clinical LLM, MI knowledge base, or realtime voice agent can replace them later without rewriting the UI.

## Tech stack

- React 19 + TypeScript + Vite
- MobX (`mobx` / `mobx-react`)
- `react-markdown` + `remark-gfm`
- Browser `SpeechRecognition` / `speechSynthesis`

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
- Include `force error` in a message to exercise the chat error / retry path

## Project structure

```
src/
  components/   # chat, sidebar, voice, common (one folder per component)
  stores/       # ChatStore, VoiceStore, UiStore
  services/     # mock chat API, STT, TTS
  constants/    # storage keys, life-sciences prompts & roles
  Icons/ pages/ layouts/ types/ utils/
```

## Persistence

`localStorage` keeps sessions with ≥1 message, active session id, theme, and audience role. Voice state and empty drafts are not persisted.

## Try these MVP scenarios

1. Pick **Field** → “HCP visit prep” → refine with **Add safety caveats**
2. Pick **Medical Affairs** → “MLR-safe FAQ” → **Role-play as HCP**
3. Pick **Patient Support** → “Adherence follow-up” → **Make patient-friendly**
4. Use **Practice with Audio chat** to rehearse an opener out loud

## Future scope

Roadmap toward a production Synthio-style engagement assistant:

- **Clinical GenAI backends** — grounded models over label, PI, ISI, and approved content
- **Streaming responses** — token streaming with stop / regenerate
- **Compliance engines** — MLR workflows, AE / PV detection and escalation
- **Citations & audit trails** — source-linked answers for medical review
- **Prompt / playbook library** — therapy-area and brand-specific starters in the sidebar
- **Brand context pinning** — indication, market, and approved claims that constrain suggestions
- **Realtime voice agents** — WebRTC / websocket agents beyond Web Speech API
- **Auth & workspaces** — accounts, team shared chats, export
- **Observability** — usage, moderation, rate limits
- **Offline & sync** — IndexedDB + backend reconciliation
- **Accessibility** — richer keyboard and live-region support for streaming

## License

Private MVP — not licensed for redistribution unless Synthio Labs states otherwise.
