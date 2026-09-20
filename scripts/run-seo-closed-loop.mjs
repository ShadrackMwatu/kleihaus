import { mkdir, writeFile } from 'node:fs/promises'
import { buildClosedLoopSnapshot } from './seo-closed-loop.mjs'

const generatedAt = new Date().toISOString()
const snapshot = buildClosedLoopSnapshot({ generatedAt })
const output = process.argv.find((arg) => arg.startsWith('--output='))?.split('=').slice(1).join('=') || 'reports/seo-commercial/closed-loop.json'
await mkdir(output.split('/').slice(0, -1).join('/') || '.', { recursive: true })
await writeFile(output, JSON.stringify(snapshot, null, 2) + '\n')
console.log(`Closed-loop SEO snapshot: ${snapshot.classification}`)
for (const [name, state] of Object.entries(snapshot.readiness)) {
  console.log(`- ${name}: ${state.active ? 'active' : `inactive (missing: ${state.missing.join(', ')})`}`)
}
