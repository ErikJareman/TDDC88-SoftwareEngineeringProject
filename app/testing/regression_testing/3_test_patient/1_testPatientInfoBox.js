const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')
const { goToPatient } = require('../3_test_patient/patientUtilities.js')

/** Checks if the selected patient in home page takes the user to the 
 * correlating patient page */
async function testPatientInfoBox(driver) {
  await goToPatient(driver, 'Fredrik Olsson')
  await sleep(500)
  const patientInfo = await driver.wait(until.elementLocated(By.css(
    '.PatientInfo-div')), 3000).getText().then((val) => {
      return val
    })
  if (patientInfo.includes('Fredrik Olsson, 930217-5150')) {
    return true
  }
  return 0
}

module.exports = { testPatientInfoBox }