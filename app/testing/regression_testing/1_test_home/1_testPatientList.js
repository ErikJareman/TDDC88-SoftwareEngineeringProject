const { getElementText, findElementInList } = require('../testUtilities.js')
const { getPatientList } = require('./homeUtilities.js')

/** Looks for the patient list in home page and returns the amount of
 * patients in the list */
async function getPatientListLength (driver) {
  const patientList = await getPatientList(driver)
  return patientList.length
}

/** Looks for patients in patient list on home page and checks if the
 * reason for visit is diplayed with the correct patient */
async function getReasonForVisit (driver) {
  const result = {
    fredrikOk: false,
    karlOk: false
  }
  const patientList = await getPatientList(driver)
  const testPatient1 = await getElementText(
    await findElementInList(patientList, 'Fredrik Olsson'))
  const testPatient2 = await getElementText(
    await findElementInList(patientList, 'Karl Boström'))
  if (testPatient1.includes('Benbrott')) {
    result.fredrikOk = true
  }
  if (testPatient2.includes('Buksmärtor')) {
    result.karlOk = true
  }
  return result
}

module.exports = { getPatientListLength, getReasonForVisit }
