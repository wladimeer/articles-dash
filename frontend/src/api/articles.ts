import axios from 'axios'
import type { Article } from '../interfaces/article.interfaces'
import type { ApiResponse } from '../interfaces/api-response'
import { STATES } from '../constants/response'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  validateStatus: () => true
})

const getArticles = async (): Promise<ApiResponse<Article[]>> => {
  try {
    const { data } = await api.get<ApiResponse<Article[]>>('/articles')
    return data
  } catch {
    return {
      status: STATES.EXCEPTION,
      message: 'Ocurrió un error inesperado. Inténtalo más tarde',
      data: []
    }
  }
}

const updateArticle = async (
  id: number,
  updates: { name?: string; amount?: number }
): Promise<ApiResponse<Article | null>> => {
  try {
    const { data } = await api.put<ApiResponse<Article | null>>(`/articles/${id}`, updates)
    return data
  } catch {
    return {
      status: STATES.EXCEPTION,
      message: 'Ocurrió un error inesperado. Inténtalo más tarde',
      data: null
    }
  }
}

export { getArticles, updateArticle }
