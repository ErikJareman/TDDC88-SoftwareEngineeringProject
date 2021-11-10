const { getElementText } = require('../testUtilities.js')
const { By, until } = require('selenium-webdriver')

const patientListElement = {
  cssStart: 'li:nth-child(',
  num: 1,
  cssEnd: ')'
}
// NOT WORKING WITH RANDOMLY GENERATED PATIENT NAMES
/** Navigates to the patient page correlating to the patient-name parameter
 * passed in */
async function goToPatient (driver, patientName) {
  const patientList = await driver.wait(until.elementsLocated(By.css(
    'li')), 3000)
  for (const patient of patientList) {
    const patientText = await getElementText(patient)
    if (patientText.includes(patientName)) {
      await patient.click()
      return true
    }
  }
  return false
}

module.exports = { goToPatient, patientListElement }
