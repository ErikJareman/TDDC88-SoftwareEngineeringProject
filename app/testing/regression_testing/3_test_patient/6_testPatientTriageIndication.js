const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')
const axios = require('axios')

/** Checks if the patient's triage level matches the triage color
 * displayed on the patient page */
async function testPatientTriageIndication (driver) {
  // Goes to the top patient in the home-view
  await driver.wait(until.elementLocated(By.css(
      'ul > li:nth-child(2)')), 3000).click()
  await sleep(500)
  // Creates a list called patients 
  let patients = []
  // Gets all the patients from the database
  await axios.get('https://backend-c4company.herokuapp.com/patients/Motala') 
      .then(res => {
          patients = res.data
  })
  // Creates a variable for the patient's triage level 
  let triageLevel = patients[0].triageLevel
  // Gets the patient's triage color and checks if it matches the patient's triage level
  const triageColor = await driver.wait(until.elementLocated(By.css(
      "h5[id='triageBox']")), 3000).getAttribute('style')
      // 'div.Row > h5:nth-child(1)'
      console.log(triageColor)
  if (triageColor.includes("red")) {
      if (triageLevel == 4) {
          return true
      }
  } else if (triageColor.includes("orange")) {
      if (triageLevel == 3) {
          return true
      } 
  } else if (triageColor.includes("yellow")) {
      if (triageLevel == 2) {
          return true
      } 
  } else if (triageColor.includes("green")) {
      if (triageLevel == 1) {
          return true
      } 
  } else { 
      return false
  }
}

module.exports = { testPatientTriageIndication }