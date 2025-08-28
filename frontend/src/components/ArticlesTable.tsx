import { useState, useMemo } from 'react'
import { ARTICLE_STATUS } from '../constants/states'
import { FixedSizeList as List } from 'react-window'
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
  FormControl,
  Typography
} from '@mui/material'

const ArticlesTable = () => {
  const { articles, message, loading } = useArticleStore()

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
      dayjs(a.date).format('DD-MM-YYYY'),
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
      <Stack direction="row" flexWrap="wrap" gap={2} rowGap={1} mb={2} alignItems="center">
        <Button
          data-testid="sort-date"
          variant="outlined"
          onClick={() => toggleSort('date')}
          sx={{ flex: { xs: '1 1 100%', sm: '0 auto' } }}
        >
          Ordenar por Fecha {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Button>

        <Button
          data-testid="sort-amount"
          variant="outlined"
          onClick={() => toggleSort('amount')}
          sx={{ flex: { xs: '1 1 100%', sm: '0 auto' } }}
        >
          Ordenar por Monto {sortBy === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Button>

        <TextField
          data-testid="search-input"
          size="small"
          placeholder="Buscar por país o nombre"
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
          sx={{ flex: { xs: '1 1 100%', sm: '0 auto' }, minWidth: { sm: 200 } }}
        />

        <FormControl
          data-testid="status-filter"
          size="small"
          sx={{ flex: { xs: '1 1 100%', sm: '0 auto' }, minWidth: { sm: 160 } }}
        >
          <InputLabel>Estado</InputLabel>
          <Select
            label="Estado"
            value={statusFilter}
            onChange={(e: SelectChangeEvent) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">Todos los estados</MenuItem>
            <MenuItem value={ARTICLE_STATUS.VALID}>Válido</MenuItem>
            <MenuItem value={ARTICLE_STATUS.INVALID}>Inválido</MenuItem>
            <MenuItem value={ARTICLE_STATUS.PENDING}>Pendiente</MenuItem>
          </Select>
        </FormControl>

        <Button
          data-testid="export-csv-button"
          variant="contained"
          color="primary"
          onClick={exportToCSV}
          sx={{ flex: { xs: '1 1 100%', sm: '0 auto' } }}
        >
          Exportar CSV
        </Button>
      </Stack>

      {loading ? (
        <EmptyState message="Cargando..." />
      ) : (
        <Paper
          sx={{
            height: 500,
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #ddd'
          }}
        >
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: '0.5fr 1fr 1fr 1fr',
              md: '0.5fr 1fr 2fr 1fr 1fr 1fr 1fr'
            }}
            alignItems="center"
            gap={1}
            px={2}
            py={1}
            mr={2}
            fontWeight="bold"
            borderBottom="1px solid #000"
            minHeight="50px"
          >
            <Typography>ID</Typography>
            <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Fecha</Typography>
            <Typography>Nombre</Typography>
            <Typography>Monto</Typography>
            <Typography sx={{ display: { xs: 'none', md: 'block' } }}>País</Typography>
            <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Agente</Typography>
            <Typography>Estado</Typography>
          </Box>

          <List height={450} itemCount={filteredArticles.length} itemSize={50} width="100%">
            {({ index, style }) => {
              const article = filteredArticles[index]
              return (
                <Box key={article.id} style={style}>
                  <ArticleRow article={article} />
                </Box>
              )
            }}
          </List>
        </Paper>
      )}
    </Box>
  )
}

export default ArticlesTable
