const { sleep, getElementListCss, getElementText } = require('../testUtilities.js')
const { url } = require('../testConfig.js')

const patientListElement = {
  cssStart : 'a:nth-child(',
  num : 1,
  cssEnd : ') > table'
}

/** Navigates to the patient page correlating to the patient-name parameter 
 * passed in */
async function goToPatient(driver, patientName) {
  await driver.get(url)
  await sleep(500)
  const patientList = await getElementListCss(driver, patientListElement)
  for (const patient of patientList) {
    const patientText = await getElementText(patient)
    if (patientText.includes(patientName)) {
      await patient.click(); 
      return true
    }
  }
  return false
}

module.exports = { goToPatient, patientListElement }