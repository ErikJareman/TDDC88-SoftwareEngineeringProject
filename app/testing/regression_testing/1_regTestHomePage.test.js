const { url } = require('./testConfig.js')
const { buildDriver } = require('./testUtilities.js')
const { testPatientList } = require('./1_test_home/1_testPatientList.js')
const { getHomePageHeading } = require('./1_test_home/homeUtilities.js')
const { goToPatient } = require('./3_test_patient/patientUtilities.js')

describe('Testing home page', () => {
  beforeAll(async () => {
    driver = await buildDriver(url)
    // await isLoggedIn(driver)
    return driver
  })

  afterAll(async () => {
    return await driver.quit()
  })

  test('Test home-page heading', async () => {
    expect(await getHomePageHeading(driver)).toBe('Norrköping')
  })

  test('Test select patient in patient list', async () => {
    expect(await goToPatient(driver, 'Fredrik Olsson')).toBe(true)
  })

  test('Test content in patient list in home view', async () => {
    expect(await testPatientList(driver)).toBe(2)
  })

})
