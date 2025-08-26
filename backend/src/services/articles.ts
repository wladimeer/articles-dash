import fs from 'fs-extra'
import { convertToUSD } from '../utils/currency'
import type { Article, ProcessedArticle } from '../interfaces/article.interfaces'
import { ARTICLE_STATUS, statusText } from '../constants/states'
import { decrypt, encrypt } from '../utils/crypto'
import dayjs from 'dayjs'
import path from 'path'

const articlesPath = path.join(__dirname, '../data/articles.json')
const ratesPath = path.join(__dirname, '../data/rates.json')

const getAllArticles = async (): Promise<ProcessedArticle[]> => {
  const rawData = await fs.readJSON(articlesPath)
  const rates = await fs.readJSON(ratesPath)

  const processed: ProcessedArticle[] = rawData.map((item: Article) => {
    const { id, date, name, amount, country, agent } = item
    const fullName = decrypt(name)

    let status: (typeof ARTICLE_STATUS)[keyof typeof ARTICLE_STATUS] = ARTICLE_STATUS.VALID

    if (!dayjs(date).isValid()) {
      status = ARTICLE_STATUS.INVALID
    } else if (dayjs(date).isAfter(dayjs())) {
      status = ARTICLE_STATUS.PENDING
    } else if (agent === 'XYZ' && country === 'Chile') {
      return null
    }

    if (amount <= 0) {
      status = ARTICLE_STATUS.INVALID
    }

    const usdAmount = convertToUSD(amount, country, rates)

    return {
      id,
      date,
      name: fullName,
      amount,
      amountUSD: usdAmount,
      country,
      agent,
      status: statusText[status],
      statusNumber: status
    }
  })

  return processed.filter(Boolean) as ProcessedArticle[]
}

const updateArticle = async (id: number, updates: Partial<Article>): Promise<Article | null> => {
  const articles = await fs.readJSON(articlesPath)
  const index = articles.findIndex((a: Article) => a.id === id)

  if (index === -1) return null

  if (updates.name !== undefined) {
    articles[index].name = encrypt(updates.name)
  }

  if (updates.amount !== undefined) {
    articles[index].amount = updates.amount
  }

  await fs.writeJSON(articlesPath, articles, { spaces: 2 })

  return articles[index]
}

export { getAllArticles, updateArticle }
