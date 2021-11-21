/**
 * useDatasetStructure.js
 *
 * Returns the dataset structure to be used by the timeline.
 * Also handles the icon- and event name selection for displayed events.
 *
 * function useDatasetStructure - Erik Jareman - FINAL
 */

import useIconSelector from './useIconSelector'

const { getImg } = useIconSelector()
export default function useDatasetStructure () {
  const datasetStructure = {
    datasets: [
      {
        label: ['Patient Inlagd', 'Ankomst', 'Gubbe'], // {type, Short Desc., Category}
        pointStyle: getImg('Inlagd'),
        data: []
      },
      {
        label: ['Patient Inlagd', 'Ankomst', 'Ambulans'],
        pointStyle: getImg('Inlagd'),
        data: []
      },
      {
        label: ['Dosering', 'Dos', 'Medkit'],
        pointStyle: getImg('Dos'),
        data: []
      },
      {
        label: ['Patient Lamnar', 'Hem', 'Hus'],
        pointStyle: getImg('Hem'),
        data: []
      },
      {
        label: ['Omvardnad', 'Vård', 'Doktor'],
        pointStyle: getImg('Vård'),
        data: []
      },
      {
        label: ['Skickat Blodprov', 'Skickat', 'Pippett'], // finns ej i backend (?)
        pointStyle: getImg('Skickat'),
        data: []
      },
      {
        label: ['Labbsvar Blodprov', 'Svar', 'Pippett'],
        pointStyle: getImg('Svar1'),
        data: []
      },
      {
        label: ['Skickat EKG', 'Skickat', 'Heartbeat'],
        pointStyle: getImg('Svar2'),
        data: []
      },
      {
        label: ['Labbsvar EKG', 'Svar', 'Heartbeat'],
        pointStyle: getImg('Svar2'),
        data: []
      },
      {
        label: ['Skickat Röntgen remiss', 'Röntgen', 'Doktor'],
        pointStyle: getImg('Vård'),
        data: []
      },
      { // dataset for all non-event datapoints
        pointStyle: ['triangle'],
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
