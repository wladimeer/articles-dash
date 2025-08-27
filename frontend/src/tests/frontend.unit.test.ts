import { describe, it, expect } from 'vitest'
import type { ApiResponse } from '../interfaces/api-response'
import type { Article } from '../interfaces/article.interfaces'
import { removeAccents } from '../utils/strings'
import { STATES } from '../constants/response'

describe('removeAccents', () => {
  it('should remove the accents from the string', () => {
    const input = 'José Álvarez'
    const output = removeAccents(input)
    expect(output).toBe('Jose Alvarez')
  })
})

describe('mock API response', () => {
  it('should have the correct structure and success status', () => {
    const mockResponse: ApiResponse<Article[]> = {
      status: STATES.SUCCESS,
      message: 'Fetched successfully',
      data: [
        {
          id: 1,
          name: 'Paula Jimenez',
          amount: 101393,
          amountUSD: 101.393,
          country: 'Argentina',
          date: '2026-02-15T15:33:22Z',
          status: 'Pendiente',
          statusNumber: 2,
          agent: 'GHI'
        }
      ]
    }

    const article = mockResponse.data[0]
    expect(mockResponse.status).toBe(STATES.SUCCESS)
    expect(article).toHaveProperty('id')
    expect(article).toHaveProperty('name')
    expect(article).toHaveProperty('amountUSD')
    expect(article.statusNumber).toBe(2)
  })
})
