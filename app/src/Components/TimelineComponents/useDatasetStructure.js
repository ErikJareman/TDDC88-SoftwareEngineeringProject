import useIconSelector from './useIconSelector'

const { getImg } = useIconSelector()

export default function useDatasetStructure () {
  const datasetStructure = {
    datasets: [
      {
        label: 'Inlagd',
        pointStyle: getImg('Inlagd'),
        data: []
      },
      {
        label: 'Dos',
        pointStyle: getImg('Dos'),
        data: []
      },
      {
        label: 'Hem',
        pointStyle: getImg('Hem'),
        data: []
      },
      {
        label: 'Vård',
        pointStyle: getImg('Vård'),
        data: []
      },
      {
        label: 'Skickat',
        pointStyle: getImg('Skickat'),
        data: []
      },
      {
        label: 'Svar1',
        pointStyle: getImg('Svar1'),
        data: []
      },
      {
        label: 'Svar2',
        pointStyle: getImg('Svar2'),
        data: []
      },
      { // dataset for all non-event datapoints
        pointStyle: 'triangle',
        pointRadius: 6,
        pointHoverRadius: 7,
        data: [],
        backgroundColor: ['red', '#ffffff00', '#ffffff00'],
        borderColor: ['red', '#ffffff00', '#ffffff00']
      }
    ]
  }
  return { datasetStructure }
}
