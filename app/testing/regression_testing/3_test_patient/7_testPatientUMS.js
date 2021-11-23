const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')

/** Checks if the UMS symbol exists */
async function testPatientUMS (driver) {
  await driver.wait(until.elementLocated(By.css(
    'ul > li:nth-child(2)')), 3000).click()
  await sleep(500)
  try {
    const ums = await driver.wait(until.elementLocated(By.css(
      "object[class='UMS-logo']")), 3000)
    if (ums !== null) {
      return true
    }
  } catch (err) {
    if (err.name === 'TimeoutError') {
      return 'Unable to locate the UMS element, check if it exists or check if test i faulty'
    }
  }
  return 0
}

module.exports = { testPatientUMS }
