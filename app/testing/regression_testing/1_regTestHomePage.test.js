const { url } = require('./testConfig.js')
const { buildDriver, sleep } = require('./testUtilities.js')
const { getPatientListLength } = require('./1_test_home/1_testPatientList.js')
const { getHomePageHeading } = require('./1_test_home/homeUtilities.js')
const { goToPatient } = require('./3_test_patient/patientUtilities.js')
const { loginIfNeeded } = require('./2_test_login/loginUtilities.js')
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

  test('#72 : Test home-page heading', async () => {
    expect(await getHomePageHeading(driver)).toBe('Motala')
  })

  test('Test select patient in patient list', async () => {
    expect(await goToPatient(driver, 'Benbrott')).toBe(true)
  })

  test('Test patient list length in home view', async () => {
    await driver.get(url + 'home')
    await sleep(500)
    const patientCount = await getPatientListLength(driver)
    const overTen = patientCount > 10
    expect(overTen).toBe(true)
  })
})
