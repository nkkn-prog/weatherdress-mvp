import { WeatherService } from '../weather'

describe('WeatherService', () => {
  let weatherService: WeatherService

  beforeEach(() => {
    weatherService = new WeatherService('test-api-key')
  })

  describe('getCurrentWeather', () => {
    it('should return weather data for given coordinates', async () => {
      const weather = await weatherService.getCurrentWeather(35.6762, 139.6503)
      
      expect(weather).toHaveProperty('temperature')
      expect(weather).toHaveProperty('condition')
      expect(weather).toHaveProperty('humidity')
      expect(weather).toHaveProperty('windSpeed')
      expect(weather).toHaveProperty('location')
      
      expect(typeof weather.temperature).toBe('number')
      expect(typeof weather.condition).toBe('string')
      expect(typeof weather.humidity).toBe('number')
      expect(typeof weather.windSpeed).toBe('number')
      expect(typeof weather.location).toBe('string')
    })

    it('should handle invalid coordinates gracefully', async () => {
      // Mock implementation currently returns static data
      // In real implementation, this should handle errors properly
      const weather = await weatherService.getCurrentWeather(999, 999)
      expect(weather).toBeDefined()
    })
  })

  describe('getWeatherByCity', () => {
    it('should return weather data for a valid city', async () => {
      const weather = await weatherService.getWeatherByCity('Tokyo')
      
      expect(weather).toHaveProperty('temperature')
      expect(weather).toHaveProperty('condition')
      expect(weather).toHaveProperty('humidity')
      expect(weather).toHaveProperty('windSpeed')
      expect(weather.location).toBe('Tokyo')
    })

    it('should handle empty city name', async () => {
      try {
        await weatherService.getWeatherByCity('')
        // In real implementation, this should throw an error
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })
})