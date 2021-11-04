export default function useTemporaryData () {
  const timespan =
    {
      start: '13:10',
      end: '17:00'
    }

  const events = [
    {
      name: 'Dosering',
      time: '13:38'
    },
    {
      name: 'Skickat',
      time: '15:10'
    },
    {
      name: 'Vård',
      time: '15:40'
    },
    {
      name: 'Svar',
      time: '16:40'
    }
  ]
  return { timespan, events }
}
