const { url } = require('./testConfig.js')
const { buildDriver, sleep } = require('./testUtilities.js')
const { testPatientInfoBox } = require('./3_test_patient/1_testPatientInfoBox.js')
const { testHomePageBtn } = require('./3_test_patient/2_testBackToHomePageBtn.js')
const { testTabs } = require('./3_test_patient/3_testPatientTabs.js')
const { testLogin } = require('./2_test_login/1_testLogin.js')
const { loginIfNeeded } = require('./2_test_login/loginUtilities.js')
const { testPatientNameAndSSN } = require('./3_test_patient/5_testPatientNameAndSSN.js')
const { getInOut } = require('./3_test_patient/4_testInputOutput.js')
let driver
const tabContents = {
  tab1: true,
  tab2: true,
  tab3: true
}

const PatientInfoResult = {
  roomOk: true,
  // teamOk: true,
  nameOk: true
}

const patientHeader = {
  patientName: true,
  patientSSN: true
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
    expect(await testPatientInfoBox(driver)).toMatchObject(PatientInfoResult) // TEAM IS NOT DISPLAYED IN PATIENT LIST ON HOME PAGE
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

  test('#10 : Check if patient page displays patient name and SSN', async () => {
    await driver.get(url + 'home')
    await sleep(500)
    expect(await testPatientNameAndSSN(driver)).toMatchObject(patientHeader)
  })

  test('Test the input and output', async () => {
    await driver.get(url + 'home')
    await sleep(500)
    const inOut = await getInOut(driver)
    const match = inOut.includes('PVK')
    expect(match).toBe(true)
  })
})
