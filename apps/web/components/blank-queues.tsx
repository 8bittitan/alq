'use client'

import CodeExamples from '~/components/code-examples'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

export default function BlankQueues() {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">You have no queues</h3>
      <p className="text-sm text-muted-foreground">
        Once you enquea queue, you will start seeing data here.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Send request</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Example Request</DialogTitle>
            <DialogDescription>
              This is just an example of how to make a request
            </DialogDescription>
          </DialogHeader>
          <CodeExamples />
        </DialogContent>
      </Dialog>
    </div>
  )
}
