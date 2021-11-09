/**
 * useTemporaryData.js
 *
 * function useTemporaryData() - Erik Jareman - DRAFT
 *
 * this file contains fake data used in the timeline
 * will be removed once backend exists
 */

export default function useTemporaryData () {
  const timespan =
    {
      start: '13:10',
      end: '19:00'
    }

  const events = [
    {
      name: 'Inlagd',
      time: '13:00'
    },
    {
      name: 'Dos',
      time: '13:28'
    },
    {
      name: 'Vård',
      time: '15:03'
    },
    {
      name: 'Skickat',
      time: '15:07'
    },
    {
      name: 'Svar1',
      time: '16:33'
    },
    {
      name: 'Dos',
      time: '16:34'
    },
    {
      name: 'Vård',
      time: '16:35'
    },
    {
      name: 'Svar2',
      time: '16:50'
    },
    {
      name: 'Hem',
      time: '18:00'
    }
  ]
  return { timespan, events }
}
