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
      name: 'Prov',
      time: '15:10'
    },
    {
      name: 'Skickat',
      time: '15:14'
    },
    {
      name: 'Vård',
      time: '15:20'
    },
    {
      name: 'Snacks',
      time: '15:23'
    },
    {
      name: 'Svar',
      time: '16:40'
    }
  ]
  return { timespan, events }
}
