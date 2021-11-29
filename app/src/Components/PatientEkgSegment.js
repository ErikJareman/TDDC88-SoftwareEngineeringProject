/**
 * Component to render an ekg segments data points
 *
 * Created 2021-11-28
 *
 * David Råsberg
 *
 */

export default function generateSegment () {
  const points = []
  let currentData = 0
  // push some 0s
  for (let i = 0; i < 20; ++i) {
    points.push(currentData)
  }
  // P
  // for (let i = 0; i < 10; ++i) {
  //   points.push(++currentData)
  // }
  // for (let i = 0; i < 10; ++i) {
  //   points.push(--currentData)
  // }
  for (let i = 0; i < 39; ++i) {
    const value = Math.round(-7.105427e-15 + 0.5934732 * (i / 2.0) + 0.1104895 * Math.pow((i / 2.0), 2) - 0.007459207 * Math.pow((i / 2.0), 3))
    points.push(currentData + value)
  }

  /* Tried to make in into a curve. Did not work...
   for (let i = 0; i <= 20; ++i) {
    points.push(1.8 * i - ((0.3 * i) ^ 2))
    console.log(i, 1.8 * i - ((0.3 * i) ^ 2))
  } */

  for (let i = 0; i < 10; ++i) {
    points.push(currentData)
  }
  // Begin decent for Q
  for (let i = 0; i < 10; ++i) {
    currentData = currentData - 1
    points.push(currentData)
  }
  // Ascend to R
  const heightPoints = (Math.floor(Math.random() * 2) + 5)
  for (let i = 0; i < 15; ++i) {
    currentData = currentData + heightPoints
    points.push(currentData)
  }
  // Decend to S
  for (let i = 0; i < 16; ++i) {
    currentData = currentData - heightPoints
    points.push(currentData)
  }
  // Ascend to 0
  for (let i = 0; i < 16; ++i) {
    currentData = currentData + 1
    points.push(currentData)
  }
  for (let i = 0; i < 35; ++i) {
    points.push(currentData)
  }
  // for (let i = 0; i < 10; ++i) {
  //   currentData += 1.5
  //   points.push(currentData)
  // }
  // Ascend to T
  // for (let i = 0; i < 10; ++i) {
  //   currentData -= 1.5
  //   points.push(currentData)
  // }
  // return to 0
  for (let i = 0; i < 89; ++i) {
    const value = Math.round(1.598721e-14 + 0.4685714 * (i / 1.5) + 0.01733333 * Math.pow((i / 1.5), 2) - 0.0004190476 * Math.pow((i / 1.5), 3))
    points.push(currentData + value)
  }
  for (let i = 0; i < 15; ++i) {
    points.push(currentData)
  }
  return points
}
