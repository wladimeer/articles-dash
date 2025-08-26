import { create } from 'zustand'
import { getArticles } from '../api/articles'
import type { ArticleState } from '../types/article-state.type'
import { STATES } from '../constants/response'

const useArticleStore = create<ArticleState>((set) => ({
  articles: [],
  loading: false,
  message: '',
  fetchArticles: async () => {
    set({ loading: true, message: '' })

    try {
      const response = await getArticles()

      if (response.status === STATES.SUCCESS) {
        if (response.data.length === 0) {
          set({ articles: [], loading: false, message: response.message })
        } else {
          set({ articles: response.data, loading: false, message: '' })
        }
      } else {
        set({ articles: [], loading: false, message: response.message })
      }
    } catch (err) {
      console.error('Error fetching articles:', err)
      set({ articles: [], loading: false, message: 'Error inesperado' })
    }
  }
}))

export { useArticleStore }
