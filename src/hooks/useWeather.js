import { useState, useEffect } from 'react'
import { fetchWeatherByCity } from '../services/weatherApi'

export default function useWeather(initialCity='London'){
  const [city, setCity] = useState(initialCity)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{ load(city) }, [])

  async function load(q){
    setLoading(true); setError(null)
    try{
      const res = await fetchWeatherByCity(q)
      setData(res)
    }catch(err){ setError(err.message || 'Failed') }
    finally{ setLoading(false) }
  }

  return { city, setCity, data, loading, error, load }
}
