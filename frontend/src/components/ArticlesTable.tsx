import { useState, useMemo } from 'react'
import { ARTICLE_STATUS } from '../constants/states'
import { List, AutoSizer } from 'react-virtualized'
import type { Article } from '../interfaces/article.interfaces'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useArticleStore } from '../store/article'
import { removeAccents } from '../utils/strings'
import EmptyState from './EmptyState'
import ArticleRow from './ArticleRow'
import dayjs from 'dayjs'
import {
  Box,
  Stack,
  Button,
  TextField,
  Select,
  MenuItem,
  Paper,
  InputLabel,
  FormControl
} from '@mui/material'

const ArticlesTable = () => {
  const { articles, message } = useArticleStore()

  const [sortBy, setSortBy] = useState<'date' | 'amount' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [search, setSearch] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')

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
      result = result.filter((a: Article) => String(a.statusNumber) === statusFilter)
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
    <Box>
      <Stack direction="row" spacing={2} mb={2} alignItems="center" flexWrap="wrap">
        <Button variant="outlined" onClick={() => toggleSort('date')}>
          Ordenar por Fecha {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Button>

        <Button variant="outlined" onClick={() => toggleSort('amount')}>
          Ordenar por Monto {sortBy === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Button>

        <TextField
          size="small"
          placeholder="Buscar por país o nombre"
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            label="Estado"
            value={statusFilter}
            onChange={(e: SelectChangeEvent) => {
              const v = e.target.value as string
              setStatusFilter(v)
            }}
          >
            <MenuItem value="">Todos los estados</MenuItem>
            <MenuItem value={ARTICLE_STATUS.VALID}>Válido</MenuItem>
            <MenuItem value={ARTICLE_STATUS.INVALID}>Inválido</MenuItem>
            <MenuItem value={ARTICLE_STATUS.PENDING}>Pendiente</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={exportToCSV}>
          Exportar CSV
        </Button>
      </Stack>

      <Paper
        sx={{
          height: 500,
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #ddd'
        }}
      >
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
                  <Box key={article.id} style={style}>
                    <ArticleRow article={article} />
                  </Box>
                )
              }}
            />
          )}
        </AutoSizer>
      </Paper>
    </Box>
  )
}

export default ArticlesTable
