import React from 'react'

export default function WeatherCard({ data, location }){
  if(!data) return null
  const icon = data.weather.icon || '01d'
  
  // Build location hierarchy string
  const admin = location.admin || {}
  const hierarchy = [
    admin.village,
    admin.district,
    admin.city,
    admin.state,
    admin.country
  ].filter(Boolean).join(', ')
  
  return (
    <div className="card flex items-center gap-4">
      <div>
        <img alt="weather" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold">{location.name}, {location.country}</h2>
        {hierarchy && <div className="text-xs text-gray-500 dark:text-gray-400">{hierarchy}</div>}
        <div className="text-4xl font-bold">{data.temp}°C</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{data.weather.main} — {data.weather.description}</div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Humidity: {data.humidity}% • Wind: {data.wind_speed} m/s • Pressure: {data.pressure} hPa</div>
      </div>
    </div>
  )
}
