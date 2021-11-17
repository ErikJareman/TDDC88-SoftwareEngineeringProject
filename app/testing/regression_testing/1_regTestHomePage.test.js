const { url } = require('./testConfig.js')
const { buildDriver, sleep } = require('./testUtilities.js')
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

  test('#1.1 (U72) : Test home-page heading', async () => {
    expect(await getHomePageHeading(driver)).toBe('Motala')
  })

  test('#1.2 (R2) : Test select patient in patient list', async () => {
    expect(await goToPatient(driver, 'Benbrott')).toBe(true)
  })
})
