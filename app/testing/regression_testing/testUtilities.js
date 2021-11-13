const { Builder, By, until, Capabilities } = require('selenium-webdriver')
const { waitFactor } = require('./testConfig.js')
const { Options, ServiceBuilder } = require('selenium-webdriver/chrome')

/** Sets up and returns driver */
async function buildDriver (url) {
  const serviceBuilder = new ServiceBuilder('./regression_testing/drivers/chromedriver')
  let driver
  opt = new Options()
  opt.addArguments('--no-sandbox')
  opt.addArguments('--disable-dev-shm-usage')
  opt.addArguments('--headless')
  opt.addArguments('--start-maximized')
  try {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeService(serviceBuilder)
      .setChromeOptions(opt)
      .build()
    await driver.get(url)
    return driver
  } catch (err) {
    throw Error('Could not build webdriver. Check PATH. ' + err)
  }
};

/** Puases test for ms milliseconds */
function sleep (ms) {
  ms *= waitFactor
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
};

/** Returns a random string of passed in length */
function getRandomString (length) {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  };
  return result
};

/** Looks for elements matching the css values and returns the number of found elements */
async function getElementCount (driver, cssObject) {
  const saveNum = cssObject.num
  let exists = true
  let elementCount = 0
  while (exists) {
    try {
      const element = await driver.wait(until.elementsLocated(By.css(
        cssObject.cssStart + cssObject.num + cssObject.cssEnd)), 3000)
      for (let i = 0; i < element.length; i++) {
        elementCount++
      }
      cssObject.num++
    } catch (err) {
      if (err.name === 'TimeoutError') {
        exists = false
      } else {
        throw new Error(err)
      }
    }
  }
  cssObject.num = saveNum
  return elementCount
};

/** Returns a list with all elements found matching the css-value */
async function getElementListCss (driver, cssObject) {
  const elementList = []
  const saveNum = cssObject.num
  let exists = true
  while (exists) {
    try {
      const element = await driver.wait(until.elementsLocated(By.css(
        cssObject.cssStart + cssObject.num + cssObject.cssEnd)), 3000).then((val) => {
        return val
      })
      try {
        if (element.length > 1) {
          for (let i = 0; i < element.length; i++) {
            elementList.push(element[i])
          }
        } else {
          elementList.push(element[0])
        }
      } catch (err) {}
      cssObject.num++
    } catch (err) {
      if (err.name === 'TimeoutError') {
        exists = false
      } else {
        throw new Error(err)
      }
    }
  }
  cssObject.num = saveNum
  return elementList
}

/** Takes in xpath to a collection of webelements and returns a list containing the elements, or a empty list
 * if no elements are found */
async function getElementListXpath (driver, xpath) {
  try {
    const elementList = await driver.wait(until.elementsLocated(By.xpath(xpath)),
      2000).then(function (found) {
      return found
    })
    return elementList
  } catch (err) {
    return []
  }
};

/** Looks for the element matching cssVal and returns that elements text-value */
async function getElementTextCss (driver, cssVal) {
  const elementText = await driver.wait(until.elementLocated(By.css(
    cssVal)), 3000).getText().then((val) => {
    return val
  })
  return elementText
}

async function getElementText (element) {
  const elementText = await element.getText().then((val) => {
    return val
  })
  return elementText
};

/** Returns the first part of an elements text-value split by separator */
async function getElementName (element, separator) {
  try {
    const elementName = await element.getText().then((val) => {
      const splitList = val.split(separator, 1)
      return splitList[0]
    })
    return elementName
  } catch (err) {
    return ''
  }
};

/** Looks through a list of elements and clicks on the element matching tagetName */
async function findElementInList (elementList, targetName) {
  for (let i = 0; i < elementList.length; i++) {
    const elementName = await elementList[i].getText().then((val) => {
      return val
    })
    if (elementName.includes(targetName)) {
      return elementList[i]
    }
  }
  return 0
};

module.exports = {
  buildDriver,
  getElementCount,
  getElementText,
  getElementListCss,
  getElementName,
  sleep,
  getRandomString,
  findElementInList,
  getElementListXpath,
  getElementTextCss
}
