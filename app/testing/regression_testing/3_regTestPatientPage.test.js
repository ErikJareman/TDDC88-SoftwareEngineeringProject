const { url } = require('./testConfig.js')
const { buildDriver, sleep } = require('./testUtilities.js')
const { testPatientInfoBox } = require('./3_test_patient/1_testPatientInfoBox.js')
const { testHomePageBtn } = require('./3_test_patient/2_testBackToHomePageBtn.js')
const { testTabs } = require('./3_test_patient/3_testPatientTabs.js')
const { testLogin } = require('./2_test_login/1_testLogin.js')
const { loginIfNeeded } = require('./2_test_login/loginUtilities.js')
const { testPatientNameAndSSN } = require('./3_test_patient/5_testPatientNameAndSSN.js')
const { getInOut } = require('./3_test_patient/4_testInputOutput.js')
const { testPatientTriageIndication } = require('./3_test_patient/6_testPatientTriageIndication.js')
const { testPatientUMS } = require('./3_test_patient/7_testPatientUMS.js')
let driver
const tabContents = { tab1: true, tab2: true, tab3: true }

const patientInfoResult = {
  roomOk: true,
  teamOk: true,
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

  test('#3.1 (U51, U53) : Test patient info for correct data regarding Room number and Assigned team', async () => {
    expect(await testPatientInfoBox(driver)).toMatchObject(patientInfoResult) // TEAM IS NOT DISPLAYED IN PATIENT LIST ON HOME PAGE
  })

  test('"3.2 (SRS3.1.2.1) : Test the "back to patient list"-button', async () => {
    await driver.get(url + 'home')
    await sleep(500)
    expect(await testHomePageBtn(driver)).toBe(true)
  })

  // test('#3.3 (U76) : Test the patient tabs', async () => {
  //   await driver.get(url + 'home')
  //   await sleep(500)
  //   expect(await testTabs(driver)).toMatchObject(tabContents)
  // })

  test('#3.4 (U10) : Check if patient page displays patient name and SSN', async () => {
    await driver.get(url + 'home')
    await sleep(500)
    expect(await testPatientNameAndSSN(driver)).toMatchObject(patientHeader)
  })

  test('#3.6 (U12) : Test if a UMS element exists in patient page', async () => {
    await driver.get(url + 'home')
    await sleep(500)
    expect(await testPatientUMS(driver)).toBe(true)
  })

  test('#3.7 (U13): Check if the triage on the patient page has the right color', async() => {
    await driver.get(url + 'home')
    await sleep(500)
    expect(await testPatientTriageIndication(driver)).toBe(true)
  })

})
