const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')
const { goToPatient } = require('../3_test_patient/patientUtilities.js')
const { url } = require('../testConfig.js')

/** Checks if clicking the 'back to patient list' button navigates
 * user to the home page */
async function testHomePageBtn (driver) {
  if (await goToPatient(driver, 'Fredrik Olsson')) {
    await sleep(500)
    await driver.wait(until.elementLocated(By.css(
      '.patient-nav-bar > a > button')), 3000).click()
    await sleep(500)
    const curUrl = await driver.getCurrentUrl()
    if (curUrl === url) {
      return true
    }
  }
  return 0
}

module.exports = { testHomePageBtn }
