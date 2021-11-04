const { By, until } = require('selenium-webdriver')
const { goToPatient } = require('../3_test_patient/patientUtilities.js')

/** Checking if patient infobox caontains the correct room for patient */
async function testPatientRoom (driver) {
  if (await goToPatient(driver, 'Fredrik Olsson')) {
    const patientInfo = await driver.wait(until.elementLocated(By.css('.PatientInfo-div')), 3000).getText().then((val) => {
      return val
    })
    if (patientInfo.includes('Room : 1')) {
      return true
    }
  }
  return false
}

module.exports = { testPatientRoom }
