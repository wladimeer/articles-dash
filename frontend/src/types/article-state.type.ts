import type { Article } from './article.type'

interface ArticleState {
  articles: Article[]
  loading: boolean
  message: string
  fetchArticles: () => Promise<void>
}

export type { ArticleState }
