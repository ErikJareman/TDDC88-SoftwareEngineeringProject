const { By, until } = require('selenium-webdriver')
const { sleep, getElementText } = require('../testUtilities.js')
const { goToPatient } = require('../3_test_patient/patientUtilities.js')

/** Clicks on patient tabs and checks if content for each tab matches expected content */
async function testTabs (driver) {
  const tabContents = {
    tab1: false,
    tab2: false,
    tab3: false
  }
  if (await goToPatient(driver, 'Fredrik Olsson')) {
    await sleep(500)
    const tab1 = await driver.wait(until.elementLocated(By.css('.card')), 3000)
    const tab2 = await driver.wait(until.elementLocated(By.css('.envelope')), 3000)
    const tab3 = await driver.wait(until.elementLocated(By.css('.location')), 3000)
    const contentBox = await driver.wait(until.elementLocated(By.css('.bottom')), 3000)
    await tab2.click()
    let content = await getElementText(contentBox)
    if (content === 'Tab 2 Content') {
      tabContents.tab2 = true
    }
    await tab3.click()
    content = await getElementText(contentBox)
    if (content === 'Tab 3 Content') {
      tabContents.tab3 = true
    }
    await tab1.click()
    content = await getElementText(contentBox)
    if (content === 'Tab 1 Content') {
      tabContents.tab1 = true
    }
  }
  return tabContents
}

module.exports = { testTabs }
