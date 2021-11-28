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
  responsive: true,
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
      ticks: {
        display: false
      }
    }
    /* x: {
      type: 'linear',
      display: true,
      ticks: {
        display: false
      }
    } */

  }
}

// const labels = ['', '', '', '', '', '', '']

function generateEkg () {
  const data = []
  for (let i = 0; i < 100; ++i) {
    data.push(...generateSegment())
  }
  return data
}

export const data = {
  labels: new Array(500).fill(''),
  datasets: [
    {
      label: 'Normal Ekg',
      data: generateEkg(),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y'
    }
  ]
}

export default function PatientEkgChart () {
  return <Line options={options} data={data} />
}
