/**
 * useChartOptions.js
 *
 * Returns all options needed for the timeline chart (timeline component)
 *
 * function useChartOptions - Erik Jareman - FINAL
 */

export default function useChartOptions (reloadOnZoom) {
  const options = {
    plugins: {
      tooltip: {
        enabled: false
      },
      datalabels: {
        textAlign: 'center',
        anchor: 'start',
        align: '90',
        padding: {
          top: 14
        },
        font: {
          lineHeight: 1.1
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x'
        },
        zoom: {
          onZoomComplete: reloadOnZoom,
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'x'
        }
      },
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm'
          }
        },
        grid: {
          display: true
        }
      },
      y: {
        display: false,
        beginAtZero: true,
        steps: 5,
        stepValue: 1,
        max: 4.4,
        min: 0.2
      }
    }
  }
  return { options }
}
