/**
 * useTemporaryData.js
 *
 * function useTemporaryData() - Erik Jareman - DRAFT
 *
 * this file contains fake data used in the timeline
 * will be removed once backend exists
 */

export default function useTemporaryData () {
  const events = [
    {
      name: 'Inlagd',
      time: '08:58'
    },
    {
      name: 'Dos',
      time: '09:13'
    },
    {
      name: 'Skickat',
      time: '09:14'
    },
    {
      name: 'Vård',
      time: '10:00'
    },
    {
      name: 'Svar1',
      time: '10:09'
    },
    {
      name: 'Dos',
      time: '10:18'
    },
    {
      name: 'Vård',
      time: '10:19'
    },
    {
      name: 'Svar2',
      time: '10:52'
    },
    {
      name: 'Hem',
      time: '11:00'
    }
  ]
  return { events }
}
