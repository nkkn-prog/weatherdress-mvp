import ErrorHandler, { ErrorType } from '../errorHandler'

describe('ErrorHandler', () => {
  describe('createError', () => {
    it('should create an error with all properties', () => {
      const originalError = new Error('Original error')
      const appError = ErrorHandler.createError(
        ErrorType.API_ERROR,
        'Test error message',
        'TEST_CODE',
        originalError
      )

      expect(appError.type).toBe(ErrorType.API_ERROR)
      expect(appError.message).toBe('Test error message')
      expect(appError.code).toBe('TEST_CODE')
      expect(appError.originalError).toBe(originalError)
    })

    it('should create an error without optional properties', () => {
      const appError = ErrorHandler.createError(
        ErrorType.VALIDATION_ERROR,
        'Validation failed'
      )

      expect(appError.type).toBe(ErrorType.VALIDATION_ERROR)
      expect(appError.message).toBe('Validation failed')
      expect(appError.code).toBeUndefined()
      expect(appError.originalError).toBeUndefined()
    })
  })

  describe('handleWeatherApiError', () => {
    it('should handle network errors', () => {
      const networkError = { code: 'NETWORK_ERROR' }
      const appError = ErrorHandler.handleWeatherApiError(networkError)

      expect(appError.type).toBe(ErrorType.NETWORK_ERROR)
      expect(appError.message).toContain('Unable to connect to weather service')
      expect(appError.code).toBe('WEATHER_NETWORK_ERROR')
    })

    it('should handle authentication errors', () => {
      const authError = { status: 401 }
      const appError = ErrorHandler.handleWeatherApiError(authError)

      expect(appError.type).toBe(ErrorType.API_ERROR)
      expect(appError.message).toContain('authentication failed')
      expect(appError.code).toBe('WEATHER_AUTH_ERROR')
    })

    it('should handle rate limit errors', () => {
      const rateLimitError = { status: 429 }
      const appError = ErrorHandler.handleWeatherApiError(rateLimitError)

      expect(appError.type).toBe(ErrorType.API_ERROR)
      expect(appError.message).toContain('rate limit exceeded')
      expect(appError.code).toBe('WEATHER_RATE_LIMIT')
    })

    it('should handle unknown errors', () => {
      const unknownError = { status: 500 }
      const appError = ErrorHandler.handleWeatherApiError(unknownError)

      expect(appError.type).toBe(ErrorType.API_ERROR)
      expect(appError.message).toContain('Failed to fetch weather data')
      expect(appError.code).toBe('WEATHER_GENERAL_ERROR')
    })
  })

  describe('handleLocationError', () => {
    it('should handle permission denied error', () => {
      const locationError = {
        code: 1, // PERMISSION_DENIED
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError

      const appError = ErrorHandler.handleLocationError(locationError)

      expect(appError.type).toBe(ErrorType.PERMISSION_ERROR)
      expect(appError.message).toContain('Location access denied')
      expect(appError.code).toBe('LOCATION_PERMISSION_DENIED')
    })

    it('should handle position unavailable error', () => {
      const locationError = {
        code: 2, // POSITION_UNAVAILABLE
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError

      const appError = ErrorHandler.handleLocationError(locationError)

      expect(appError.type).toBe(ErrorType.API_ERROR)
      expect(appError.message).toContain('Location information is unavailable')
      expect(appError.code).toBe('LOCATION_UNAVAILABLE')
    })

    it('should handle timeout error', () => {
      const locationError = {
        code: 3, // TIMEOUT
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError

      const appError = ErrorHandler.handleLocationError(locationError)

      expect(appError.type).toBe(ErrorType.NETWORK_ERROR)
      expect(appError.message).toContain('Location request timed out')
      expect(appError.code).toBe('LOCATION_TIMEOUT')
    })
  })

  describe('getErrorMessage', () => {
    it('should return the error message', () => {
      const appError = ErrorHandler.createError(
        ErrorType.VALIDATION_ERROR,
        'Test message'
      )

      expect(ErrorHandler.getErrorMessage(appError)).toBe('Test message')
    })
  })

  describe('getErrorCode', () => {
    it('should return the error code', () => {
      const appError = ErrorHandler.createError(
        ErrorType.API_ERROR,
        'Test message',
        'TEST_CODE'
      )

      expect(ErrorHandler.getErrorCode(appError)).toBe('TEST_CODE')
    })

    it('should return default code for errors without code', () => {
      const appError = ErrorHandler.createError(
        ErrorType.UNKNOWN_ERROR,
        'Test message'
      )

      expect(ErrorHandler.getErrorCode(appError)).toBe('UNKNOWN_ERROR')
    })
  })

  describe('logError', () => {
    it('should log error to console', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const appError = ErrorHandler.createError(
        ErrorType.API_ERROR,
        'Test error',
        'TEST_CODE'
      )

      ErrorHandler.logError(appError)

      expect(consoleSpy).toHaveBeenCalledWith('Application Error:', {
        type: ErrorType.API_ERROR,
        message: 'Test error',
        code: 'TEST_CODE',
        originalError: undefined
      })

      consoleSpy.mockRestore()
    })
  })
})