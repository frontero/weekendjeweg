import { readFile } from 'node:fs/promises'

const requiredScore = 0.9
const requiredCategories = ['performance', 'accessibility', 'seo']

const getScore = (report, category) => {
  const score = report?.categories?.[category]?.score

  if (typeof score !== 'number') {
    throw new Error(`Missing Lighthouse category score: ${category}`)
  }

  return score
}

const checkReport = async (filePath) => {
  const rawReport = await readFile(filePath, 'utf8')
  const report = JSON.parse(rawReport)
  const finalUrl = report.finalDisplayedUrl ?? report.finalUrl ?? filePath
  const failures = []

  requiredCategories.forEach((category) => {
    const score = getScore(report, category)
    const percentage = Math.round(score * 100)

    console.log(`${finalUrl} ${category}: ${percentage}`)

    if (score < requiredScore) {
      failures.push(`${category} scored ${percentage}`)
    }
  })

  if (failures.length > 0) {
    throw new Error(`${filePath} failed Lighthouse target: ${failures.join(', ')}`)
  }
}

if (process.argv.length < 3) {
  throw new Error('Expected at least one Lighthouse JSON report path')
}

for (const filePath of process.argv.slice(2)) {
  await checkReport(filePath)
}
