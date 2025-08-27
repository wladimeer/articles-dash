import { useEffect } from 'react'
import { useArticleStore } from '../store/article'
import ArticlesTable from '../components/ArticlesTable'
import EmptyState from '../components/EmptyState'

const Dashboard = () => {
  const { fetchArticles, loading } = useArticleStore()

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Panel de artículos</h1>
      {loading ? <EmptyState message="Cargando..." /> : <ArticlesTable />}
    </div>
  )
}

export default Dashboard
