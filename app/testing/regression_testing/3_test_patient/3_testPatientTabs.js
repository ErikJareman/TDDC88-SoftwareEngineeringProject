const { By, until } = require('selenium-webdriver')
const { sleep, getElementText } = require('../testUtilities.js')

/** Clicks on patient tabs and checks if content for each tab matches expected content */
async function testTabs (driver) {
  const tabContents = {
    tab1: false,
    tab2: false,
    tab3: false
  }
  // Go to top patient in patient list (home view)
  await driver.wait(until.elementLocated(By.css(
    'ul > li:nth-child(2)')), 3000).click()
  await sleep(500)
  // Get tabs and content-box under tab
  const tab1 = await driver.wait(until.elementLocated(By.css('.card')), 3000)
  const tab2 = await driver.wait(until.elementLocated(By.css('.envelope')), 3000)
  const tab3 = await driver.wait(until.elementLocated(By.css('.location')), 3000)
  const contentBox = await driver.wait(until.elementLocated(By.css('.bottom')), 3000)
  // Click on the tabs and check if the content-box matches excepted data
  await tab2.click()
  let content = await getElementText(contentBox)
  if (content.includes('Medicin ordination') && content.includes('Smörgås och saft')) {
    tabContents.tab2 = true
  }
  await tab3.click()
  content = await getElementText(contentBox)
  if (content.includes('Patient inlagd')) {
    tabContents.tab3 = true
  }
  await tab1.click()
  content = await getElementText(contentBox)
  if (content.includes('Medicindosering')) {
    tabContents.tab1 = true
  }

  return tabContents
}

module.exports = { testTabs }
