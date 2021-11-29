const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')
const axios = require('axios')

/** Checks if the patient's triage level matches the triage color
 * displayed on the overview page */
async function testOverviewTriageIndication (driver) {
  // Creates a list called patients 
  let patients = []
  // Gets all the patients from the database
  await axios.get('https://backend-c4company.herokuapp.com/patients/Motala') 
      .then(res => {
          patients = res.data
  })
  // Creates a variable for the patient's triage level 
  let triageLevel = patients[0].triageLevel
  // Gets the patient's triage color on and checks if it matches the patient's triage level
  const triageColor = await driver.wait(until.elementLocated(By.css(
      'li:nth-child(2) > #linkList .medium')), 3000).getAttribute('style')
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

module.exports = { testOverviewTriageIndication }