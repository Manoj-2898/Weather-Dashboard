import axios from 'axios'
import { reverseGeocode, getPlaceHierarchy, getCountryCodeFromCoordinates } from './geolocation'

const API_KEY =  process.env.REACT_APP_WEATHER_API_KEY
;
const BASE = 'https://api.openweathermap.org/data/2.5'

if (!API_KEY) {
  throw new Error('❌ OpenWeather API key missing in .env file')
}

function toCelsius(k) {
  return Math.round(k - 273.15)
}

export async function fetchWeatherByCity(city) {
  const res = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY
      }
    }
  )

  if (!res.data || !res.data.coord) {
    throw new Error('City not found')
  }

  const { lat, lon } = res.data.coord
  return fetchWeatherByCoords(lat, lon)
}


export async function fetchWeatherByCoords(lat, lon) {
  const res = await axios.get(
    'https://api.openweathermap.org/data/2.5/forecast',
    {
      params: {
        lat,
        lon,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY
      }
    }
  )

  console.log('FORECAST API OK')

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

