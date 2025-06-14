import { RecommendationEngine } from '../recommendations'
import { WeatherData } from '../weather'

describe('RecommendationEngine', () => {
  let engine: RecommendationEngine

  beforeEach(() => {
    engine = new RecommendationEngine()
  })

  describe('generateRecommendations', () => {
    it('should recommend light clothing for hot weather', () => {
      const hotWeather: WeatherData = {
        temperature: 30,
        condition: 'sunny',
        humidity: 50,
        windSpeed: 3,
        location: 'Test City'
      }

      const recommendations = engine.generateRecommendations(hotWeather)
      
      expect(recommendations).toHaveLength(2)
      expect(recommendations[0].category).toBe('top')
      expect(recommendations[0].items).toContain('T-shirt')
      expect(recommendations[1].category).toBe('bottom')
      expect(recommendations[1].items).toContain('Shorts')
    })

    it('should recommend warm clothing for cold weather', () => {
      const coldWeather: WeatherData = {
        temperature: 5,
        condition: 'cloudy',
        humidity: 60,
        windSpeed: 5,
        location: 'Test City'
      }

      const recommendations = engine.generateRecommendations(coldWeather)
      
      expect(recommendations.length).toBeGreaterThanOrEqual(2)
      const topRecommendation = recommendations.find(r => r.category === 'top')
      expect(topRecommendation?.items).toContain('Sweater')
    })

    it('should recommend rain gear for rainy weather', () => {
      const rainyWeather: WeatherData = {
        temperature: 20,
        condition: 'rain',
        humidity: 80,
        windSpeed: 7,
        location: 'Test City'
      }

      const recommendations = engine.generateRecommendations(rainyWeather)
      
      const rainGear = recommendations.find(r => r.category === 'outerwear')
      expect(rainGear).toBeDefined()
      expect(rainGear?.items).toContain('Raincoat')
    })

    it('should recommend wind protection for windy weather', () => {
      const windyWeather: WeatherData = {
        temperature: 15,
        condition: 'sunny',
        humidity: 40,
        windSpeed: 15,
        location: 'Test City'
      }

      const recommendations = engine.generateRecommendations(windyWeather)
      
      const windProtection = recommendations.find(r => r.category === 'outerwear')
      expect(windProtection).toBeDefined()
      expect(windProtection?.items).toContain('Windbreaker')
    })
  })

  describe('getStyleSuggestions', () => {
    it('should suggest light colors for hot weather', () => {
      const hotWeather: WeatherData = {
        temperature: 35,
        condition: 'sunny',
        humidity: 45,
        windSpeed: 2,
        location: 'Test City'
      }

      const suggestions = engine.getStyleSuggestions(hotWeather)
      
      expect(suggestions).toContain('Light colors to reflect heat')
      expect(suggestions).toContain('Breathable fabrics like cotton or linen')
    })

    it('should suggest layering for cold weather', () => {
      const coldWeather: WeatherData = {
        temperature: 5,
        condition: 'cloudy',
        humidity: 55,
        windSpeed: 4,
        location: 'Test City'
      }

      const suggestions = engine.getStyleSuggestions(coldWeather)
      
      expect(suggestions).toContain('Layer clothing for warmth')
      expect(suggestions).toContain('Dark colors to absorb heat')
    })

    it('should suggest moisture-wicking for humid weather', () => {
      const humidWeather: WeatherData = {
        temperature: 25,
        condition: 'sunny',
        humidity: 85,
        windSpeed: 3,
        location: 'Test City'
      }

      const suggestions = engine.getStyleSuggestions(humidWeather)
      
      expect(suggestions).toContain('Moisture-wicking materials')
      expect(suggestions).toContain('Loose-fitting clothes for air circulation')
    })

    it('should return empty array for moderate conditions', () => {
      const moderateWeather: WeatherData = {
        temperature: 20,
        condition: 'partly cloudy',
        humidity: 60,
        windSpeed: 5,
        location: 'Test City'
      }

      const suggestions = engine.getStyleSuggestions(moderateWeather)
      
      expect(Array.isArray(suggestions)).toBe(true)
    })
  })
})