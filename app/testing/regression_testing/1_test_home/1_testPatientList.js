const { By, until } = require('selenium-webdriver')
const { getElementText, findElementInList } = require('../testUtilities.js')
const { getPatientList } = require('./homeUtilities.js')

/** Looks for the patient list in home page and returns the amount of
 * patients in the list */
async function getPatientListLength (driver) {
  const patientList = await driver.wait(until.elementsLocated(By.css(
    'li')), 3000)
  return patientList.length
}

// REASON FOR VISIT IS HARD TO TEST WITHRANDOMLY GENERATED DATA THAT DIFFERS BETWEEN TEST-OCCASIONS

/** Looks for patients in patient list on home page and checks if the
 * reason for visit is diplayed with the correct patient */
async function getReasonForVisit (driver) {
  const result = {
    patient_1_Ok: false,
    patient_2_Ok: false
  }
  const patientList = await getPatientList(driver)
  console.log(patientList.length)
  for (let i = 0; i < patientList.length; i++) {
    const elementText = await patientList[i].getText().then((val) => {
      return val
    })
    console.log(elementText)
  }
  const testPatient1 = await getElementText(
    await findElementInList(patientList, 'Timothy Stone'))
  const testPatient2 = await getElementText(
    await findElementInList(patientList, 'Judy Rice'))
  if (testPatient1.includes('Benbrott')) {
    result.patient_1_Ok = true
  }
  if (testPatient2.includes('Buksmartor')) {
    result.patient_2_Ok = true
  }
  return result
}

module.exports = { getPatientListLength, getReasonForVisit }
