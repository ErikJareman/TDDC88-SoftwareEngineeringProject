const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')
const { url } = require('../testConfig.js')

/** Checks if clicking the 'back to patient list' button navigates
 * user to the home page */
async function testHomePageBtn (driver) {
  await driver.wait(until.elementLocated(By.css(
    'ul > li:nth-child(2)')), 3000).click()
  await sleep(500)
  await driver.wait(until.elementLocated(By.css(
    "a[id='linkarea2']")), 3000).click()
  await sleep(500)
  const curUrl = await driver.getCurrentUrl()
  if (curUrl === url + 'home') {
    return true
  }

  return false
}

module.exports = { testHomePageBtn }
