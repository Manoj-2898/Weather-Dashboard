import React, { useState, useEffect, useRef } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast'
import WeatherChart from './components/WeatherChart'
import MapView from './components/MapView'
import { fetchWeatherByCity, fetchWeatherByCoords } from './services/weatherApi'

export default function App() {
  const [city, setCity] = useState('Delhi')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dark, setDark] = useState(false)

  // Prevent double API calls in React StrictMode
  const loadedRef = useRef(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true
    loadCity(city)
  }, [])

  async function loadCity(q) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetchWeatherByCity(q)
      setData(res)
      setCity(q)

      // Save recent searches
      const recents = JSON.parse(localStorage.getItem('recents') || '[]')
      localStorage.setItem(
        'recents',
        JSON.stringify([q, ...recents.filter(r => r !== q)].slice(0, 6))
      )
    } catch (err) {
      setError('❌ City not found or API error')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  async function loadWeatherByCoords(lat, lon) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetchWeatherByCoords(lat, lon)
      setData(res)
      setCity(res.location.name)
    } catch (err) {
      setError('❌ Failed to fetch weather for this location')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">🌤️ Weather Dashboard</h1>

          <button
            onClick={() => setDark(d => !d)}
            className="px-4 py-2 card"
          >
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        {/* Search */}
        <SearchBar onSearch={loadCity} />

        {/* Status */}
        {loading && <div className="mt-6 card">Loading weather data...</div>}

        {error && (
          <div className="mt-6 card text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* Weather Data */}
        {data && (
          <main className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left */}
            <div className="md:col-span-2 space-y-4">
              <WeatherCard data={data.current} location={data.location} />
              <WeatherChart hourly={data.hourly} />
              <Forecast daily={data.daily} />
            </div>

            {/* Right */}
            <div className="space-y-4">
              <MapView
                coords={data.location.coord}
                onLocationClick={loadWeatherByCoords}
              />

              <div className="card">
                <h3 className="font-medium mb-2">Recent Searches</h3>
                <RecentList onPick={loadCity} />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}

/* ------------------ Recent Searches ------------------ */

function RecentList({ onPick }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem('recents')) || [])
    } catch {
      setItems([])
    }
  }, [])

  if (items.length === 0) {
    return <div className="text-sm text-gray-500">No recent searches</div>
  }

  return (
    <ul className="space-y-2">
      {items.map(city => (
        <li key={city}>
          <button
            onClick={() => onPick(city)}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {city}
          </button>
        </li>
      ))}
    </ul>
  )
}
