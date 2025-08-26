import * as Yup from 'yup'

const getFormArticle = () =>
  Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    amount: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .typeError('El monto debe ser un número')
      .required('El monto es obligatorio')
  })

export { getFormArticle }
