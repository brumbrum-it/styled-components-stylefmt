import fs from 'fs'
import path from 'path'
import format from '..'

const getFixture = (type, file) => ({
  actual: format(path.join(__dirname, 'fixtures', type, `${file}.actual.js`)),
  expected: fs.readFileSync(path.join(__dirname, 'fixtures', type, `${file}.expected.js`)).toString(),
})

describe('styled-components-stylefmt', () => {
  let type

  describe('hard', () => {
    beforeEach((done) => {
      type = 'hard'
      done()
    })

    test('indentation', () => {
      const { actual, expected } = getFixture(type, 'indentation')
      expect(actual).toEqual(expected)
    })

    test('invalid-indentation', () => {
      const { actual, expected } = getFixture(type, 'invalid-indentation')
      expect(actual).toEqual(expected)
    })

    test('source-maps', () => {
      const { actual, expected } = getFixture(type, 'source-maps')
      expect(actual).toEqual(expected)
    })
  })

  describe('interpolations', () => {
    beforeEach((done) => {
      type = 'interpolations'
      done()
    })

    test('complex', () => {
      const { actual, expected } = getFixture(type, 'complex')
      expect(actual).toEqual(expected)
    })

    test('invalid', () => {
      const { actual, expected } = getFixture(type, 'invalid')
      expect(actual).toEqual(expected)
    })

    test('valid', () => {
      const { actual, expected } = getFixture(type, 'valid')
      expect(actual).toEqual(expected)
    })
  })

  describe('real-world', () => {
    beforeEach((done) => {
      type = 'real-world'
      done()
    })

    test('Circle', () => {
      const { actual, expected } = getFixture(type, 'Circle')
      expect(actual).toEqual(expected)
    })
  })

  describe('simple', () => {
    beforeEach((done) => {
      type = 'simple'
      done()
    })

    test('global', () => {
      const { actual, expected } = getFixture(type, 'global')
      expect(actual).toEqual(expected)
    })

    test('helpers', () => {
      const { actual, expected } = getFixture(type, 'helpers')
      expect(actual).toEqual(expected)
    })

    test('`imports`', () => {
      const { actual, expected } = getFixture(type, 'imports')
      expect(actual).toEqual(expected)
    })

    test('`invalid`', () => {
      const { actual, expected } = getFixture(type, 'invalid')
      expect(actual).toEqual(expected)
    })

    test('`nesting`', () => {
      const { actual, expected } = getFixture(type, 'nesting')
      expect(actual).toEqual(expected)
    })

    test('`valid`', () => {
      const { actual, expected } = getFixture(type, 'valid')
      expect(actual).toEqual(expected)
    })
  })
})
