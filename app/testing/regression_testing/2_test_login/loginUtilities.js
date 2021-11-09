const { testLogin } = require('./1_testLogin.js')
const { url } = require('../testConfig.js')

/** Checks if current page is the login-page, if so the driver logs in */
async function loginIfNeeded (driver) {
  const curUrl = await driver.getCurrentUrl()
  if (curUrl === url) {
    await testLogin(driver)
  }
}

module.exports = { loginIfNeeded }
