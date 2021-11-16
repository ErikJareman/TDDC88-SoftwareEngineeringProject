const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')
//const { axios } = require('axios')
//import axios from 'axios'
const { useState, useEffect } = require('react') 

async function testPatientTriageIndication (driver) {
    // Go to the top patient in the home-view
    await driver.wait(until.elementLocated(By.css(
        'li:nth-child(1)')), 3000).click()
    await sleep(500)
     //skapar en lista som heter patients och en tillhörande funktion som heter setPatients
    //const [patients, setPatients] = useState([])
    //useEffect(() => {
        axios.get('https://backend-c4company.herokuapp.com/patients/' + localStorage.getItem('localLocation'))
          .then(res => {
            const persons = res.data
            console.log(persons)
            
           // setPatients(persons)
        })
    //}, [])

    console.log(patients)
    
    const triageColors = ['green', 'yellow', 'orange', 'red']
    // Gets the timer 
    const triageIndication = await driver.wait(until.elementLocated(By.css(
        'span')), 3000).getText().then((val) => {
            if (val) {
                return true
            } else {
                return false
            }
        })
    return triageIndication
}

module.exports = { testPatientTriageIndication }