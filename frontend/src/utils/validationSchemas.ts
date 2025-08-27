import * as Yup from 'yup'

const getFormUser = () =>
  Yup.object({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
  })

const getFormArticle = () =>
  Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    amount: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .typeError('El monto debe ser un número')
      .required('El monto es obligatorio')
  })

export { getFormUser, getFormArticle }
