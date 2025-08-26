import { getFormArticle } from '../utils/validationSchemas'
import type { ArticleRowProps } from '../interfaces/article-row-props.interface'
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
            <div className="grid grid-cols-7 gap-2 p-2 border-b text-sm">
              <span>{article.id}</span>
              <span>{dayjs(article.date).format('DD-MM-YYYY')}</span>

              <input
                type="text"
                value={values.name}
                onChange={handleChange}
                className="border rounded px-1 text-sm w-full"
                name="name"
              />

              <input
                type="number"
                value={values.amount}
                onChange={handleChange}
                className="border rounded px-1 text-sm w-full"
                name="amount"
              />

              <span>{article.country}</span>
              <span>{article.agent}</span>
              <span>{article.status}</span>
            </div>
          </Form>
        </>
      )}
    </Formik>
  )
}

export default ArticleRow
