const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')

/** Checks if the patient data in patient list (home view) matches patient data
 * in Patientinfo-box (patient view) */
async function testPatientInfoBox (driver) {
  const PatientInfoResult = {
    roomOk: false,
    // teamOk: false,
    nameOk: false
  }
  // Get data from top patient in patient list (home view)
  const textList = []
  const topPatientInfoList = await driver.wait(until.elementsLocated(By.css(
    'li:nth-child(1) #linkList > a > h3')), 3000)
  for (let i = 0; i < topPatientInfoList.length; i++) {
    const info = await topPatientInfoList[i].getText().then((val) => {
      return val
    })
    textList.push(info)
  }
  console.log(textList)
  // Get data from Patientinfo-box (patient view)
  await driver.wait(until.elementLocated(By.css(
    'li:nth-child(1)')), 3000).click()
  await sleep(500)
  const patientInfo = await driver.wait(until.elementLocated(By.css(
    '.PatientInfo-div')), 3000).getText().then((val) => {
    return val
  })
  console.log(patientInfo)
  // Check if data in patient list (home view) matches Patientinfo data (patient view)
  // textList = [0: timer, 1: reasonForVisit, 2: patientName, 3: patientSSN, 4: timeOfArrival, 5: room]
  if (patientInfo.includes('Room : ' + textList[5])) {
    PatientInfoResult.roomOk = true
  }
  // TEAM IS NOT DISPLAYED IN THE OVERVIEW (PATIENT LIST IN HOME PAGE)
  // if (patientInfo.includes('Team : ' + textList[5])) {
  //   PatientInfoResult.teamOk = true
  // }
  if (patientInfo.includes(textList[2])) {
    PatientInfoResult.nameOk = true
  }

  return PatientInfoResult
}

module.exports = { testPatientInfoBox }
