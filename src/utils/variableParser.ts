import { supportedVariables } from '../constants/variables'

import type { VariableKey } from '../types/variable'

const variableTokenPattern =
  /\{\{\s*([A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*)\s*\}\}/g
const variableNamePattern = /^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/

const supportedVariableByName: Map<
  string,
  (typeof supportedVariables)[number]
> = new Map(
  supportedVariables.map((variable) => [variable.variableName, variable]),
)

function formatVariable(variableName: string): string {
  return `{{ ${variableName} }}`
}

function isSupportedVariable(variableName: string): boolean {
  return supportedVariableByName.has(variableName)
}

function isValidVariableName(variableName: string): boolean {
  return variableNamePattern.test(variableName)
}

function getSupportedVariableKey(variableName: string): VariableKey | null {
  return supportedVariableByName.get(variableName)?.key ?? null
}

function getSupportedVariableMockValue(variableName: string): string | null {
  return supportedVariableByName.get(variableName)?.mockValue ?? null
}

function getVariableTokenMatches(
  content: string,
): RegExpStringIterator<RegExpExecArray> {
  return content.matchAll(variableTokenPattern)
}

export function extractVariables(content: string): VariableKey[] {
  const variableKeys = new Set<VariableKey>()

  for (const match of getVariableTokenMatches(content)) {
    const variableName = match[1]
    const variableKey = getSupportedVariableKey(variableName)

    if (variableKey) {
      variableKeys.add(variableKey)
    }
  }

  return [...variableKeys]
}

export function normalizeVariables(content: string): string {
  return content.replace(
    variableTokenPattern,
    (rawToken, variableName: string) => {
      if (!isSupportedVariable(variableName)) {
        return rawToken
      }

      return formatVariable(variableName)
    },
  )
}

export function replaceVariables(content: string): string {
  return content.replace(
    variableTokenPattern,
    (rawToken, variableName: string) => {
      return getSupportedVariableMockValue(variableName) ?? rawToken
    },
  )
}

export function findUnknownVariables(content: string): string[] {
  const unknownVariables = new Set<string>()

  for (const match of getVariableTokenMatches(content)) {
    const rawToken = match[0]
    const variableName = match[1]

    if (!isSupportedVariable(variableName)) {
      unknownVariables.add(rawToken)
    }
  }

  return [...unknownVariables]
}

export function hasInvalidVariableSyntax(content: string): boolean {
  let cursor = 0

  while (cursor < content.length) {
    const nextOpenTokenIndex = content.indexOf('{{', cursor)
    const nextCloseTokenIndex = content.indexOf('}}', cursor)

    if (
      nextCloseTokenIndex !== -1 &&
      (nextOpenTokenIndex === -1 || nextCloseTokenIndex < nextOpenTokenIndex)
    ) {
      return true
    }

    if (nextOpenTokenIndex === -1) {
      return false
    }

    const closeTokenIndex = content.indexOf('}}', nextOpenTokenIndex + 2)

    if (closeTokenIndex === -1) {
      return true
    }

    const variableName = content
      .slice(nextOpenTokenIndex + 2, closeTokenIndex)
      .trim()

    if (!isValidVariableName(variableName)) {
      return true
    }

    cursor = closeTokenIndex + 2
  }

  return false
}
