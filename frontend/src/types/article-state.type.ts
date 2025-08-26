import type { Article } from './article.type'
import type { ApiResponse } from '../interfaces/api-response'

interface ArticleState {
  articles: Article[]
  loading: boolean
  message: string
  fetchArticles: () => Promise<void>
  updateArticle: (id: number, updates: Partial<Article>) => Promise<ApiResponse<Article | null>>
}

export type { ArticleState }
