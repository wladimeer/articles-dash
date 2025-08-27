import type { ApiResponse } from './api-response.interface'

interface Article {
  id: number
  date: string
  name: string
  amount: number
  amountUSD: number
  country: string
  agent: string
  status: string
  statusNumber: number
}

interface ArticleStore {
  articles: Article[]
  loading: boolean
  message: string
  fetchArticles: () => Promise<void>
  updateArticle: (id: number, updates: Partial<Article>) => Promise<ApiResponse<Article | null>>
}

export type { Article, ArticleStore }
