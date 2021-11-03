const { By, until } = require('selenium-webdriver')
const { patientListElement } = require('../3_test_patient/patientUtilities.js')
const { url } = require('../testConfig.js')
const { sleep, getElementListCss } = require('../testUtilities.js')

/** Looks for the page heading and returns the text of the heading */
async function getHomePageHeading(driver) {
  const elementText = await driver.wait(until.elementLocated(By.id(
    "headerText")), 3000).getText().then((val) => {
    return val
  })
  return elementText
}

/** Looks for patients in patient list on home page and returns a list 
 * containing the detected patients */
async function getPatientList(driver) {
  await driver.get(url)
  await sleep(500)
  const patientList = await getElementListCss(driver, patientListElement)
  return patientList
}

module.exports = { getHomePageHeading, getPatientList }