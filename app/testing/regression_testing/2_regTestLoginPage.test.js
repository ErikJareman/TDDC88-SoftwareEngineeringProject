const { url } = require('./testConfig.js')
const { buildDriver } = require('./testUtilities.js')
const { testLogin } = require('./2_test_login/1_testLogin.js')
let driver

describe('Testing home page', () => {
  beforeAll(async () => {
    driver = await buildDriver(url)
    return driver
  })

  afterAll(async () => {
    return await driver.quit()
  })

  test('Test login', async () => {
    expect(await testLogin(driver)).toBe(true)
  })
})
