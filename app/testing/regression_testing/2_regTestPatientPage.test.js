const { url } = require('./testConfig.js')
const { buildDriver } = require('./testUtilities.js')
const { testPatientInfoBox } = require('./3_test_patient/1_testPatientInfoBox.js')
let driver

describe('Testing pateint page', () => {
  beforeAll(async () => {
    driver = await buildDriver(url)
    return driver
  })

  afterAll(async () => {
    return await driver.quit()
  })

  test('Test patient info for correct data', async () => {
    expect(await testPatientInfoBox(driver)).toBe(true)
  })
})
