import { spawn } from 'child_process'
import fs from 'fs-extra'
import globby from 'globby'
import os from 'os'
import path from 'path'

const tmpdir = fs.mkdtempSync(os.tmpdir())

const copyTestFile = (file) => {
  const tmpFile = path.join(tmpdir, path.basename(file))

  fs.copy(file, tmpFile)

  return tmpFile
}

const run = args =>
  new Promise((resolve) => {
    const bin = spawn('node', [path.join(__dirname, '../../bin/index.js')].concat(args), {
      stdio: 'pipe',
    })

    let error = ''
    let output = ''

    bin.stdout.on('data', (data) => {
      output += data.toString()
    })

    bin.stderr.on('data', (data) => {
      error += data.toString()
    })

    bin.on('close', code => resolve({ code, error, output }))
  })

describe('bin', () => {
  let args = []

  describe('no args', () => {
    test('prints the help page by default', async () => {
      const { code, error, output } = await run(args)

      expect(code).toBe(0)
      expect(error).toBe('')
      expect(output).not.toBe('')
      expect(output).toMatchSnapshot()
    })
  })

  describe('help', () => {
    beforeEach(() => {
      args = ['--help']
    })

    test('prints the help page', async () => {
      const { code, error, output } = await run(args)

      expect(code).toBe(0)
      expect(error).toBe('')
      expect(output).not.toBe('')
      expect(output).toMatchSnapshot()
    })
  })

  describe('diff', () => {
    beforeEach(() => {
      args = ['--diff']
    })

    test('prints the diff for a single file', async () => {
      const inputFile = path.join(__dirname, './fixtures/hard/invalid-indentation.actual.js')
      const { code, error, output } = await run([inputFile, ...args])

      expect(code).toBe(0)
      expect(error).toBe('')
      expect(output).not.toBe('')
      expect(output).toMatchSnapshot()
    })

    test('prints the diff for multiple files', async () => {
      const inputGlob = path.join(__dirname, './fixtures/**/*.actual.js')
      const { code, error, output } = await run(['--recursive', inputGlob, ...args])

      expect(code).toBe(0)
      expect(error).toBe('')
      expect(output).not.toBe('')
      expect(output).toMatchSnapshot()
    })
  })

  describe('write', () => {
    beforeEach(() => {
      args = []
    })

    afterEach(() => {
      fs.removeSync(tmpdir)
      fs.mkdirsSync(tmpdir)
    })

    test('formats a single file and prints to stdout', async () => {
      const inputFile = copyTestFile(path.join(__dirname, './fixtures/hard/invalid-indentation.actual.js'))
      const { code, error, output } = await run([inputFile, ...args])

      expect(code).toBe(0)
      expect(error).toBe('')
      expect(output).not.toBe('')
      expect(output).toMatchSnapshot()
    })

    test('formats a single file and overwrites it', async () => {
      const fixturePath = path.join(__dirname, './fixtures/hard/invalid-indentation.actual.js')
      const inputFile = copyTestFile(fixturePath)
      const { code, error, output } = await run([inputFile, inputFile, ...args])

      expect(code).toBe(0)
      expect(error).toBe('')
      expect(output).toBe('')
      expect(fs.readFileSync(fixturePath)).not.toEqual(fs.readFileSync(inputFile))
    })

    test("formats a single file and doesn't overwrite it if it's unchanged", async () => {
      const fixturePath = path.join(__dirname, './fixtures/real-world/Circle.actual.js')
      const inputFile = copyTestFile(fixturePath)
      const { code, error, output } = await run([inputFile, inputFile, ...args])
      const fixture = fs.readFileSync(fixturePath)

      expect(code).toBe(0)
      expect(error).toBe('')
      expect(output).toEqual(fixture.toString())
      expect(fixture).toEqual(fs.readFileSync(inputFile))
    })

    test('formats multiple files and overwrites them', async () => {
      const fixtureGlob = path.join(__dirname, './fixtures/hard/*.actual.js')
      const inputGlob = path.join((await globby([fixtureGlob])).map(copyTestFile).map(path.dirname)[0], '*.js')
      const { code, error, output } = await run(['--recursive', inputGlob, ...args])

      expect(code).toBe(0)
      expect(error).toBe('')
      expect(output).toMatch(/3 files are formatted\./)
    })
  })
})
