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
      time: '11:58'
    },
    {
      name: 'Dos',
      time: '12:13'
    },
    {
      name: 'Skickat',
      time: '12:14'
    },
    {
      name: 'Vård',
      time: '13:00'
    },
    {
      name: 'Svar1',
      time: '13:09'
    },
    {
      name: 'Dos',
      time: '13:18'
    },
    {
      name: 'Vård',
      time: '13:19'
    },
    {
      name: 'Svar2',
      time: '13:52'
    },
    {
      name: 'Hem',
      time: '14:00'
    }
  ]
  return { events }
}
