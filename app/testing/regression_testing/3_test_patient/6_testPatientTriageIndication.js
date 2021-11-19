const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')
const axios = require('axios')



/* function setPatients(datan) {
    patients = datan
} */

async function testPatientTriageIndication (driver) {
    // Go to the top patient in the home-view
    await driver.wait(until.elementLocated(By.css(
        'li:nth-child(1)')), 3000).click()
    await sleep(500)

     //creates a list called patients 

    let patients = []

    // gets the patient's triage level from the database
    await axios.get('https://backend-c4company.herokuapp.com/patients/Motala') 
        .then(res => {
            patients = res.data
    })

    // creates a variable for the triage 

    let triage = patients[0].triageLevel
    console.log(triage)
    
    // creates a list for available triage colors 
    const triageColors = ['green', 'yellow', 'orange', 'red']

    // checks what triage color the patient has
    // a check should be made (it is not implemented atm) that the color is corrected with regards to the patient's triage level
    const triageColor = await driver.wait(until.elementLocated(By.xpath(
        '//div[@id=root]/div/div[3]/div/div/div/div/h5[2][@style:background-color')), 3000).getText().then((val) => {
            console.log(val)
            if (val) {
                console.log(val)
                return true
            } else {
                return false
            }
        })
    return triageIndication


    // Gets the timer from the patient page 
    /**const triageIndication = await driver.wait(until.elementLocated(By.css(
        'span')), 3000).getText().then((val) => {
            if (val) {
                console.log(val)
                return true
            } else {
                return false
            }
        })
    return triageIndication*/
}

module.exports = { testPatientTriageIndication }