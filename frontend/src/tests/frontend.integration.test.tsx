import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ArticleStore } from '../interfaces/article.interfaces'
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
    } satisfies ArticleStore)
}))

vi.mock('react-window', async () => {
  const actual = await vi.importActual<typeof import('react-window')>('react-window')
  return {
    ...actual,
    FixedSizeList: ({
      itemCount,
      children
    }: {
      height: number
      itemCount: number
      itemSize: number
      width: number | string
      children: (props: { index: number; style: React.CSSProperties }) => ReactNode
    }) => <>{Array.from({ length: itemCount }).map((_, index) => children({ index, style: {} }))}</>
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
