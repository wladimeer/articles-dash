import { useState, useMemo } from 'react'
import { ARTICLE_STATUS } from '../constants/states'
import { List, AutoSizer } from 'react-virtualized'
import type { Article } from '../types/article.type'
import { useArticleStore } from '../store/article'
import { removeAccents } from '../utils/strings'
import EmptyState from './EmptyState'
import ArticleRow from './ArticleRow'
import dayjs from 'dayjs'

const ArticlesTable = () => {
  const { articles, message } = useArticleStore()

  const [sortBy, setSortBy] = useState<'date' | 'amount' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [search, setSearch] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<number | ''>('')

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDirection('desc')
    }
  }

  const filteredArticles = useMemo(() => {
    let result = [...articles]

    if (sortBy === 'date') {
      result.sort((a, b) =>
        sortDirection === 'asc'
          ? dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
          : dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
      )
    } else if (sortBy === 'amount') {
      result.sort((a, b) => (sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount))
    }

    if (search !== '') {
      const lower = removeAccents(search.trim().toLowerCase())
      result = result.filter(
        (a) =>
          removeAccents((a.name ?? '').toLowerCase()).includes(lower) ||
          removeAccents((a.country ?? '').toLowerCase()).includes(lower)
      )
    }

    if (statusFilter !== '') {
      result = result.filter((a: Article) => a.statusNumber === statusFilter)
    }

    return result
  }, [articles, sortBy, sortDirection, search, statusFilter])

  if (message) {
    return <EmptyState message={message} />
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={() => toggleSort('date')} className="px-2 py-1 border rounded">
          Ordenar por Fecha
        </button>
        <button onClick={() => toggleSort('amount')} className="px-2 py-1 border rounded">
          Ordenar por Monto
        </button>

        <input
          type="text"
          placeholder="Buscar por país o nombre"
          onChange={({ target: { value } }) => setSearch(value)}
          className="border rounded px-2 py-1"
          value={search}
        />

        <select
          onChange={({ target: { value } }) => setStatusFilter(value === '' ? '' : Number(value))}
          className="border rounded px-2 py-1"
          value={statusFilter}
        >
          <option value="">Todos los estados</option>
          <option value={ARTICLE_STATUS.VALID}>Válido</option>
          <option value={ARTICLE_STATUS.INVALID}>Inválido</option>
          <option value={ARTICLE_STATUS.PENDING}>Pendiente</option>
        </select>
      </div>

      <div className="h-[500px] border rounded-md shadow">
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowHeight={50}
              rowCount={filteredArticles.length}
              rowRenderer={({ index, style }) => {
                const article = filteredArticles[index]
                return (
                  <div key={article.id} style={style}>
                    <ArticleRow article={article} />
                  </div>
                )
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default ArticlesTable
