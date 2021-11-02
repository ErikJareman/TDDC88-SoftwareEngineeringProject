require('dotenv').config()
const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')

/** Adds existing lables to a testDocument and checks so they are present */
async function getHomePageHeading(driver) {
  const elementText = await driver.wait(until.elementLocated(By.id(
    "headerText")), 3000).getText().then((val) => {
    return val
  })
  return elementText
}

async function goToPatient(driver) {
  await driver.wait(until.elementLocated(By.css(
    "li:nth-child(1) .long:nth-child(3)")), 3000).click()
  const patientInfo = await driver.wait(until.elementLocated(By.css(
    ".PatientInfo-div")), 3000).getText().then((val) => {
      return val
    })
  if (patientInfo.includes("Fredrik Olsson")) {
    return true;
  }
  return 0; 
}

module.exports = { getHomePageHeading, goToPatient }