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
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortBy(null)
      }
    } else {
      setSortBy(field)
      setSortDirection('asc')
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

  const exportToCSV = () => {
    if (!filteredArticles.length) return

    const headers = [
      'ID',
      'Fecha',
      'Nombre y Apellido',
      'Monto',
      'Monto USD',
      'País',
      'Agente',
      'Estado'
    ]

    const rows = filteredArticles.map((a) => [
      a.id,
      a.date,
      a.name,
      a.amount,
      a.amountUSD,
      a.country,
      a.agent,
      a.status
    ])

    const csvRows = [headers, ...rows].map((e) => e.join(',')).join('\n')
    const csvContent = `data:text/csv;charset=utf-8,${csvRows}`
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')

    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'articles.csv')

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (message) {
    return <EmptyState message={message} />
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => toggleSort('date')}
          className="px-2 py-1 border rounded flex items-center gap-1"
        >
          Ordenar por Fecha
          {sortBy === 'date' &&
            (sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '')}
        </button>

        <button
          onClick={() => toggleSort('amount')}
          className="px-2 py-1 border rounded flex items-center gap-1"
        >
          Ordenar por Monto
          {sortBy === 'amount' &&
            (sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '')}
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

        <button onClick={exportToCSV} className="px-2 py-1 border rounded bg-blue-500 text-white">
          Exportar CSV
        </button>
      </div>

      <div className="h-[500px] border rounded-md shadow">
        <div className="grid grid-cols-7 font-bold bg-gray-100 px-2 py-2 border-b">
          <span>ID</span>
          <span>Fecha</span>
          <span>Nombre y Apellido</span>
          <span>Monto</span>
          <span>País</span>
          <span>Agente</span>
          <span>Estado</span>
        </div>

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
