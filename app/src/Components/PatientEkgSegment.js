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
  for (let i = 0; i < 10; ++i) {
    points.push(++currentData)
  }
  for (let i = 0; i < 10; ++i) {
    points.push(--currentData)
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
  for (let i = 0; i < 15; ++i) {
    currentData = currentData + 6
    points.push(currentData)
  }
  // Decend to S
  for (let i = 0; i < 16; ++i) {
    currentData = currentData - 6
    points.push(currentData)
  }
  // Ascend to 0
  for (let i = 0; i < 16; ++i) {
    currentData = currentData + 1
    points.push(currentData)
  }
  for (let i = 0; i < 15; ++i) {
    points.push(currentData)
  }
  for (let i = 0; i < 10; ++i) {
    currentData += 1.5
    points.push(currentData)
  }
  // Ascend to T
  for (let i = 0; i < 10; ++i) {
    currentData -= 1.5
    points.push(currentData)
  }
  // return to 0
  for (let i = 0; i < 10; ++i) {
    points.push(currentData)
  }
  return points
}
