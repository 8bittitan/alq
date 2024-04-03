import { ChevronDown, Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Example, useCodeExamples } from '~/components/code-provider'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

type CodeExampleProps = {
  example: Example
}

export default function CodeExamples() {
  const { selectedCodeExample, setLanguage, examples } = useCodeExamples()

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 self-start mb-2"
          >
            <span>{selectedCodeExample.language}</span>
            <ChevronDown className="h4- w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-56" align="start">
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
      <Code example={selectedCodeExample} />
    </div>
  )
}

function Code({ example }: CodeExampleProps) {
  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(example.copyString)

    toast.success('Code example copied to clipboard')
  }

  return (
    <div className="relative">
      <Button
        size="icon"
        variant="outline"
        className="absolute top-4 right-4"
        onClick={handleCopyCode}
      >
        <Copy className="h-4 w-4" />
      </Button>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: example.code }}
      />
    </div>
  )
}
