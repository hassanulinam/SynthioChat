# Synthio Labs Frontend Assignment

## Objective

Build a responsive AI Assistant web application that allows users to communicate with an AI through both text chat and voice interactions.

The goal is **not** to build a production AI system, but to demonstrate frontend engineering skills, clean architecture, component design, state management, and overall user experience.

---

# Primary Goals

The application should feel like a lightweight version of ChatGPT.

Focus on:

- Clean UI
- Excellent code organization
- Reusable components
- Maintainable architecture
- Smooth UX
- Proper loading/error handling
- Responsive design

The implementation should prioritize readability over cleverness.

---

# Core Features

## 1. Chat Interface

### Requirements

Users should be able to:

- View previous messages
- Send new messages
- Receive assistant responses
- Continue existing conversations

### Message Types

User messages

- Right aligned
- Distinct background
- Timestamp (optional)

Assistant messages

- Left aligned
- Different background
- Timestamp (optional)

### Message Composer

Input area should support

- Single line typing
- Multi-line with Shift + Enter
- Enter to send
- Send button

Send button should become disabled when

- Request is loading
- Message is empty

---

## 2. Chat Sessions

Users should be able to manage conversations.

### Features

- Create New Chat
- View Previous Chats
- Switch Between Chats
- Active conversation highlighting

Each chat session should contain

- id
- title
- createdAt
- updatedAt
- messages

Titles may be generated automatically using

- First user message
- "New Chat"

---

## 3. Voice Interface

Provide a dedicated voice interaction panel.

The UI should support the following states:

Disconnected

↓

Connecting

↓

Connected

↓

Listening

↓

Speaking

↓

Disconnected

### Features

Start Call

End Call

Display current status

Display transcript (if available)

Voice controls should be independent of the text chat.

---

## 4. Loading States

### Chat

While waiting for assistant response

Show

- Assistant typing indicator
- Disabled send button

### Voice

Connecting

Display

- Connecting...

Speaking

Display

- Speaking...

Listening

Display

- Listening...

---

## 5. Error Handling

Gracefully handle failures.

Possible errors

- Chat API failure
- Voice connection failure
- Timeout
- Network error

Display

- Error banner
- Retry option where applicable

Application should never crash because of an API failure.

---

# Layout

Desktop

```
+------------------------------------------------------+
| Sidebar | Chat Header                                |
|         |--------------------------------------------|
| Chats   |                                            |
|         | Messages                                   |
|         |                                            |
|         |                                            |
|         |--------------------------------------------|
|         | Composer                     Voice Panel   |
+------------------------------------------------------+
```

Tablet

Sidebar becomes narrower.

Mobile

Sidebar collapses behind a menu.

Main chat occupies full width.

---

# Responsive Requirements

Support

Desktop

Tablet

Mobile

Avoid fixed widths.

Use flexible layouts.

---

# Suggested Application Architecture

```
App

├── Sidebar
│      Chat List
│      New Chat Button
│
├── Chat Area
│      Header
│      Message List
│      Composer
│
├── Voice Panel
│      Status
│      Controls
│      Transcript
│
└── Global State
```

---

# Suggested Folder Structure

```
src/

    assets/

    components/

        chat/

        sidebar/

        voice/

        common/

    layouts/

    pages/

    stores/

    services/

    hooks/

    types/

    utils/

    constants/

    styles/
```

---

# Component Breakdown

## Sidebar

Responsibilities

- Display chat sessions
- Create new chat
- Switch chats

Components

```
Sidebar

ChatList

ChatItem

NewChatButton
```

---

## Chat

Components

```
ChatWindow

ChatHeader

MessageList

MessageBubble

TypingIndicator

MessageComposer

SendButton
```

---

## Voice

Components

```
VoicePanel

VoiceStatus

Transcript

CallControls
```

---

## Common

Reusable UI

```
Button

Loader

Spinner

ErrorBanner

EmptyState

Modal (optional)

IconButton
```

---

# State Management

Use MobX.

Keep stores simple.

Suggested stores

```
ChatStore

VoiceStore
```

or

```
RootStore

├── ChatStore

└── VoiceStore
```

Avoid unnecessary abstraction.

---

# Chat Store Responsibilities

Maintain

- Chat sessions
- Current session
- Messages
- Loading state
- Error state

Operations

- createChat()
- switchChat()
- sendMessage()
- receiveMessage()

---

# Voice Store Responsibilities

Maintain

- Current status
- Transcript
- Error
- Connection state

Operations

- startCall()
- endCall()
- updateTranscript()

---

# Data Models

## Message

```ts
interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
}
```

---

## Chat Session

```ts
interface ChatSession {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messages: Message[];
}
```

---

## Voice Status

```ts
type VoiceStatus =
    | "disconnected"
    | "connecting"
    | "connected"
    | "listening"
    | "speaking";
```

---

# Services

Separate business logic from UI.

```
services/

    chat.service.ts

    voice.service.ts
```

Services should simulate APIs.

Components should never contain fetch logic.

---

# Mock API Behaviour

Chat

```
User sends message

↓

1 second delay

↓

Assistant responds
```

Voice

```
Start

↓

Connecting

↓

Connected

↓

Listening

↓

Speaking

↓

Listening
```

Responses may be mocked.

---

# UX Expectations

Auto-scroll to newest message

Disable send button during loading

Input clears after sending

Typing indicator while assistant responds

Conversation persists while switching chats

Current chat highlighted

Voice status updates immediately

Responsive spacing

Smooth scrolling

Clean animations (optional)

---

# Empty States

No chats

Display

"Start a new conversation"

New chat with no messages

Display

"How can I help you today?"

Voice inactive

Display

"Press Start Call to begin."

---

# Accessibility

Buttons should have accessible labels.

Keyboard navigation should work.

Focus should remain predictable.

Sufficient color contrast.

---

# Persistence (Optional but Recommended)

Persist chat sessions using

localStorage

Restore sessions when the application reloads.

---

# Nice-to-Have Features

These are secondary priorities.

- Chat timestamps
- Session rename
- Delete chat
- Animated transitions
- Markdown rendering
- Copy message button
- Theme toggle
- Toast notifications

Only implement these after completing all required features.

---

# Out of Scope

Do NOT spend time on

- Authentication
- Real AI APIs
- Backend
- Database
- User accounts
- Streaming responses
- File uploads
- Image generation
- Authentication flows

---

# Code Quality Expectations

Prioritize

- Strong TypeScript typing
- Small focused components
- Reusable UI
- Separation of concerns
- Clean folder structure
- Descriptive naming
- Minimal prop drilling
- Predictable state flow
- Consistent styling
- Maintainable architecture

---

# Definition of Done

The application should allow a user to

✅ Create chats

✅ Switch chats

✅ Send messages

✅ Receive mocked AI responses

✅ View conversation history

✅ Start voice interaction

✅ End voice interaction

✅ Observe voice status updates

✅ View transcript (mocked if necessary)

✅ Experience loading and error states

✅ Use the application comfortably on desktop and mobile

The final project should resemble a polished MVP of a modern AI assistant rather than a basic coding assignment.