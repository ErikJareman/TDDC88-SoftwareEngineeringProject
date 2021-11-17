const { By, until } = require('selenium-webdriver')
const { sleep } = require('../testUtilities.js')

async function getInOut (driver) {
  await driver.wait(until.elementLocated(By.css(
    'li:nth-child(1)')), 3000).click()
  await sleep(500)
  const inOut = await driver.wait(until.elementLocated(By.css(
    "ul[class='injections']")), 3000).getText().then((val) => {
    return val
  })
  return inOut
}

module.exports = { getInOut }
