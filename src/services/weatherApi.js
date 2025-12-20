import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE = 'https://api.openweathermap.org/data/2.5'

// ❌ DO NOT crash the app in production
if (!API_KEY) {
  console.error('OpenWeather API key missing');
  throw new Error('❌ OpenWeather API key missing in .env file');
}

export async function fetchWeatherByCity(city) {
  const res = await axios.get(`${BASE}/weather`, {
    params: {
      q: city,
      appid: API_KEY
    }
  })

  if (!res.data || !res.data.coord) {
    throw new Error('City not found')
  }

  const { lat, lon } = res.data.coord
  return fetchWeatherByCoords(lat, lon)
}

export async function fetchWeatherByCoords(lat, lon) {
  const res = await axios.get(`${BASE}/forecast`, {
    params: {
      lat,
      lon,
      appid: API_KEY
    }
  })

  const list = res.data.list

  return {
    location: {
      coord: { lat, lon },
      name: res.data.city.name,
      country: res.data.city.country
    },
    current: {
      temp: Math.round(list[0].main.temp - 273.15),
      weather: list[0].weather[0],
      humidity: list[0].main.humidity,
      wind_speed: list[0].wind.speed,
      pressure: list[0].main.pressure
    },
    hourly: list.slice(0, 8).map(h => ({
      dt: h.dt,
      temp: Math.round(h.main.temp - 273.15),
      pop: h.pop
    })),
    daily: []
  }
}
