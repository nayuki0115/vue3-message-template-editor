# AGENTS.md

# Project

Project Name: vue3-message-template-editor

This project is an interview assignment for a Senior Frontend Engineer position.

---

# Assignment Goal

This assignment is intended to demonstrate engineering thinking rather than maximize feature count.

The objective is not only to complete the required features, but also to demonstrate:

- Engineering judgment
- Maintainable architecture
- Product thinking
- Code readability
- AI-assisted development workflow

When trade-offs exist, prefer solutions that are easier to understand, maintain, and justify.

A well-reasoned engineering decision is generally preferred over an over-engineered implementation.

---

# Engineering Principles

## Readability

Prefer explicit and self-explanatory code over clever or overly abstract implementations.

Readable code is generally more valuable than reducing a few lines of code.

Choose implementations that another engineer can quickly understand.

---

## Maintainability

Design code with future maintenance in mind.

Introduce abstractions only when they clearly improve maintainability, reduce duplication, or increase reusability.

Avoid unnecessary complexity.

---

## Consistency

Follow existing project conventions whenever possible.

Prefer consistency over personal preference.

If introducing a different implementation style, explain the reasoning.

---

## Product Thinking

Engineering decisions should consider both technical implementation and user experience.

When requirements are ambiguous, incomplete, or conflicting:

1. Identify the ambiguity.
2. Explain the chosen interpretation.
3. Document important assumptions.
4. Choose the solution with the best engineering and product trade-offs.

Do not implement specifications mechanically.

---

## Team-Oriented Design

Engineering decisions should consider not only technical correctness, but also the people maintaining the code.

When multiple implementations are equally valid, prefer the one that best matches the team's experience and improves long-term maintainability.

Code should be approachable by future contributors, not only its original author.

---

# Decision Making

There is rarely only one correct solution.

When evaluating multiple implementations, balance:

1. Readability
2. Maintainability
3. Consistency
4. Simplicity
5. Product usability
6. Extensibility
7. Performance (only when relevant)

Avoid premature optimization.

Explain important architectural and implementation decisions whenever trade-offs exist.

---

# Tech Stack

Preferred stack:

- Vue 3
- TypeScript
- Vite
- Vue Router
- Ant Design Vue
- pnpm
- ESLint
- Prettier
- Vitest

Alternative solutions are acceptable when they provide clear engineering value.

---

# Vue Guidelines

Prefer:

- Vue 3
- Composition API
- `<script setup>`

Components should primarily focus on rendering and user interaction.

Extract business logic only when it improves readability, maintainability, or reusability.

---

# Component Design

A component should have a clear responsibility.

Typical responsibilities include:

- Layout
- Form
- Preview
- Feedback

Split components when it improves readability or reuse.

Avoid creating unnecessary component layers.

---

# Composable Design

Use a composable when one or more of the following applies:

- Logic depends on Vue's reactivity system.
- Logic is reused across multiple components.
- Logic requires lifecycle hooks.
- Logic coordinates multiple reactive states.

Do not extract a composable solely to reduce component size.

If the logic is a pure TypeScript function without Vue dependencies, place it in `utils/` instead.

Expose simple and focused APIs.

---

# Utils Design

Prefer pure TypeScript functions for logic that does not depend on Vue.

Typical examples include:

- parser
- formatter
- validator
- helper functions

Pure functions should:

- Have no Vue dependency.
- Have no lifecycle dependency.
- Be independently testable.

---

# Folder Structure

Prefer the following structure.

```text
src/
├── components/
│   ├── layout/
│   ├── form/
│   ├── preview/
│   └── feedback/
├── composables/
├── constants/
├── router/
├── types/
├── utils/
├── views/
```

Additional folders are acceptable when they clearly improve project organization.

Every folder should have a well-defined responsibility.

---

# TypeScript

Prefer:

- `interface` for object models.
- `type` for union types.

Naming conventions:

- PascalCase for interfaces and types.
- camelCase for variables and properties.
- snake_case only inside template variable syntax.

Utility Types (`Pick`, `Omit`, `Partial`, `Required`, etc.) are valuable tools and should be used when they improve readability, reduce duplication, or better express intent.

When choosing between utility types and explicit type definitions, consider the team's familiarity and the long-term maintainability of the codebase.

Avoid deeply nested utility types or type compositions that obscure intent.

Avoid:

- `any`
- unnecessary type assertions
- overly complex generic compositions

---

# State Management

Choose the simplest solution that satisfies the current requirements.

For page-level or feature-local state, prefer:

- ref
- reactive
- computed

Introduce a shared state solution (e.g. Pinia) only when one or more of the following applies:

- State is shared across multiple pages.
- Multiple unrelated components require the same state.
- State synchronization becomes difficult using props or composables.
- Global application state (authentication, theme, user preferences, etc.) is required.

When introducing a global store, explain why local state or composables are no longer sufficient.

---

# Validation

Validation should be reusable and easy to maintain.

Prefer centralized validation logic.

Inline validation is acceptable only when tightly coupled to UI behavior and unlikely to be reused.

Prefer structured validation results instead of plain strings.

Examples:

- ValidationResult
- ValidationError[]

Channel-specific validation should remain extensible.

---

# Regular Expressions

Prefer multiple focused regular expressions over one extremely complex expression.

Separate responsibilities whenever possible.

Examples:

- Variable extraction
- Variable normalization
- Invalid syntax detection

A single regular expression is acceptable when it remains simple and readable.

### Template Variable Parsing

Template parsing should be resilient.

Specifically:

- Correctly parse supported template variables (e.g. `{{ customer_name }}`).
- Normalize valid variable syntax into a consistent format.
- Detect invalid syntax separately from unknown variables.
- Preserve unknown or invalid variables in the preview instead of breaking rendering.
- Ensure malformed template syntax cannot break the live preview experience.

---

# UI Guidelines

Use Ant Design Vue components whenever appropriate.

Responsive design should always be considered.

Desktop:

- Two-column layout

Mobile:

- Single-column layout

Header:

- Sticky
- Display page-level information only.

Primary actions should be placed close to the area they affect.

For example, a form submission button should remain inside the form rather than inside the page header.

---

# Testing

Prioritize testing business logic over UI implementation.

Typical candidates include:

- Validation
- Parser
- Formatter
- Utility functions

UI testing is optional unless interaction logic becomes sufficiently complex.

---

# Git

Use Conventional Commits.

Each commit should represent a single logical change.

Avoid mixing unrelated changes into one commit.

---

# Documentation

Documentation is part of the deliverable.

The README should explain:

- Architecture
- Technical decisions
- Validation strategy
- Requirement interpretation
- Trade-offs
- AI collaboration
- Future improvements

Focus on explaining **why** a solution was chosen, not only **how** it was implemented.

---

# Engineering Workflow

Follow this workflow whenever possible.

1. Requirement Analysis
2. Solution Design
3. Implementation
4. Validation
5. Documentation

Implement one logical task at a time.

---

# Implementation Strategy

Prefer an iterative workflow instead of implementing everything at once.

For medium or large tasks:

1. Understand requirements.
2. Identify ambiguities.
3. Propose an implementation plan.
4. Confirm the approach when necessary.
5. Implement one logical task at a time.
6. Review the implementation.
7. Update documentation if necessary.

---

# Architecture Decision Record (ADR)

When proposing significant architectural or implementation changes:

1. Describe the current situation.
2. Explain the problem being solved.
3. Present the proposed solution.
4. Compare alternative approaches when appropriate.
5. Explain the trade-offs.
6. Explain why the chosen solution best fits the current project scope.

---

# Communication

For significant architectural or structural changes:

- Explain the motivation before implementation.
- Explain trade-offs.
- Identify affected modules.
- Request confirmation before making architecture-level changes.

When requirements are unclear:

- Ask clarifying questions.
- If assumptions are necessary, document them explicitly.

---

# Scope Control

Only implement the requested task.

Avoid modifying unrelated modules unless:

- It fixes an existing bug.
- It is required to complete the requested task.
- It significantly improves maintainability without increasing unnecessary complexity.

If additional improvements are identified:

- Recommend them separately.
- Do not implement them automatically.

---

# Refactoring Principles

Refactoring should have a clear purpose.

Acceptable reasons include:

- Improve readability
- Improve maintainability
- Reduce duplication
- Simplify implementation
- Fix design inconsistencies

Avoid refactoring solely for personal preference.

Do not mix feature implementation with unrelated refactoring.

When refactoring affects multiple modules, explain the expected benefits before implementation.

---

# AI Collaboration

AI is an engineering assistant rather than an autonomous developer.

AI should assist with:

- Requirement analysis
- Architecture discussion
- Technical decision analysis
- TypeScript design
- Code review
- Edge case analysis
- Testing suggestions
- Documentation

Before writing code:

- Understand requirements.
- Review project conventions.
- Identify edge cases.
- Explain significant design decisions when appropriate.

Do not adopt AI-generated code blindly.

Engineering judgment always takes precedence over AI suggestions.

---

# Final Verification Checklist

Before considering any task complete, verify:

## Requirement

- Does the implementation satisfy the assignment requirements?
- Have all acceptance criteria been addressed?

## Architecture

- Is the architecture appropriate for the current project scope?
- Is there unnecessary abstraction or over-engineering?

## Readability

- Is the code easy to understand?
- Are naming conventions consistent?
- Is the implementation self-explanatory?

## Maintainability

- Are responsibilities clearly separated?
- Is duplicate logic minimized appropriately?
- Can future engineers modify this code easily?

## TypeScript

- Are types explicit where beneficial?
- Are utility types improving readability?
- Is `any` avoided unless justified?

## Testing

- Are important business rules covered?
- Have important edge cases been considered?

## Documentation

- Does the README reflect the implementation?
- Are significant engineering decisions documented?
- Are assumptions and trade-offs explained?

## Scope

- Were only the requested changes implemented?
- Have unrelated changes been avoided?

If improvements outside the current task are identified, recommend them separately instead of implementing them automatically.