const { url } = require('./testConfig.js')
const { buildDriver } = require('./testUtilities.js')
const { testPatientList } = require('./1_test_home/1_testPatientList.js')
const { getHomePageHeading } = require('./1_test_home/homeUtilities.js')
const { goToPatient } = require('./3_test_patient/patientUtilities.js')

describe('Testing document functionality', () => {
  beforeAll(async () => {
    driver = await buildDriver(url)
    // await isLoggedIn(driver)
    return driver
  })

  afterAll(async () => {
    return await driver.quit()
  })

  test('Home-page heading', async () => {
    expect(await getHomePageHeading(driver)).toBe('Norrköping')
  })

  test('Test patient info', async () => {
    expect(await goToPatient(driver)).toBe(true)
  })

  test('Test patient list in home view', async () => {
    expect(await testPatientList(driver)).toBe(2)
  })

})
