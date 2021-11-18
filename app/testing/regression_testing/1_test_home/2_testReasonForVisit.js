const { By, until } = require('selenium-webdriver')

/** Looks through the complete list of patients in the overview page and
 * checks if reason for visit are displayed for each (only accepts Hjartkramp,
 * Benbrott, Ryggverk and Buksmartor for valid reasons for visit) */
async function getReasonForVisit (driver) {
  const patientDataList = []
  const patientList = await driver.wait(until.elementsLocated(By.css(
    'li')), 3000)
  console.log(patientList.length)
  for (let i = 0; i < patientList.length; i++) {
    const elementText = await patientList[i].getText().then((val) => {
      return val
    })
    patientDataList.push(elementText)
  }
  for (const element of patientDataList) {
    if (element.includes('Hjartkramp') ||
      element.includes('Benbrott') ||
      element.includes('Ryggvark') ||
      element.includes('Buksmartor')) {
      continue
    } else {
      return 'Could not find the reason for visit on patient: ' + element
    }
  }
  return true
}

module.exports = { getReasonForVisit }
