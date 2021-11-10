const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')
const { url } = require('../testConfig.js')

/** Checks if clicking the 'back to patient list' button navigates
 * user to the home page */
async function testHomePageBtn (driver) {
  await driver.wait(until.elementLocated(By.css(
    'li:nth-child(1) > a:nth-child(1)')), 3000).click()
  await sleep(500)
  await driver.wait(until.elementLocated(By.css(
    '.patient-nav-bar > a > button')), 3000).click()
  await sleep(500)
  const curUrl = await driver.getCurrentUrl()
  if (curUrl === url + 'home') {
    return true
  }

  return false
}

module.exports = { testHomePageBtn }
