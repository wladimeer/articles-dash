import { create } from 'zustand'
import { getArticles as apiGetArticles, updateArticle as apiUpdateArticle } from '../api/articles'
import type { ArticleState } from '../types/article-state.type'
import { STATES } from '../constants/response'

const useArticleStore = create<ArticleState>((set) => ({
  articles: [],
  loading: false,
  message: '',
  fetchArticles: async () => {
    set({ loading: true, message: '' })

    try {
      const response = await apiGetArticles()

      if (response.status === STATES.SUCCESS) {
        set({
          articles: response.data,
          loading: false,
          message: response.data.length === 0 ? response.message : ''
        })
      } else {
        set({ articles: [], loading: false, message: response.message })
      }
    } catch {
      set({ articles: [], loading: false, message: 'Error inesperado' })
    }
  },
  updateArticle: async (id: number, updates: { name?: string; amount?: number }) => {
    set({ loading: true })

    try {
      const response = await apiUpdateArticle(id, updates)

      if (response.status === STATES.SUCCESS) {
        await useArticleStore.getState().fetchArticles()
      }

      return response
    } catch {
      return {
        status: STATES.EXCEPTION,
        message: 'Error inesperado',
        data: null
      }
    } finally {
      set({ loading: false })
    }
  }
}))

export { useArticleStore }
