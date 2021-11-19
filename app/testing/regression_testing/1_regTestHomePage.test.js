const { url } = require('./testConfig.js')
const { buildDriver, sleep } = require('./testUtilities.js')
const { getPatientListLength } = require('./1_test_home/1_testPatientList.js')
const { getHomePageHeading } = require('./1_test_home/homeUtilities.js')
const { goToPatient } = require('./3_test_patient/patientUtilities.js')
const { loginIfNeeded } = require('./2_test_login/loginUtilities.js')
const { getReasonForVisit } = require('./1_test_home/2_testReasonForVisit.js')
let driver

describe('Testing home page', () => {
  beforeAll(async () => {
    driver = await buildDriver(url)
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

  test('#1.1 (U72) : Test home-page heading', async () => {
    expect(await getHomePageHeading(driver)).toBe('Motala')
  })

  test('#1.2 (R2) : Test select patient in patient list', async () => {
    expect(await goToPatient(driver, 'Benbrott')).toBe(true)
  })

  test('#1.3 (SRS3.1.1.2) : Test if a list of patients is displayed in the overview page', async () => {
    await driver.get(url + 'home')
    await sleep(500)
    const patientCount = await getPatientListLength(driver)
    const overTen = patientCount > 10
    expect(overTen).toBe(true)
  })

  test('#1.4 (U50, SRS3.1.1.2) : Test to see if reason for visit is displayed in the patient list on the overview page', async () => {
    expect(await getReasonForVisit(driver)).toBe(true)
  })
})
