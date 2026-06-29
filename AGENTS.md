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

## Maintainability

Design code with future maintenance in mind.

Introduce abstractions only when they clearly improve maintainability, reduce duplication, or increase reusability.

Avoid unnecessary complexity.

## Consistency

Follow existing project conventions whenever possible.

Prefer consistency over personal preference.

If introducing a different implementation style, explain the reasoning.

## Product Thinking

Engineering decisions should consider both technical implementation and user experience.

When requirements are ambiguous, incomplete, or conflicting:

1. Identify the ambiguity.
2. Explain the chosen interpretation.
3. Document important assumptions.
4. Choose the solution with the best engineering and product trade-offs.

Do not implement specifications mechanically.

## Team-Oriented Design

Engineering decisions should consider not only technical correctness, but also the people maintaining the code.

When multiple implementations are equally valid, prefer the one that best matches the team's experience and improves long-term maintainability.

Code should be approachable by future contributors, not only its original author.

---

# Decision Making

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

---

# Vue Guidelines

Prefer:

- Vue 3
- Composition API
- `<script setup>`

Extract business logic only when it improves readability, maintainability, or reusability.

---

# Coding Conventions

## Naming

- Components: PascalCase
- Composables: useXxx
- Utilities: camelCase
- Interfaces / Types: PascalCase
- Variables / Functions: camelCase
- Use snake_case only inside template variables such as `{{ customer_name }}`.

## Imports

Use `@` as the alias for the `src` directory.

Prefer alias imports over long relative paths.

Use relative imports only for nearby files when they improve readability.

Use `import type` for TypeScript-only imports whenever appropriate.

Group imports in the following order:

1. Vue
2. Third-party libraries
3. Project aliases (`@/...`)
4. Relative imports
5. Type imports

Separate each group with one blank line.

Avoid introducing barrel exports (`index.ts`) unless they clearly improve module organization.

---

# Component Design

A component should have a clear responsibility.

Typical responsibilities include:

- Layout
- Form
- Preview
- Feedback

Split components when it improves readability or reuse.

---

# Composable Design

Use a composable when:

- Logic depends on Vue reactivity.
- Logic is reused.
- Lifecycle hooks are required.
- Multiple reactive states need coordination.

Do not extract a composable solely to reduce component size.

Use `utils` for pure TypeScript functions.

---

# Utils Design

Prefer pure TypeScript functions for:

- parser
- formatter
- validator
- helper functions

They should have:

- no Vue dependency
- no lifecycle dependency
- independent testability

---

# Folder Structure

Prefer:

src/

- components/
  - layout/
  - form/
  - preview/
  - feedback/
- composables/
- constants/
- router/
- types/
- utils/
- views/

Additional folders are acceptable when they improve organization.

---

# TypeScript

Prefer:

- interface for object models
- type for union types

Utility Types (`Pick`, `Omit`, `Partial`, `Required`, etc.) are valuable tools.

Use them when they improve readability or better express intent.

When choosing between utility types and explicit type definitions, consider the team's familiarity and long-term maintainability.

Avoid deeply nested utility types that obscure intent.

Avoid:

- any
- unnecessary type assertions
- overly complex generic compositions

---

# State Management

Choose the simplest solution that satisfies the current requirements.

Prefer:

- ref
- reactive
- computed

Introduce Pinia or another global store only when:

- state is shared across multiple pages
- multiple unrelated components require shared state
- synchronization becomes difficult using local state
- global application state is required

Explain why local state or composables are insufficient before introducing a global store.

---

# Validation

Prefer centralized validation logic.

Return structured validation results.

Channel-specific validation should remain extensible.

---

# Regular Expressions

Prefer multiple focused regular expressions over one complex expression.

Template parsing should:

- correctly parse supported variables (`{{ customer_name }}`)
- normalize valid syntax
- detect invalid syntax separately from unknown variables
- preserve unknown or invalid variables in preview
- ensure malformed syntax never breaks live preview

---

# UI Guidelines

Use Ant Design Vue where appropriate.

Desktop:

- Two-column layout

Mobile:

- Single-column layout

Header:

- Sticky
- Page-level information only

Primary actions should be placed near the area they affect.

---

# Testing

Prioritize business logic.

Focus on:

- Validation
- Parser
- Formatter
- Utility functions

---

# Git

Use Conventional Commits.

One logical change per commit.

---

# Documentation

README should explain:

- Architecture
- Technical decisions
- Validation strategy
- Requirement interpretation
- Trade-offs
- AI collaboration
- Future improvements

Explain why decisions were made.

---

# Engineering Workflow

1. Requirement Analysis
2. Solution Design
3. Implementation
4. Validation
5. Documentation

Implement one logical task at a time.

---

# Implementation Strategy

1. Understand requirements.
2. Identify ambiguities.
3. Propose an implementation plan.
4. Confirm when necessary.
5. Implement one logical task.
6. Review.
7. Update documentation if needed.

---

# Architecture Decision Record (ADR)

For significant architectural changes:

1. Describe the current situation.
2. Explain the problem.
3. Present the proposed solution.
4. Compare alternatives.
5. Explain trade-offs.
6. Explain why the chosen solution fits the current scope.

---

# Communication

For significant architectural changes:

- Explain motivation.
- Explain trade-offs.
- Identify affected modules.
- Request confirmation before broad changes.

When requirements are unclear:

- Ask clarifying questions.
- Document assumptions.

---

# Scope Control

Implement only the requested task.

Do not modify unrelated modules unless required.

Recommend additional improvements separately.

---

# Refactoring Principles

Refactor only to:

- Improve readability
- Improve maintainability
- Reduce duplication
- Simplify implementation
- Fix design inconsistencies

Do not mix unrelated refactoring with feature work.

---

# AI Collaboration

AI is an engineering assistant.

Before writing code:

- Understand requirements.
- Review project conventions.
- Identify edge cases.
- Explain significant design decisions.

Engineering judgment always takes precedence over AI suggestions.

---

# Final Verification Checklist

Verify:

- Assignment requirements satisfied
- Architecture appropriate
- Readability
- Maintainability
- Type safety
- Tests
- Documentation
- Scope control

Recommend additional improvements separately instead of implementing them automatically.
