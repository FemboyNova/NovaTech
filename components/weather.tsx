'use client'

import { useEffect, useState } from 'react'
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind, Droplets, Thermometer, CloudSun, Moon, CloudMoon } from 'lucide-react'

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

// Weather code to description and icon mapping
const getWeatherInfo = (code: number, isDay: boolean = true): { description: string; Icon: React.ElementType } => {
  // WMO Weather interpretation codes
  const weatherMap: Record<number, { description: string; IconDay: React.ElementType; IconNight: React.ElementType }> = {
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
  return {
    description: weather.description,
    Icon: isDay ? weather.IconDay : weather.IconNight
  }
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      // Cambridge, UK coordinates
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
        
        // Find next hour index
        const now = new Date()
        const nextHourTime = new Date(now.getTime() + 60 * 60 * 1000)
        const nextHourIndex = data.hourly.time.findIndex((time: string) => {
          const t = new Date(time)
          return t >= nextHourTime
        })
        
        setWeather({
          current: {
            temperature: Math.round(data.current.temperature_2m),
            feelsLike: data.current.apparent_temperature ? Math.round(data.current.apparent_temperature) : undefined,
            weatherCode: data.current.weather_code,
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            pressure: data.current.surface_pressure ? Math.round(data.current.surface_pressure) : undefined,
            uvIndex: data.current.uv_index ? Math.round(data.current.uv_index) : undefined,
            sunrise: data.daily.sunrise ? data.daily.sunrise[0] : undefined,
            sunset: data.daily.sunset ? data.daily.sunset[0] : undefined,
            isDay: data.current.is_day === 1,
          },
          nextHour: {
            temperature: Math.round(data.hourly.temperature_2m[nextHourIndex] || data.hourly.temperature_2m[1]),
            weatherCode: data.hourly.weather_code[nextHourIndex] || data.hourly.weather_code[1],
            precipitation: data.hourly.precipitation_probability[nextHourIndex] || 0,
            humidity: data.hourly.relative_humidity_2m ? Math.round(data.hourly.relative_humidity_2m[nextHourIndex]) : undefined,
            windSpeed: data.hourly.wind_speed_10m ? Math.round(data.hourly.wind_speed_10m[nextHourIndex]) : undefined,
            feelsLike: data.hourly.apparent_temperature ? Math.round(data.hourly.apparent_temperature[nextHourIndex]) : undefined,
          },
          nextDay: {
            tempMax: Math.round(data.daily.temperature_2m_max[1]),
            tempMin: Math.round(data.daily.temperature_2m_min[1]),
            weatherCode: data.daily.weather_code[1],
            precipitationSum: data.daily.precipitation_sum[1] || 0,
            sunrise: data.daily.sunrise ? data.daily.sunrise[1] : undefined,
            sunset: data.daily.sunset ? data.daily.sunset[1] : undefined,
            humidity: data.daily.relative_humidity_2m_max ? Math.round(data.daily.relative_humidity_2m_max[1]) : undefined,
            windSpeed: data.daily.wind_speed_10m_max ? Math.round(data.daily.wind_speed_10m_max[1]) : undefined,
          },
          location: 'Uk',
        })
        setLoading(false)
      } catch (err) {
        console.error('Weather fetch error:', err)
        setError('Failed to load weather')
        setLoading(false)
      }
    }

    fetchWeather()

    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 600000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10" />
            <div className="space-y-2">
              <div className="h-6 bg-white/10 rounded w-16" />
              <div className="h-3 bg-white/10 rounded w-24" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-white/10 rounded-xl" />
            <div className="h-16 bg-white/10 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10">
        <div className="flex items-center gap-3 text-zinc-400">
          <Cloud className="w-8 h-8" />
          <span className="text-sm">Weather unavailable</span>
        </div>
      </div>
    )
  }

  const currentWeather = getWeatherInfo(weather.current.weatherCode, weather.current.isDay)
  const nextHourWeather = getWeatherInfo(weather.nextHour.weatherCode, weather.current.isDay)
  const nextDayWeather = getWeatherInfo(weather.nextDay.weatherCode, true)

  return (
    <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 group">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-blue-500/5 opacity-50" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-sky-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Weather near me</span>
            </div>
            <span className="text-xs text-zinc-500">{weather.location}</span>
        </div>

        {/* Current Weather */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <currentWeather.Icon className="w-14 h-14 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{weather.current.temperature}</span>
              <span className="text-xl text-zinc-400">°C</span>
            </div>
            <p className="text-sm text-zinc-400">{currentWeather.description}</p>
          </div>
        </div>

        {/* Current Stats */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            <span>{weather.current.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3" />
            <span>{weather.current.windSpeed} km/h</span>
          </div>
          {weather.current.feelsLike !== undefined && (
            <div className="flex items-center gap-1">
              <Thermometer className="w-3 h-3" />
              <span>Feels like {weather.current.feelsLike}°C</span>
            </div>
          )}
          {weather.current.pressure !== undefined && (
            <div className="flex items-center gap-1">
              <span>Pressure {weather.current.pressure} hPa</span>
            </div>
          )}
          {weather.current.uvIndex !== undefined && (
            <div className="flex items-center gap-1">
              <span>UV {weather.current.uvIndex}</span>
            </div>
          )}
          {weather.current.sunrise && (
            <div className="flex items-center gap-1">
              <span>Sunrise {new Date(weather.current.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          )}
          {weather.current.sunset && (
            <div className="flex items-center gap-1">
              <span>Sunset {new Date(weather.current.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          )}
        </div>

        {/* Forecast Grid */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          {/* Next Hour */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-sky-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">Next Hour</span>
              <nextHourWeather.Icon className="w-4 h-4 text-sky-300" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-white">{weather.nextHour.temperature}°</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-400 mt-1">
              {weather.nextHour.feelsLike !== undefined && <span>Feels like {weather.nextHour.feelsLike}°C</span>}
              {weather.nextHour.humidity !== undefined && <span>Humidity {weather.nextHour.humidity}%</span>}
              {weather.nextHour.windSpeed !== undefined && <span>Wind {weather.nextHour.windSpeed} km/h</span>}
              {weather.nextHour.precipitation > 0 && (
                <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-sky-400" />{weather.nextHour.precipitation}%</span>
              )}
            </div>
          </div>

          {/* Tomorrow */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-sky-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">Tomorrow</span>
              <nextDayWeather.Icon className="w-4 h-4 text-sky-300" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-white">{weather.nextDay.tempMax}°</span>
              <span className="text-sm text-zinc-500">{weather.nextDay.tempMin}°</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-400 mt-1">
              {weather.nextDay.humidity !== undefined && <span>Humidity {weather.nextDay.humidity}%</span>}
              {weather.nextDay.windSpeed !== undefined && <span>Wind {weather.nextDay.windSpeed} km/h</span>}
              {weather.nextDay.sunrise && <span>Sunrise {new Date(weather.nextDay.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
              {weather.nextDay.sunset && <span>Sunset {new Date(weather.nextDay.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
              {weather.nextDay.precipitationSum > 0 && (
                <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-sky-400" />{weather.nextDay.precipitationSum.toFixed(1)}mm</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
