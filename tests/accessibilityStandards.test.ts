import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const appDirectoryUrl = new URL('../app/', import.meta.url)

const readProjectFile = async (projectPath: string): Promise<string> => {
  return readFile(new URL(`../${projectPath}`, import.meta.url), 'utf8')
}

const collectVueFiles = async (directoryUrl: URL): Promise<string[]> => {
  const entries = await readdir(directoryUrl, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const entryUrl = new URL(`${entry.name}${entry.isDirectory() === true ? '/' : ''}`, directoryUrl)

    if (entry.isDirectory() === true) {
      files.push(...await collectVueFiles(entryUrl))
      continue
    }

    if (entry.isFile() === true && entry.name.endsWith('.vue') === true) {
      files.push(fileURLToPath(entryUrl))
    }
  }

  return files
}

const getImageTags = (content: string): string[] => {
  return content.match(/<img\b[^>]*>/g) ?? []
}

const getPositiveTabIndexMatches = (content: string): string[] => {
  return content.match(/tabindex=["'](?:[1-9]|[1-9][0-9]+)["']/g) ?? []
}

const getTagName = (tagMatchText: string): string | null => {
  const tagMatch: RegExpMatchArray | null = tagMatchText.match(/^<([A-Za-z][\w-]*)/)

  if (tagMatch === null) {
    return null
  }

  const tagName: string | undefined = tagMatch[1]

  if (tagName === undefined) {
    return null
  }

  return tagName
}

const getNonNativeClickMatches = (content: string): string[] => {
  const clickMatches: RegExpMatchArray | null = content.match(/<([A-Za-z][\w-]*)\b[^>]*@click=/g)

  if (clickMatches === null) {
    return []
  }

  const allowedElements = new Set<string>(['button', 'a', 'NuxtLink'])

  return clickMatches.filter((match: string): boolean => {
    const tagName: string | null = getTagName(match)

    if (tagName === null) {
      return true
    }

    return allowedElements.has(tagName) === false
  })
}

test('documents the mandatory EAA 2025 accessibility gate', async () => {
  const agentsText: string = await readProjectFile('AGENTS.md')
  const codingStandardsText: string = await readProjectFile('memory-bank/standards/coding-standards.md')
  const accessibilityStandardText: string = await readProjectFile('memory-bank/standards/accessibility.md')
  const requiredText: string = [agentsText, codingStandardsText, accessibilityStandardText].join('\n')

  assert.match(requiredText, /EAA 2025/)
  assert.match(requiredText, /EN 301 549/)
  assert.match(requiredText, /WCAG 2\.1 Level AA/)
  assert.match(requiredText, /WCAG 2\.2 Level AA/)
  assert.match(requiredText, /npm run test:accessibility/)
})

test('all Vue image elements expose alt text', async () => {
  const vueFiles: string[] = await collectVueFiles(appDirectoryUrl)
  const failures: string[] = []

  for (const filePath of vueFiles) {
    const content: string = await readFile(filePath, 'utf8')
    const imageTags: string[] = getImageTags(content)

    for (const imageTag of imageTags) {
      if (/\s(:alt|alt)=/.test(imageTag) === false) {
        failures.push(`${filePath}: ${imageTag}`)
      }
    }
  }

  assert.deepEqual(failures, [])
})

test('Vue templates do not use positive tabindex values', async () => {
  const vueFiles: string[] = await collectVueFiles(appDirectoryUrl)
  const failures: string[] = []

  for (const filePath of vueFiles) {
    const content: string = await readFile(filePath, 'utf8')
    const matches: string[] = getPositiveTabIndexMatches(content)

    if (matches.length > 0) {
      failures.push(`${filePath}: ${matches.join(', ')}`)
    }
  }

  assert.deepEqual(failures, [])
})

test('click handlers stay on native interactive elements', async () => {
  const vueFiles: string[] = await collectVueFiles(appDirectoryUrl)
  const failures: string[] = []

  for (const filePath of vueFiles) {
    const content: string = await readFile(filePath, 'utf8')
    const matches: string[] = getNonNativeClickMatches(content)

    if (matches.length > 0) {
      failures.push(`${filePath}: ${matches.join(', ')}`)
    }
  }

  assert.deepEqual(failures, [])
})
