import { getFormArticle } from '../utils/validationSchemas'
import type { ArticleRowProps } from '../interfaces/article-row-props.interface'
import { TextField, Tooltip, Typography, Box } from '@mui/material'
import { ARTICLE_STATUS } from '../constants/states'
import { useArticleStore } from '../store/article'
import { STATES } from '../constants/response'
import type { ValidationError } from 'yup'
import { toast } from 'react-toastify'
import AutoSubmit from './AutoSubmit'
import { Formik, Form } from 'formik'
import dayjs from 'dayjs'

const ArticleRow = ({ article }: ArticleRowProps) => {
  const validationSchema = getFormArticle()
  const { updateArticle } = useArticleStore()
  const { id, name, amount } = article
  const initialValues = { id, name, amount }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await validationSchema.validate(values, { abortEarly: false })
      toast(`Actualizando los datos del artículo ${id}`, { type: 'info' })

      const updateResponse = await updateArticle(id, values)

      if (updateResponse.status === STATES.SUCCESS) {
        toast(updateResponse.message, { type: 'success' })
      }

      if (updateResponse.status === STATES.ERROR) {
        toast(updateResponse.message, { type: 'error' })
      }

      if (updateResponse.status === STATES.EXCEPTION) {
        toast(updateResponse.message, { type: 'warning' })
      }
    } catch (err) {
      const errors = err as ValidationError

      if (errors?.inner) {
        errors.inner.forEach(({ message }) => {
          toast(message, { type: 'warning' })
        })
      }
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, values }) => (
        <>
          <AutoSubmit />

          <Form>
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: 'auto 1fr 1fr 1fr',
                md: '1fr 1fr 2fr 1fr 1fr 1fr 1fr'
              }}
              alignItems="center"
              gap={1}
              px={2}
              py={1}
              borderBottom="1px solid #ddd"
            >
              <Typography variant="body2">{article.id}</Typography>

              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                {dayjs(article.date).format('DD-MM-YYYY')}
              </Typography>

              <TextField
                name="name"
                value={values.name}
                onChange={handleChange}
                size="small"
                variant="outlined"
                fullWidth
              />

              <TextField
                name="amount"
                type="number"
                value={values.amount}
                onChange={handleChange}
                size="small"
                variant="outlined"
                fullWidth
              />

              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                {article.country}
              </Typography>

              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                {article.agent}
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">{article.status}</Typography>
                {String(article.statusNumber) !== ARTICLE_STATUS.VALID && (
                  <Tooltip
                    title={
                      String(article.statusNumber) === ARTICLE_STATUS.INVALID
                        ? 'Monto negativo o fecha inválida'
                        : String(article.statusNumber) === ARTICLE_STATUS.PENDING
                        ? 'Fecha futura, pendiente de procesamiento'
                        : ''
                    }
                    arrow
                  >
                    <Typography component="span" sx={{ color: 'error.main', cursor: 'help' }}>
                      ⚠️
                    </Typography>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Form>
        </>
      )}
    </Formik>
  )
}

export default ArticleRow
