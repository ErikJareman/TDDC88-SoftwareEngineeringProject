const { sleep, getElementListCss } = require('../testUtilities.js')
const { url } = require('../testConfig.js')
const { patientListElement } = require('../3_test_patient/patientUtilities.js')

async function testPatientList(driver) {
  await driver.get(url)
  await sleep(500)
  const patientList = await getElementListCss(driver, patientListElement)
  return patientList.length
}

module.exports = { testPatientList }