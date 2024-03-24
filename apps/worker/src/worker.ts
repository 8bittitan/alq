const WORKER_TIMEOUT = 30_000

async function work() {
  console.log('Worker is running')
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, WORKER_TIMEOUT))
    console.log('Worker is working')
  }
}

process.on('SIGINT', () => {
  process.exit()
})

work()
