import { getAllArticles } from '../services/articles'
import { encrypt } from '../utils/crypto'
import fs from 'fs-extra'
import path from 'path'

jest.mock('fs-extra')

const articlesPath = path.join(__dirname, '../data/articles.json')
const ratesPath = path.join(__dirname, '../data/rates.json')

describe('getAllArticles', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('must correctly assign status according to business rules', async () => {
    const mockArticles = [
      {
        id: 1,
        date: '2099-01-01',
        name: encrypt('Future Person'),
        amount: 100,
        country: 'Argentina',
        agent: 'ABC'
      },
      {
        id: 2,
        date: '2020-01-01',
        name: encrypt('Invalid Amount'),
        amount: -50,
        country: 'Brazil',
        agent: 'DEF'
      },
      {
        id: 3,
        date: '2020-01-01',
        name: encrypt('Excluded Article'),
        amount: 100,
        country: 'Chile',
        agent: 'XYZ'
      }
    ]

    const mockRates = { Argentina: 1, Brazil: 1 }

    ;(fs.readJSON as jest.Mock).mockImplementation((file: string) => {
      if (file === articlesPath) return mockArticles
      if (file === ratesPath) return mockRates
      return []
    })

    const processed = await getAllArticles()

    expect(processed.find((a) => a.id === 1)?.statusNumber).toBe(2) // Pendiente
    expect(processed.find((a) => a.id === 2)?.statusNumber).toBe(0) // Inválido
    expect(processed.find((a) => a.id === 3)).toBeUndefined() // Excluido
  })

  it('must correctly decrypt the item name', async () => {
    const originalName = 'Artículo Secreto'
    const encryptedName = encrypt(originalName)

    const mockArticles = [
      {
        id: 1,
        date: '2020-01-01',
        name: encryptedName,
        amount: 100,
        country: 'Argentina',
        agent: 'ABC'
      }
    ]

    const mockRates = { Argentina: 1 }

    ;(fs.readJSON as jest.Mock).mockImplementation((file: string) => {
      if (file === articlesPath) return mockArticles
      if (file === ratesPath) return mockRates
      return []
    })

    const processed = await getAllArticles()

    expect(processed[0]?.name).toBe(originalName) // Verifica que el nombre fue desencriptado
  })

  it('should exclude items with no conversion rate available', async () => {
    const mockArticles = [
      {
        id: 1,
        date: '2020-01-01',
        name: encrypt('Sin tasa'),
        amount: 100,
        country: 'Uruguay',
        agent: 'ZZZ'
      }
    ]

    const mockRates = { Argentina: 1 } // Uruguay no existe

    ;(fs.readJSON as jest.Mock).mockImplementation((file: string) => {
      if (file === articlesPath) return mockArticles
      if (file === ratesPath) return mockRates
      return []
    })

    const processed = await getAllArticles()

    expect(processed.find((a) => a.id === 1)).toBeUndefined() // Artículo excluido
  })
})
