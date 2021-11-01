const { By, until } = require('selenium-webdriver')

async function getHomePageHeading(driver) {
  const title = await driver.getTitle()
  console.log('Page 2 : ' + title)
  const elementText = await driver.wait(until.elementLocated(By.id(
    "headerText")), 3000).getText().then((val) => {
    return val
  })
  return elementText
}

module.exports = { getHomePageHeading }