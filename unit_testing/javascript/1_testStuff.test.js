const { sum, returnObject, getPatient } = require('./functions.js');

/*
.toBe
.toMatch
.toMatchObject
.toHaveLength
.toEqual
.toContain
**/

describe('Testing functions in sum.js', () => {

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
    expect(sum(1, 2)).toBe(3);
  });

  test("Test sum Error, expecting TypeError", () => {
    expect(() => sum(1001,2)).toThrow(TypeError);
    expect(() => sum(1001,2)).toThrow('Invalid input');
  });

  test('Test matching object', () => {
    let object = returnObject()
    expect(object).toMatchObject(testObject)
  })

  test('Test getPatient()', () =>{
    const patient = getPatient()
    expect(patient.getName()).teBo('Henrik')
  })
  
})