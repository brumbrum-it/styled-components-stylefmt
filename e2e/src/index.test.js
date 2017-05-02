import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

const run = () =>
  new Promise((resolve) => {
    const bin = spawn('yarn', ['format'], {
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

describe('E2E', () => {
  test('the CLI works', async () => {
    const { code, error, output } = await run()

    expect(code).toBe(0)
    expect(error).toBe('')
    expect(output).not.toBe('')

    const expected = fs.readFileSync(path.join(__dirname, 'index.expected.js'))
    const formatted = fs.readFileSync(path.join(__dirname, 'index.formatted.js'))

    expect(formatted).toEqual(expected)
  })
})
