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
  for (let i = 0; i < 10; ++i) {
    points.push(++currentData)
  }
  for (let i = 0; i < 10; ++i) {
    points.push(--currentData)
  }

  for (let i = 0; i < 10; ++i) {
    points.push(currentData)
  }
  for (let i = 0; i < 5; ++i) {
    currentData = currentData - 2
    points.push(currentData)
  }
  for (let i = 0; i < 7; ++i) {
    currentData = currentData + 18
    points.push(currentData)
  }
  for (let i = 0; i < 8; ++i) {
    currentData = currentData - 17
    points.push(currentData)
  }
  for (let i = 0; i < 8; ++i) {
    currentData = currentData + 2
    points.push(currentData)
  }
  for (let i = 0; i < 2; ++i) {
    currentData = currentData + 2
    points.push(currentData)
  }
  for (let i = 0; i < 10; ++i) {
    points.push(currentData)
  }
  for (let i = 0; i < 10; ++i) {
    currentData += 1.5
    points.push(currentData)
  }
  for (let i = 0; i < 10; ++i) {
    currentData -= 1.5
    points.push(currentData)
  }
  for (let i = 0; i < 10; ++i) {
    points.push(currentData)
  }
  return points
}
