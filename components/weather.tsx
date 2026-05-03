'use client'

import { useEffect, useState } from 'react'
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  Thermometer,
  CloudSun,
  Moon,
  CloudMoon,
} from 'lucide-react'

interface WeatherData {
  current: {
    temperature: number
    feelsLike?: number
    weatherCode: number
    humidity: number
    windSpeed: number
    pressure?: number
    uvIndex?: number
    sunrise?: string
    sunset?: string
    isDay: boolean
  }
  nextHour: {
    temperature: number
    weatherCode: number
    precipitation: number
    humidity?: number
    windSpeed?: number
    feelsLike?: number
  }
  nextDay: {
    tempMax: number
    tempMin: number
    weatherCode: number
    precipitationSum: number
    sunrise?: string
    sunset?: string
    humidity?: number
    windSpeed?: number
  }
  location: string
}

const getWeatherInfo = (
  code: number,
  isDay: boolean = true
): { description: string; Icon: React.ElementType } => {
  const weatherMap: Record<
    number,
    { description: string; IconDay: React.ElementType; IconNight: React.ElementType }
  > = {
    0: { description: 'Clear sky', IconDay: Sun, IconNight: Moon },
    1: { description: 'Mainly clear', IconDay: Sun, IconNight: Moon },
    2: { description: 'Partly cloudy', IconDay: CloudSun, IconNight: CloudMoon },
    3: { description: 'Overcast', IconDay: Cloud, IconNight: Cloud },
    45: { description: 'Foggy', IconDay: CloudFog, IconNight: CloudFog },
    48: { description: 'Rime fog', IconDay: CloudFog, IconNight: CloudFog },
    51: { description: 'Light drizzle', IconDay: CloudRain, IconNight: CloudRain },
    53: { description: 'Drizzle', IconDay: CloudRain, IconNight: CloudRain },
    55: { description: 'Heavy drizzle', IconDay: CloudRain, IconNight: CloudRain },
    56: { description: 'Freezing drizzle', IconDay: CloudSnow, IconNight: CloudSnow },
    57: { description: 'Heavy freezing drizzle', IconDay: CloudSnow, IconNight: CloudSnow },
    61: { description: 'Light rain', IconDay: CloudRain, IconNight: CloudRain },
    63: { description: 'Rain', IconDay: CloudRain, IconNight: CloudRain },
    65: { description: 'Heavy rain', IconDay: CloudRain, IconNight: CloudRain },
    66: { description: 'Freezing rain', IconDay: CloudSnow, IconNight: CloudSnow },
    67: { description: 'Heavy freezing rain', IconDay: CloudSnow, IconNight: CloudSnow },
    71: { description: 'Light snow', IconDay: CloudSnow, IconNight: CloudSnow },
    73: { description: 'Snow', IconDay: CloudSnow, IconNight: CloudSnow },
    75: { description: 'Heavy snow', IconDay: CloudSnow, IconNight: CloudSnow },
    77: { description: 'Snow grains', IconDay: CloudSnow, IconNight: CloudSnow },
    80: { description: 'Light showers', IconDay: CloudRain, IconNight: CloudRain },
    81: { description: 'Showers', IconDay: CloudRain, IconNight: CloudRain },
    82: { description: 'Heavy showers', IconDay: CloudRain, IconNight: CloudRain },
    85: { description: 'Light snow showers', IconDay: CloudSnow, IconNight: CloudSnow },
    86: { description: 'Heavy snow showers', IconDay: CloudSnow, IconNight: CloudSnow },
    95: { description: 'Thunderstorm', IconDay: CloudLightning, IconNight: CloudLightning },
    96: { description: 'Thunderstorm with hail', IconDay: CloudLightning, IconNight: CloudLightning },
    99: { description: 'Thunderstorm with heavy hail', IconDay: CloudLightning, IconNight: CloudLightning },
  }
  const weather = weatherMap[code] || { description: 'Unknown', IconDay: Cloud, IconNight: Cloud }
  return { description: weather.description, Icon: isDay ? weather.IconDay : weather.IconNight }
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const latitude = 52.2053
      const longitude = 0.1218
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure,uv_index,is_day` +
            `&hourly=temperature_2m,apparent_temperature,weather_code,precipitation_probability,relative_humidity_2m,wind_speed_10m` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,wind_speed_10m_max,uv_index_max,relative_humidity_2m_max` +
            `&timezone=auto&forecast_days=2`
        )
        if (!response.ok) throw new Error('Failed to fetch weather')
        const data = await response.json()
        const now = new Date()
        const nextHourTime = new Date(now.getTime() + 60 * 60 * 1000)
        const nextHourIndex = data.hourly.time.findIndex(
          (time: string) => new Date(time) >= nextHourTime
        )
        setWeather({
          current: {
            temperature: Math.round(data.current.temperature_2m),
            feelsLike: data.current.apparent_temperature
              ? Math.round(data.current.apparent_temperature)
              : undefined,
            weatherCode: data.current.weather_code,
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            pressure: data.current.surface_pressure
              ? Math.round(data.current.surface_pressure)
              : undefined,
            uvIndex: data.current.uv_index ? Math.round(data.current.uv_index) : undefined,
            sunrise: data.daily.sunrise ? data.daily.sunrise[0] : undefined,
            sunset: data.daily.sunset ? data.daily.sunset[0] : undefined,
            isDay: data.current.is_day === 1,
          },
          nextHour: {
            temperature: Math.round(
              data.hourly.temperature_2m[nextHourIndex] || data.hourly.temperature_2m[1]
            ),
            weatherCode:
              data.hourly.weather_code[nextHourIndex] || data.hourly.weather_code[1],
            precipitation: data.hourly.precipitation_probability[nextHourIndex] || 0,
            humidity: data.hourly.relative_humidity_2m
              ? Math.round(data.hourly.relative_humidity_2m[nextHourIndex])
              : undefined,
            windSpeed: data.hourly.wind_speed_10m
              ? Math.round(data.hourly.wind_speed_10m[nextHourIndex])
              : undefined,
            feelsLike: data.hourly.apparent_temperature
              ? Math.round(data.hourly.apparent_temperature[nextHourIndex])
              : undefined,
          },
          nextDay: {
            tempMax: Math.round(data.daily.temperature_2m_max[1]),
            tempMin: Math.round(data.daily.temperature_2m_min[1]),
            weatherCode: data.daily.weather_code[1],
            precipitationSum: data.daily.precipitation_sum[1] || 0,
            sunrise: data.daily.sunrise ? data.daily.sunrise[1] : undefined,
            sunset: data.daily.sunset ? data.daily.sunset[1] : undefined,
            humidity: data.daily.relative_humidity_2m_max
              ? Math.round(data.daily.relative_humidity_2m_max[1])
              : undefined,
            windSpeed: data.daily.wind_speed_10m_max
              ? Math.round(data.daily.wind_speed_10m_max[1])
              : undefined,
          },
          location: 'UK',
        })
        setLoading(false)
      } catch (err) {
        console.error('Weather fetch error:', err)
        setError('Failed to load weather')
        setLoading(false)
      }
    }
    fetchWeather()
    const interval = setInterval(fetchWeather, 600000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div
        className="p-5 rounded-2xl animate-pulse"
        style={{ background: '#161412', border: '1px solid rgba(255,255,255,0.055)' }}
      >
        <div className="h-2 w-24 rounded mb-4" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="space-y-2">
            <div className="h-7 rounded w-16" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="h-3 rounded w-24" style={{ background: 'rgba(255,255,255,0.04)' }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-16 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }} />
          <div className="h-16 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }} />
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div
        className="p-5 rounded-2xl flex items-center gap-3"
        style={{ background: '#161412', border: '1px solid rgba(255,255,255,0.055)', color: '#4a4540' }}
      >
        <Cloud className="w-5 h-5" />
        <span className="text-sm">Weather unavailable</span>
      </div>
    )
  }

  const currentWeather = getWeatherInfo(weather.current.weatherCode, weather.current.isDay)
  const nextHourWeather = getWeatherInfo(weather.nextHour.weatherCode, weather.current.isDay)
  const nextDayWeather = getWeatherInfo(weather.nextDay.weatherCode, true)

  return (
    <div
      className="p-5 rounded-2xl transition-all duration-200"
      style={{ background: '#161412', border: '1px solid rgba(255,255,255,0.055)' }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,148,90,0.25)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.055)')
      }
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-4">
        <p
          className="text-[10px] tracking-[0.2em] uppercase font-medium"
          style={{ color: '#4a4540' }}
        >
          Weather near me
        </p>
        <span className="text-[10px] font-code" style={{ color: '#4a4540' }}>
          {weather.location}
        </span>
      </div>

      {/* Main temp display */}
      <div className="flex items-center gap-4 mb-4">
        <currentWeather.Icon className="w-11 h-11" style={{ color: '#e8945a' }} />
        <div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-4xl leading-none"
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: '#ede8e3',
                fontWeight: 400,
              }}
            >
              {weather.current.temperature}
            </span>
            <span className="text-lg" style={{ color: '#6b6560' }}>
              °C
            </span>
          </div>
          <p className="text-sm mt-0.5" style={{ color: '#8a8078' }}>
            {currentWeather.description}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="flex flex-wrap gap-x-4 gap-y-1 mb-4 font-code"
        style={{ fontSize: '11px', color: '#4a4540' }}
      >
        <span className="flex items-center gap-1">
          <Droplets className="w-3 h-3" />
          {weather.current.humidity}%
        </span>
        <span className="flex items-center gap-1">
          <Wind className="w-3 h-3" />
          {weather.current.windSpeed} km/h
        </span>
        {weather.current.feelsLike !== undefined && (
          <span className="flex items-center gap-1">
            <Thermometer className="w-3 h-3" />
            Feels {weather.current.feelsLike}°C
          </span>
        )}
        {weather.current.uvIndex !== undefined && (
          <span>UV {weather.current.uvIndex}</span>
        )}
      </div>

      {/* Forecast grid */}
      <div className="grid grid-cols-2 gap-2">
        <div
          className="p-3 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] uppercase tracking-wider"
              style={{ color: '#4a4540' }}
            >
              Next Hour
            </span>
            <nextHourWeather.Icon className="w-3.5 h-3.5" style={{ color: '#8a8078' }} />
          </div>
          <span
            className="text-xl font-medium"
            style={{ color: '#ede8e3' }}
          >
            {weather.nextHour.temperature}°
          </span>
          {weather.nextHour.precipitation > 0 && (
            <p className="text-[10px] mt-1 font-code" style={{ color: '#4a4540' }}>
              {weather.nextHour.precipitation}% rain
            </p>
          )}
        </div>

        <div
          className="p-3 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] uppercase tracking-wider"
              style={{ color: '#4a4540' }}
            >
              Tomorrow
            </span>
            <nextDayWeather.Icon className="w-3.5 h-3.5" style={{ color: '#8a8078' }} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-medium" style={{ color: '#ede8e3' }}>
              {weather.nextDay.tempMax}°
            </span>
            <span className="text-sm" style={{ color: '#4a4540' }}>
              {weather.nextDay.tempMin}°
            </span>
          </div>
          {weather.nextDay.precipitationSum > 0 && (
            <p className="text-[10px] mt-1 font-code" style={{ color: '#4a4540' }}>
              {weather.nextDay.precipitationSum.toFixed(1)}mm
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
