const { By, until } = require('selenium-webdriver')

/** Checks if patient page displays patient name and SSN */
async function testPatientNameAndSSN (driver) {
  const patientHeader = {
    patientName: false,
    patientSSN: false
  }
  const textList = []
  const topPatientInfoList = await driver.wait(until.elementsLocated(By.css(
    'li:nth-child(1) #linkList > a > h3')), 3000)
  for (let i = 0; i < topPatientInfoList.length; i++) {
    const info = await topPatientInfoList[i].getText().then((val) => {
      return val
    })
    textList.push(info)
  }
  await topPatientInfoList[2].click()
  const patientHeaderList = await driver.wait(until.elementLocated(By.css(
    "h1[id='subheaderText']")), 3000).getText().then((val) => {
    const splitList = val.split(' , ', 2)
    return splitList
  })
  const patientName = patientHeaderList[0]
  const patientSSN = patientHeaderList[1]

  if (patientName === textList[2]) {
    patientHeader.patientName = true
  }

  if (patientSSN.length === 13) {
    patientHeader.patientSSN = true
  }

  return patientHeader
}

module.exports = { testPatientNameAndSSN }
