'use client'

import { AlertOctagon, CheckCircle, Layers3 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Job } from '@alq/validators'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function ExplorerStats({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState(initialJobs)

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/jobs', {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.jobs)
        })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const failedJobs = useMemo(
    () => jobs.filter((j) => j.status === 'failed'),
    [jobs],
  )
  const queuedJobs = useMemo(
    () => jobs.filter((j) => j.status === 'queued'),
    [jobs],
  )
  const completedJobs = useMemo(
    () => jobs.filter((j) => j.status === 'done'),
    [jobs],
  )

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-lg">Queued Jobs</CardTitle>
          <Layers3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">{queuedJobs.length}</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-lg">Failed Jobs</CardTitle>
          <AlertOctagon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">{failedJobs.length}</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-lg">Completed Jobs</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">{completedJobs.length}</span>
        </CardContent>
      </Card>
    </div>
  )
}
