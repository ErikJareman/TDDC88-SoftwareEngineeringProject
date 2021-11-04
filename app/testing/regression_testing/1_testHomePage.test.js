const url = 'http://localhost:3000/'
const { buildDriver } = require('./testUtilities.js')
const { getHomePageHeading, goToPatient } = require('./1_test_home/1_testSomething.js')

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

})
