import React from 'react'

function formatDay(unix) {
  return new Date(unix * 1000).toLocaleDateString(undefined, {
    weekday: 'short'
  })
}

export default function Forecast({ daily }) {
  if (!daily || daily.length === 0) return null

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">7-Day Forecast</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {daily.map((d, i) => {
          const weather = Array.isArray(d.weather)
            ? d.weather[0]
            : d.weather

          const icon = weather?.icon || '01d'

          return (
            <div
              key={i}
              className="flex flex-col items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <span className="text-sm font-medium">
                {formatDay(d.dt)}
              </span>

              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={weather?.description || 'weather'}
                className="w-12 h-12"
              />

              <span className="text-sm">
                {Math.round(d.temp.max)}° / {Math.round(d.temp.min)}°
              </span>

              <span className="text-xs text-gray-500 capitalize">
                {weather?.description}
              </span>

              {typeof d.pop === 'number' && (
                <span className="text-xs text-blue-500">
                  🌧️ {Math.round(d.pop * 100)}%
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
