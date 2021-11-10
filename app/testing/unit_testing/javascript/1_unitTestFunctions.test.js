const { sum, returnObject } = require('./functions.js')

/*
.toBe
.toMatch
.toMatchObject
.toHaveLength
.toEqual
.toContain
**/

describe('Example unit test suite', () => {
  beforeAll(() => {
    testObject = {
      shouldMatch: true,
      TDDIsBest: true,
      losingIsAnOption: false
    }
    return testObject
  })

  afterAll(() => {
    return 0
  })

  test('Test adding 1 + 2, expecting 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('Test sum Error, expecting TypeError', () => {
    expect(() => sum(1001, 2)).toThrow(TypeError)
    expect(() => sum(1001, 2)).toThrow('Invalid input')
  })

  test('Test matching object', () => {
    const object = returnObject()
    expect(object).toMatchObject(testObject)
  })
})
