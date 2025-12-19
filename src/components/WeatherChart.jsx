import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function WeatherChart({ hourly = [], daily = [] }){
  const labels = hourly.map(h=> new Date(h.dt*1000).getHours() + ':00')
  const temps = hourly.map(h=> h.temp)

  const data = {
    labels,
    datasets: [
      {
        label: 'Temp (°C)',
        data: temps,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.3,
        fill: true,
      }
    ]
  }

  return (
    <div className="card">
      <h3 className="font-medium mb-3">Hourly Temperature</h3>
      <Line data={data} />
    </div>
  )
}
