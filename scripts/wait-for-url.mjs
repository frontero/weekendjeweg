const targetUrl = process.argv[2]
const maxAttempts = 24
const delayMs = 5000

if (typeof targetUrl !== 'string' || targetUrl.length === 0) {
  throw new Error('Expected URL argument')
}

const wait = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, delayMs)
  })
}

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  try {
    const response = await fetch(targetUrl)

    if (response.ok === true) {
      console.log(`URL is ready: ${targetUrl}`)
      process.exit(0)
    }

    console.log(`Attempt ${attempt}: ${response.status}`)
  } catch (error) {
    console.log(`Attempt ${attempt}: waiting for ${targetUrl}`)
  }

  await wait()
}

throw new Error(`Timed out waiting for ${targetUrl}`)
