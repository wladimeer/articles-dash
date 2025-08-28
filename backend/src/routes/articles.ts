import { Router, Request, Response } from 'express'
import { getAllArticles, updateArticle } from '../services/articles'
import { STATES } from '../constants/states'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const articles = await getAllArticles()
    res.json({
      status: STATES.SUCCESS,
      message: articles.length
        ? 'Artículos cargados correctamente'
        : 'No hay artículos disponibles',
      data: articles
    })
  } catch (error: unknown) {
    console.error(error)
    res.status(500).json({
      status: STATES.EXCEPTION,
      message: 'Error al cargar los artículos',
      data: []
    })
  }
})

router.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id)
    const updates = req.body

    if (updates.amount !== undefined && updates.amount <= 0) {
      return res.status(400).json({
        status: STATES.ERROR,
        message: `El monto del artículo ${id} debe ser mayor a 0`,
        data: null
      })
    }

    const updated = await updateArticle(id, updates)

    if (!updated) {
      return res.status(404).json({
        status: STATES.ERROR,
        message: 'Artículo no encontrado',
        data: null
      })
    }

    return res.json({
      status: STATES.SUCCESS,
      message: `Artículo ${id} actualizado correctamente`,
      data: updated
    })
  } catch (error: unknown) {
    console.error(error)
    return res.status(500).json({
      status: STATES.EXCEPTION,
      message: 'Error al actualizar el artículo',
      data: null
    })
  }
})

export default router
