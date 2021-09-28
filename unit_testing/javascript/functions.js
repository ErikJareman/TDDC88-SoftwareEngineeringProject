function sum(a, b) {
  if (a > 1000) {
    throw new TypeError('Invalid input')
  }
  return a + b;
}

function returnObject() {
  const object = {
    shouldMatch: true,
    TDDIsBest: true,
    losingIsAnOption: false
  }
  return object
}

module.exports = { sum, returnObject, getPatient };
