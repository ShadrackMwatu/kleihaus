import { mkdirSync, writeFileSync, statSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ffmpeg = process.env.FFMPEG_BIN || 'ffmpeg'
const font = process.env.VIDEO_FONT || 'C:/Windows/Fonts/segoeui.ttf'
if (!existsSync(font)) throw new Error('Set VIDEO_FONT to an installed TrueType font.')
const fontFilter = font.replaceAll('\\', '/').replace(':', '\\:')
const outputs = path.join(root, 'video/exports')
const work = path.join(root, 'video/.render')
mkdirSync(outputs, { recursive: true })
mkdirSync(work, { recursive: true })

// Descriptions are editorial labels for supplied images, not product specifications.
const scenes = [
  ['tiles-floor.jpg', 'Floor finishes'],
  ['tiles-wall.jpg', 'Wall finishes'],
  ['sanitaryware/sanitaryware-shower-display-02.jpg', 'Bathroom details'],
  ['sanitaryware/sanitaryware-kitchen-sink-backsplash-01.jpg', 'Kitchen sinks'],
  ['paint-interior.jpg', 'Interior colour'],
  ['adhesive.jpg', 'Finishing essentials'],
  ['grout.jpg', 'Grout and joints'],
  ['tile-tools.jpg', 'Tools and accessories'],
  ['projects/project-kitchen-overview-01.jpg', 'Kitchen project reference'],
  ['projects/project-kitchen-tile-backsplash-01.jpg', 'Tile details'],
]
const versions = [
  { name: 'kleihaus-15s-social', width: 1080, height: 1920, duration: 15, selected: [0, 2, 3, 4, 5] },
  { name: 'kleihaus-30s-social', width: 1080, height: 1920, duration: 30, selected: [0, 1, 2, 3, 4, 5, 8, 9] },
  { name: 'kleihaus-60s-brand', width: 1920, height: 1080, duration: 60, selected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
]
function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-nostdin', ...args], { cwd: work, encoding: 'utf8' })
  if (result.error || result.status !== 0) throw new Error(result.error?.message || result.stderr)
}
const report = []
for (const version of versions) {
  const { name, width, height, duration, selected } = version
  const sequence = selected.map((index) => scenes[index]).concat([['kleihaus-logo.jpg', 'Plan your next finish']])
  const totalFrames = duration * 30
  const baseFrames = Math.floor(totalFrames / sequence.length)
  const segments = []
  for (let index = 0; index < sequence.length; index++) {
    const [file, label] = sequence[index]
    const source = path.join(root, 'public/images', file)
    if (!existsSync(source)) throw new Error(`Missing source: ${file}`)
    const closing = index === sequence.length - 1
    const frames = index === sequence.length - 1 ? totalFrames - baseFrames * index : baseFrames
    const seconds = frames / 30
    const portrait = height > width
    const imageHeight = portrait ? 1120 : 760
    const imageWidth = closing ? 320 : width - 96
    const scaleHeight = closing ? 320 : imageHeight
    const top = portrait ? 220 : 60
    const fontSize = portrait ? 50 : 44
    const labelY = portrait ? 1420 : 860
    const footerY = portrait ? 1700 : 1000
    const filter = [
      `scale=${imageWidth}:${scaleHeight}:force_original_aspect_ratio=decrease`,
      `pad=${width}:${height}:(ow-iw)/2:${top}+((${imageHeight}-ih)/2):color=white`,
      'setsar=1',
      `drawtext=fontfile='${fontFilter}':text='KLEIHAUS CERAMICS':fontsize=${fontSize * 0.6}:fontcolor=0x15803D:x=(w-tw)/2:y=40`,
      `drawtext=fontfile='${fontFilter}':text='${label}':fontsize=${fontSize}:fontcolor=0x171717:x=(w-tw)/2:y=${labelY}`,
      `drawtext=fontfile='${fontFilter}':text='Tiles. Sanitaryware. Paints.':fontsize=${fontSize * 0.6}:fontcolor=0x454545:x=(w-tw)/2:y=${labelY + 80}`,
      `drawtext=fontfile='${fontFilter}':text='${closing ? 'Explore kleihaus.com' : 'Kleihaus | Inspiring living'}':fontsize=${fontSize * 0.65}:fontcolor=0x15803D:x=(w-tw)/2:y=${footerY}`,
      `fade=t=in:st=0:d=0.18:color=white`,
      `fade=t=out:st=${Math.max(0, seconds - 0.18)}:d=0.18:color=white`,
      'format=yuv420p',
    ].join(',')
    const segment = `${name}-${index}.mp4`
    run(['-y', '-loop', '1', '-framerate', '30', '-i', source, '-vf', filter, '-frames:v', String(frames), '-an', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', '-threads', '2', segment])
    segments.push(segment)
    console.log(`${name}: scene ${index + 1}/${sequence.length}`)
  }
  const list = `${name}.txt`
  writeFileSync(path.join(work, list), segments.map((file) => `file '${file}'`).join('\n'))
  const output = path.join(outputs, `${name}.mp4`)
  run(['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', output])
  run(['-i', output, '-f', 'null', '-'])
  run(['-y', '-ss', '1', '-i', output, '-frames:v', '1', path.join(outputs, `${name}-poster.jpg`)])
  report.push({ file: output, width, height, durationSeconds: duration, frames: totalFrames, bytes: statSync(output).size, audio: 'silent review draft', decode: 'passed' })
}
writeFileSync(path.join(outputs, 'render-report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
