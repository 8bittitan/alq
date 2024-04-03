import { ChevronDown } from 'lucide-react'

import { useCodeExamples } from '~/components/code-provider'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

type Props = {
  example: string
}

export default function CodeExamples() {
  const { selectedCodeExample, setLanguage, examples } = useCodeExamples()

  return (
    <div className="flex flex-col space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 self-start"
          >
            <span>{selectedCodeExample.language}</span>
            <ChevronDown className="h4- w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-56">
          {examples.map((example) => (
            <DropdownMenuItem
              key={example.language}
              onClick={() => setLanguage(example.language)}
            >
              {example.language}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Code example={selectedCodeExample.code} />
    </div>
  )
}

function Code({ example }: Props) {
  return (
    <div
      className="prose grid gap-4 py-4"
      dangerouslySetInnerHTML={{ __html: example }}
    />
  )
}
