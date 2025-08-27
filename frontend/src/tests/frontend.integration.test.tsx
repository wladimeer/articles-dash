import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ArticleState } from '../types/article-state.type'
import ArticlesTable from '../components/ArticlesTable'
import type { ReactNode } from 'react'

const mockArticles = [
  {
    id: 1,
    date: '2026-02-15T15:33:22Z',
    name: 'Paula Jimenez',
    amount: 101393,
    amountUSD: 101.39,
    country: 'Argentina',
    agent: 'GHI',
    status: 'Pendiente',
    statusNumber: 2
  },
  {
    id: 2,
    date: '2023-11-02T12:24:56Z',
    name: 'Santiago Torres',
    amount: 16903,
    amountUSD: 3380.6,
    country: 'Brasil',
    agent: 'XYZ',
    status: 'Válido',
    statusNumber: 1
  }
]

vi.mock('../store/article', () => ({
  useArticleStore: () =>
    ({
      articles: mockArticles,
      message: '',
      fetchArticles: vi.fn(),
      updateArticle: vi.fn(),
      loading: false
    } satisfies ArticleState)
}))

vi.mock('react-virtualized', async () => {
  const actual = await vi.importActual<typeof import('react-virtualized')>('react-virtualized')
  return {
    ...actual,
    AutoSizer: ({
      children
    }: {
      children: (size: { width: number; height: number }) => ReactNode
    }) => children({ width: 1000, height: 500 }),
    List: ({
      rowCount,
      rowRenderer
    }: {
      rowCount: number
      rowRenderer: (params: {
        index: number
        style: React.CSSProperties
        key?: string
      }) => ReactNode
    }) => (
      <>
        {Array.from({ length: rowCount }).map((_, index) =>
          rowRenderer({ index, style: {}, key: String(index) })
        )}
      </>
    )
  }
})

vi.mock('../components/ArticleRow', () => ({
  default: ({ article }: { article: { id: number; name: string } }) => (
    <div data-testid="article-row">{article.name}</div>
  )
}))

describe('ArticlesTable', () => {
  it('renders articles and search input', () => {
    render(<ArticlesTable />)

    // Verifica que se muestran los artículos mockeados
    expect(screen.getByText('Paula Jimenez')).toBeInTheDocument()
    expect(screen.getByText('Santiago Torres')).toBeInTheDocument()

    // Verifica que el buscador está presente
    expect(screen.getByPlaceholderText(/buscar por país o nombre/i)).toBeInTheDocument()
  })
})
