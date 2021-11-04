const { url } = require('./testConfig.js')
const { buildDriver } = require('./testUtilities.js')
const { testPatientInfoBox } = require('./3_test_patient/1_testPatientInfoBox.js')
const { testHomePageBtn } = require('./3_test_patient/2_testBackToHomePageBtn.js')
const { testTabs } = require('./3_test_patient/3_testPatientTabs.js')
const { testPatientRoom } = require('./3_test_patient/4_testPatientInfoRoom.js')
let driver
const tabContents = {
  tab1: true,
  tab2: true,
  tab3: true
}

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

  test('Test the "back to patient list"-button', async () => {
    expect(await testHomePageBtn(driver)).toBe(true)
  })

  test('Test the patient tabs', async () => {
    expect(await testTabs(driver)).toMatchObject(tabContents)
  })

  test('Test patient info: room', async () => {
    expect(await testPatientRoom(driver)).toBe(true)
  })

})
