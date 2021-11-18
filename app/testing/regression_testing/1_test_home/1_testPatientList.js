const { By, until } = require('selenium-webdriver')

/** Looks for the patient list in home page and returns the amount of
 * patients in the list */
async function getPatientListLength (driver) {
  const patientList = await driver.wait(until.elementsLocated(By.css(
    'li')), 3000)
  return patientList.length
}

module.exports = { getPatientListLength }
