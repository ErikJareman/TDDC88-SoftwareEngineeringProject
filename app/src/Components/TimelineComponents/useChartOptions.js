export default function useChartOptions (reloadOnZoom) {
  const options = {
    plugins: {
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
      x: { // offset=true gives spacing on side, but also does not disp. time at ends
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm'
          }
        },
        grid: {
          display: true // false = hide gridlines x
        }
      },
      y: {
        display: false, // hide gridlines & axis y
        beginAtZero: true,
        steps: 5,
        stepValue: 1,
        max: 4.3,
        min: 0.2
      }
    }
  }
  return { options }
}
