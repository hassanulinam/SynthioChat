# AGENTS.md

## Decision Hierarchy

When instructions conflict, follow this priority:

1. Direct user request

2. requirements.md

3. AGENTS.md

4. Existing project architecture and code style

5. AI preferences or assumptions

When uncertain, ask for clarification instead of making architectural decisions.

# Synthio Labs Frontend Assignment

This repository is developed with AI assistance. These instructions define the engineering conventions and collaboration workflow for all generated code.

The primary objective is to produce code that is clean, maintainable, predictable and easy for another frontend engineer to understand.

---

# Tech Stack

- React 19
- TypeScript
- MobX
- Tailwind CSS
- Vite

Do not introduce additional libraries unless explicitly requested.

---

# Engineering Philosophy

Prioritize

- Simplicity
- Readability
- Maintainability
- Explicitness
- Predictability

Avoid clever code.

Avoid premature abstraction.

Avoid solving hypothetical future problems.

When multiple implementations are possible, choose the one that is easiest to understand.

---

# Architecture

Application architecture should follow this flow.

```
UI Components
        ↓
MobX Stores
        ↓
Services
```

## Components

Responsible for

- Rendering UI
- User interactions
- Calling store actions

Components should not contain business logic.

---

## Stores

Responsible for

- Application state
- Business logic
- Actions
- Computed values

Stores should not contain rendering logic.

---

## Services

Responsible for

- Mock APIs
- Future network APIs
- Data transformation

Components must never communicate directly with services.

Always go through stores.

---

# Folder Structure

```
src/

assets/

components/
    common/
    chat/
    sidebar/
    voice/

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

Do not reorganize folders unless explicitly requested.

---

# Component Design

Each component should have one responsibility.

Favor composition over large components.

When a component becomes difficult to navigate, split it.

---

## JSX Organization

Large JSX blocks should be separated using render functions.

Example

```tsx
const renderHeader = () => {}

const renderMessages = () => {}

const renderComposer = () => {}

return (
    <>
        {renderHeader()}
        {renderMessages()}
        {renderComposer()}
    </>
)
```

Avoid returning hundreds of lines of JSX directly.

---

# State Management

Use MobX.

Global state belongs in stores.

Examples

- chats
- sessions
- messages
- voice state
- loading
- errors

Temporary UI state belongs inside components.

Examples

- dialog visibility
- hover state
- focused input

Avoid prop drilling.

---

# React

Assume React 19.

Do not introduce

- useMemo
- useCallback
- React.memo

unless there is a measurable performance issue.

Do not optimize based on assumptions.

Readable code is preferred.

---

# Styling

Tailwind CSS is the primary styling solution.

However...

If Tailwind utility classes become difficult to read, move them into a nearby CSS file.

Instead of

```tsx
<div className="flex items-center justify-between rounded-xl border px-5 py-4 shadow transition ...">
```

Prefer

```tsx
<div className="chat-card">
```

with

```
ChatCard.css
```

Keep JSX concise.

---

# TypeScript

Never weaken types simply to satisfy the compiler.

Avoid

```
any
```

Prefer

- interfaces
- union types
- explicit models

Keep shared types inside

```
types/
```

---

# Naming

Use descriptive names.

Good

```
ChatSidebar

VoicePanel

MessageBubble

createSession()

sendMessage()
```

Avoid

```
temp

data

obj

item

handleData
```

---

# Reusability

Extract reusable logic only after it becomes reusable.

Do not build generic abstractions for future possibilities.

Avoid

- utility functions used once
- custom hooks used once
- reusable components with one consumer

---

# Imports

Keep imports grouped.

1. React

2. Third-party libraries

3. Stores

4. Services

5. Components

6. Hooks

7. Types

8. Utils

9. Styles

Remove unused imports.

---

# Async Code

Prefer async / await.

Never silently swallow errors.

Handle loading and failure explicitly.

---

# Comments

Code should explain *how*.

Comments should explain *why*.

Avoid comments describing obvious behavior.

---

# Accessibility

Whenever appropriate

- Buttons require accessible labels.
- Interactive elements should support keyboard usage.
- Focus order should remain predictable.

---

# Performance

Optimize only when a measurable bottleneck exists.

Never introduce optimization because "it might help."

---

# Cursor Collaboration

Before implementing medium or large features

1. Explain the approach.
2. List the files that will change.
3. Keep changes incremental.

Avoid rewriting unrelated files.

Do not perform unsolicited refactors.

---

# Scope

Only modify files directly related to the requested task.

Respect existing architecture.

Do not

- change state management
- introduce dependencies
- rename folders
- reorganize project structure

unless explicitly instructed.

---

# Completion Summary

After implementation provide

## Completed

...

## Files Modified

...

## Remaining Work

...

---

# Definition of Good Code

Every pull request should leave the project

- simpler
- cleaner
- more readable
- easier to maintain

A new frontend engineer should understand the implementation within a few minutes.

When in doubt, choose the simpler solution.