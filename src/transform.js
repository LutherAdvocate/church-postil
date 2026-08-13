import fs from 'fs'
import path from 'path'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })

// Using async/await to store the input in a variable
const folders = await rl.question('Foldernames? (including numbers ex. da/91.advent): ')

// 1. SET YOUR FOLDER HERE
const folderPath = path.join(process.cwd(), `content/${folders}`)

console.log(`Adding id in all headers in this .md files in ${folders}:`)

rl.close()

if (!fs.existsSync(folderPath)) {
  console.error(`❌ Error: The folder was not found at ${folderPath}`)
  process.exit(1) // Stop the script early
}

function transformFiles(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)

    // Only process Markdown files
    if (path.extname(file) === '.md') {
      let content = fs.readFileSync(filePath, 'utf8')
      let hCount = 1 // Reset counter for each file

      // 2. THE REGEX LOGIC
      // It looks for: Line start + (some #s) + (space) + (the title text)
      // $1 = The hashes (###), $2 = The title text
      const newContent = content.replace(/^(#{2,6})\s+(.+)$/gm, (match, hashes, title) => {
        // Skip if it's already transformed
        if (title.startsWith('[') && title.includes(']{#')) return match

        const id = `h${hashes.length}${hCount}`
        hCount++

        // Returns the new MDC format: ### [Title]{#h31}
        return `${hashes} [${title.trim()}]{#${id}}`
      })

      // 3. SAVE THE FILE
      fs.writeFileSync(filePath, newContent, 'utf8')
      console.log(`✅ Transformed: ${file}`)
    }
  })
}

transformFiles(folderPath)
