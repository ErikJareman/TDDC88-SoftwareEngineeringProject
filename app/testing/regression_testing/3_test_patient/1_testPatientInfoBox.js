const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')

/** Checks if the patient data in patient list (home view) matches patient data
 * in Patientinfo-box (patient view) */
async function testPatientInfoBox (driver) {
  const patientInfoResult = {
    roomOk: false,
    teamOk: false,
    nameOk: false
  }
  const patientInfoCollection = {
    room: null,
    patientName: null,
    team: null
  }
  let infoList = []
  // Get data from top patient in patient list (home view)
  const topPatientInfoList = await driver.wait(until.elementsLocated(By.css(
    'ul > li:nth-child(2)')), 3000)
  for (let i = 0; i < topPatientInfoList.length; i++) {
    infoList = await topPatientInfoList[i].getText().then((val) => {
      const splitList = val.split('\n', 10)
      return splitList
    })
  }
  // Get the team number for top element in patient list
  const teamNum = await driver.wait(until.elementLocated(By.css(
    "button[class='teams']")), 3000).getText().then((val) => {
    const splitList = val.split(' ', 2)
    return splitList[1]
  })
  patientInfoCollection.room = ('Rum ' + infoList[6])
  patientInfoCollection.patientName = infoList[3]
  patientInfoCollection.team = ('Team ' + teamNum)
  await topPatientInfoList[0].click()
  await sleep(500)
  const patientInfo = await driver.wait(until.elementLocated(By.css(
    "div[class='patient-nav-bar']")), 3000).getText().then((val) => {
    return val
  })
  // Check if data in patient list (overview) matches Patientinfo data (patient view - navbar)
  if (patientInfo.includes(patientInfoCollection.room)) {
    patientInfoResult.roomOk = true
  }
  if (patientInfo.includes(patientInfoCollection.team)) {
    patientInfoResult.teamOk = true
  }
  if (patientInfo.includes(patientInfoCollection.patientName)) {
    patientInfoResult.nameOk = true
  }

  return patientInfoResult
}

module.exports = { testPatientInfoBox }
