import { createPatch } from 'diff'
import chalk from 'chalk'
import fs from 'fs'
import globby from 'globby'
import minimist from 'minimist'
import path from 'path'
import pkg from '../package.json'
import format from '../lib/'

/* eslint-disable no-console */

const argv = minimist(process.argv.slice(2), {
  boolean: ['help', 'version'],
  alias: {
    b: 'config-basedir',
    c: 'config',
    d: 'diff',
    h: 'help',
    i: 'ignore-path',
    r: 'recursive',
    v: 'version',
  },
})

if (argv.v) {
  console.log(pkg.version)
  process.exit()
}

function printHelp() {
  console.log('Usage: styled-components-stylefmt [options] input-name [output-name]')
  console.log('')
  console.log('Options:')
  console.log('')
  console.log('  -b, --config-basedir   Path to the directory that relative paths defining "extends"')
  console.log('  -c, --config           Path to a specific configuration file (JSON, YAML, or CommonJS)')
  console.log('  -d, --diff             Output diff against original file')
  console.log('  -r, --recursive        Format list of space seperated files(globs) in place')
  console.log('  -v, --version          Output the version number')
  console.log('  -h, --help             Output usage information')
  console.log('  -i, --ignore-path      Path to a file containing patterns that describe files to ignore.')
  process.exit()
}

if (argv.h) {
  printHelp()
}

const options = {}
if (argv.c) {
  options.configFile = argv.c
}

if (argv.b) {
  options.configBasedir = path.isAbsolute(argv.b) ? argv.b : path.resolve(process.cwd(), argv.b)
}

if (argv.i) {
  options.ignorePath = argv.i
}

function handleDiff(file, original, formatted) {
  let diff

  if (original === formatted) {
    diff = 'There is no difference with the original file.'
  }

  if (chalk.supportsColor) {
    if (diff) {
      diff = chalk.gray(diff)
    } else {
      diff = createPatch(file, original, formatted)
      diff = diff.split('\n').splice(4).map((diffLine) => {
        let line = diffLine
        if (diffLine[0] === '+') {
          line = chalk.green(diffLine)
        } else if (line[0] === '-') {
          line = chalk.red(diffLine)
        } else if (diffLine.match(/^@@\s+.+?\s+@@/) || diffLine === '\\ No newline at end of file') {
          line = ''
        }

        return chalk.gray(line)
      })
      diff = diff.join('\n').trim()
    }
  } else if (!diff) {
    diff = formatted
  }

  return `${file}\n${diff}`
}

function processMultipleFiles(files) {
  if (!files.length) {
    console.error('Files glob patterns specified did not match any js files.')
    return
  }

  Promise.all(
    files.map((file) => {
      const fullPath = path.resolve(process.cwd(), file)
      const input = fs.readFileSync(fullPath, 'utf-8')

      const formatted = format(fullPath, options)

      if (argv.d) {
        return handleDiff(fullPath, input, formatted)
      } else if (input !== formatted) {
        fs.writeFileSync(fullPath, formatted)
      }

      return file
    }),
  ).then((messages) => {
    if (argv.d) {
      console.log(messages.join('\n\n'))
    } else {
      let formatted = messages.filter(file => file)
      if (formatted.length) {
        formatted = `${formatted.join(', ')}\n\n${formatted.length}`
      } else {
        formatted = 'No'
      }
      console.log(`${formatted} files are formatted.`)
    }
  })
}

if (argv.r) {
  globby([path.join(argv.r)].concat(argv._)).then(processMultipleFiles)
} else if (argv._[0]) {
  const inputPath = argv._[0]
  const outputPath = argv._[1]
  const fullPath = path.resolve(process.cwd(), inputPath)
  const input = fs.readFileSync(fullPath, 'utf-8')

  const formatted = format(fullPath, options)

  if (argv.d) {
    console.log(handleDiff(fullPath, input, formatted))
  } else if (outputPath && input !== formatted) {
    fs.writeFileSync(outputPath, formatted)
  } else {
    process.stdout.write(formatted)
  }
} else {
  printHelp()
}
