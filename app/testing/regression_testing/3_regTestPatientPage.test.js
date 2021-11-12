const { url } = require('./testConfig.js')
const { buildDriver, sleep } = require('./testUtilities.js')
const { testPatientInfoBox } = require('./3_test_patient/1_testPatientInfoBox.js')
const { testHomePageBtn } = require('./3_test_patient/2_testBackToHomePageBtn.js')
const { testTabs } = require('./3_test_patient/3_testPatientTabs.js')
const { testLogin } = require('./2_test_login/1_testLogin.js')
const { loginIfNeeded } = require('./2_test_login/loginUtilities.js')
let driver
const tabContents = {
  tab1: true,
  tab2: true,
  tab3: true
}

const PatientInfoResult = {
  roomOk: true,
  teamOk: true,
  nameOk: true
}

describe('Testing pateint page', () => {
  beforeAll(async () => {
    driver = await buildDriver(url)
    await testLogin(driver)
    return driver
  })

  beforeEach(async () => {
    return await loginIfNeeded(driver)
  })

  beforeEach(async () => {
    await sleep(500)
  })

  afterAll(async () => {
    return await driver.quit()
  })

  test('#51, #53 : Test patient info for correct data regarding Room number and Assigned team', async () => {
    expect(await testPatientInfoBox(driver)).toMatchObject(PatientInfoResult)
  })

  test('Test the "back to patient list"-button', async () => {
    await driver.get(url + 'home')
    await sleep(500)
    expect(await testHomePageBtn(driver)).toBe(true)
  })

  test('Test the patient tabs', async () => {
    await driver.get(url + 'home')
    await sleep(500)
    expect(await testTabs(driver)).toMatchObject(tabContents)
  })
})
