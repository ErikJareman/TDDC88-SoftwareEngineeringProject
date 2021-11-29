/**
 * Component to render ecg-chart for a patient
 *
 * Created 2021-11-28
 *
 * David Råsberg
 *
 */

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import generateSegment from './PatientEkgSegment'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  elements: {
    point: {
      radius: 0
    }
  },
  maintainAspectRatio: false,

  interaction: {
    mode: 'index',
    intersect: false
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
      text: 'Patient EKG'
    },
    datalabels: {
      display: false
    },
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      max: 100,
      min: -40,
      ticks: {
        display: false,
        stepSize: 2
      }
    }/* ,
    x: {
      type: 'linear',
      display: true,
      ticks: {
        display: false
      }
    } */

  }
}

function generateEkg () {
  const data = []
  for (let i = 0; i < 10; ++i) {
    data.push(...generateSegment())
  }
  return data
}

export const data = {
  labels: new Array(2500).fill(''),
  datasets: [
    {
      label: 'Normal Ekg',
      data: generateEkg(),
      borderColor: 'rgb(60, 10, 10)',
      borderWidth: 1,
      yAxisID: 'y'
    }
  ]
}

export default function PatientEkgChart () {
  return <Line options={options} data={data} />
}
