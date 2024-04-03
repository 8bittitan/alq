'use client'

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'
import { BuiltinLanguage } from 'shiki'

export type Example = {
  code: string
  language: BuiltinLanguage
  copyString: string
}

export type CodeExampleProviderProps = {
  examples: Example[]
}

type ProviderValue = {
  examples: Example[]
  selectedCodeExample: Example
  setLanguage: (language: BuiltinLanguage) => void
}

const CodeProviderContext = createContext<ProviderValue | null>(null)

export function CodeExampleProvider({
  children,
  examples,
}: PropsWithChildren<CodeExampleProviderProps>) {
  const [language, setLanguage] = useState<BuiltinLanguage>('javascript')

  const selectedCodeExample = useMemo(
    () => examples.find((l) => l.language === language) ?? examples[0],
    [language, examples],
  )

  return (
    <CodeProviderContext.Provider
      value={{
        examples,
        selectedCodeExample,
        setLanguage,
      }}
    >
      {children}
    </CodeProviderContext.Provider>
  )
}

export function useCodeExamples() {
  const codeExampleCtx = useContext(CodeProviderContext)

  if (!codeExampleCtx)
    throw new Error('CodeProviderContext not used within CodeExampleProvider')

  return codeExampleCtx
}
