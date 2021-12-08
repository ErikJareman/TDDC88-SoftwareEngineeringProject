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
        // label: {type, Short Desc., Category}
        label: ['Patient Inkommen', 'Ankomst', 'Gubbe'],
        pointStyle: getImg('Inlagd'),
        data: []
      },
      {
        label: ['Patient Inkommen', 'Ankomst', 'Ambulans'],
        pointStyle: getImg('Ambulans'),
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
        label: ['Skickat Blodprov', 'Skickat', 'Pippett'],
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
        label: ['Skickat Rontgen remiss', 'Röntgen', 'Doktor'],
        pointStyle: getImg('Vård'),
        data: []
      },
      { 
        // dataset for all non-event datapoints
        pointStyle: ['triangle'],
        pointRadius: 6,
        pointHoverRadius: 7,
        data: [],
        backgroundColor: ['#0042ac', '#ffffff00', '#ffffff00'],
        borderColor: ['#0042ac', '#ffffff00', '#ffffff00']
      }
    ]
  }
  return { datasetStructure }
}
