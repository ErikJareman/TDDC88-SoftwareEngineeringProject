const { By, until, Key } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')

/** Tests to login as 'Läkare' in 'Motala' */
async function testLogin (driver) {
  // Choose 'Läkare' as role
  const roleBox = await driver.wait(until.elementLocated(By.css(
    'div.field.roles > div')), 3000)
  await roleBox.click()
  await roleBox.sendKeys(Key.ENTER)
  await sleep(500)
  // Choose 'Motala' as location
  const locationBox = await driver.wait(until.elementLocated(By.css(
    'div.field.locations > div')), 3000)
  await locationBox.sendKeys(Key.ARROW_DOWN + Key.ARROW_DOWN + Key.ENTER)
  await sleep(500)
  // Click on 'Logga in'-button
  await driver.wait(until.elementLocated(By.css(
    "button[class='ui button startButton'")), 3000).click()
  // Check if login was successful
  try {
    await driver.wait(until.elementsLocated(By.css(
      '#linkList > a')), 3000) // Patient list
  } catch (err) {
    if (err.name === 'TimeoutError') {
      return 'Login was unsuccessful (did not reach home page view)'
    } else {
      return err
    }
  }
  return true
}

module.exports = { testLogin }
