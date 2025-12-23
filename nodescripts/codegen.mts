import {execFileSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {config} from '../codegen.config.mts'

export type CodeGenConfig = CodeGenConfigItem[]

export type CodeGenConfigItem = {
  imports: ImportConfig[]
  inputDir: string
  match: string
  output: string
}

type ImportConfig = {
  exportName?: string
  /**
   * 'import' can be:
   * - 'default' for default import
   * - 'namespace' for namespace import
   * - string for named import
   */
  // eslint-disable-next-line sonarjs/no-useless-intersection, @typescript-eslint/ban-types
  import: 'default' | 'namespace' | (string & {})
  optional?: boolean
  /**
   * 'spread' can be:
   * - 'array' to spread into an array
   * - 'object' to spread into an object
   * - false to not spread and just export as an array
   */
  spread?: 'array' | 'object' | false
}

const sortImportNames = (
  {import: a}: ImportConfig,
  {import: b}: ImportConfig,
) => {
  if (a === b) {
    return 0
  }

  if (a === 'default') {
    return -1
  }

  if (b === 'default') {
    return 1
  }

  if (a === 'namespace') {
    return -1
  }

  if (b === 'namespace') {
    return 1
  }

  return a.localeCompare(b)
}

const buildImport = (
  index: number,
  importPath: string,
  importConfig: ImportConfig[],
) => {
  const sortedImports = importConfig.sort(sortImportNames)

  let defaultImport = ''
  let namespaceImport = ''
  const namedImports: string[] = []

  sortedImports.forEach(({import: importType, exportName}) => {
    const varName = `${exportName}${index}`

    if (importType === 'default') {
      defaultImport = varName
    } else if (importType === 'namespace') {
      namespaceImport = `* as ${varName}`
    } else {
      namedImports.push(`${importType} as ${varName}`)
    }
  })

  const importParts: string[] = []

  if (defaultImport) {
    importParts.push(defaultImport)
  }

  if (namespaceImport) {
    importParts.push(namespaceImport)
  }

  const named = namedImports.length ? `{ ${namedImports.join(', ')} }` : ''

  if (named) {
    importParts.push(named)
  }

  return `import ${importParts.join(', ')} from '${importPath}';`
}

const toImportPath = (from: string, to: string) => {
  let rel = path.relative(from, to).replaceAll('\\', '/')

  if (!rel.startsWith('.')) {
    rel = './' + rel
  }

  return rel.replace(/\.ts$/, '')
}

const generate = ({inputDir, match, output, imports}: CodeGenConfigItem) => {
  const base = path.resolve(inputDir)
  const outputPath = path.resolve(output)
  const outputDir = path.dirname(outputPath)
  const entries = fs
    .readdirSync(base, {withFileTypes: true})
    .filter(d => d.isDirectory())
    .filter(d => fs.existsSync(path.join(base, d.name, match)))

  const entriesWithImports = entries
    .map(d => {
      // For each import, check if the file exports the symbol (or has a default/namespace export)
      const absTarget = path.join(base, d.name, match)
      const availableImports = imports.filter(imp => {
        if (!imp.optional) {
          return true
        }

        if (imp.import === 'namespace') {
          // For default/namespace, just check if file exists
          return fs.existsSync(absTarget)
        }

        // For named exports, check if the file contains the export
        if (!fs.existsSync(absTarget)) {
          return false
        }

        const fileContent = fs.readFileSync(absTarget, 'utf8')
        // Simple regex to check for export (not perfect, but works for most cases)
        const re = new RegExp(
          imp.import === 'default'
            ? String.raw`export\s+default\s+`
            : String.raw`export\s+(const|let|var|function|class|type|interface|enum)\s+${imp.import}\b`,
        )

        return re.test(fileContent)
      })

      return {dir: d, availableImports}
    })
    .filter(entry => entry.availableImports.length > 0)

  const importsEntries = entriesWithImports.map(
    ({dir, availableImports}, i) => {
      const absTarget = path.join(base, dir.name, match)
      const importPath = toImportPath(outputDir, absTarget)

      return buildImport(i, importPath, availableImports)
    },
  )

  const outputData = `${importsEntries.join('\n')}${imports
    .map(({exportName, spread}) => {
      // Only include items that are present in entriesWithImports
      const list = entriesWithImports.map((_, i) => `${exportName}${i}`)

      if (spread) {
        return `

export const ${exportName} = ${spread === 'array' ? '[' : '{'}
${list.map(item => `...${item}`).join(', \n')}
${spread === 'array' ? ']' : '}'};`
      }

      return `

export const ${exportName} = [
  ${list.join(',\n  ')}
];
`
    })
    .join('\n')}`

  fs.mkdirSync(outputDir, {recursive: true})
  fs.writeFileSync(output, outputData)
}

const run = (cmd: string, args: string[]) => {
  execFileSync(cmd, args, {
    stdio: 'inherit',
    cwd: process.cwd(),
  })
}

const lintAll = () => {
  run('npx', ['eslint', '--fix', ...config.map(({output}) => output)])
}
const formatAll = () => {
  run('npx', ['prettier', '--write', ...config.map(({output}) => output)])
}

export const runCodeGen = () => {
  console.log('Running code generation...')
  config.forEach(generate)
  lintAll()
  formatAll()
  console.log('Finished code generation.')
}

runCodeGen()
