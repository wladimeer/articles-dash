import { useUserStore } from '../../store/user'
import InformationModal from '../../components/InformationModal'
import { Box, Card, CardContent, Container, Stack } from '@mui/material'
import type { UserForm } from '../../interfaces/user-form.interface'
import useInformationModal from '../../hooks/useInformationModal'
import { TextField, Button, Typography } from '@mui/material'
import type { User } from '../../interfaces/user.interfaces'
import { getFormUser } from '../../utils/validationSchemas'
import { ROUTE_CONFIG } from '../../constants/route'
import { useNavigate } from 'react-router'
import { Formik, Form } from 'formik'

const Login = () => {
  const { informationModal, setInformationModal, resetInformationModal } = useInformationModal()
  const setUser = useUserStore((state) => state.setUser)
  const navigate = useNavigate()

  const initialValues: UserForm = {
    username: '',
    password: ''
  }

  const validationSchema = getFormUser()

  const handleOnSubmit = async (values: UserForm) => {
    setInformationModal({
      title: 'Inicio de sesión',
      message: 'Iniciando sesión',
      visible: true,
      loading: true
    })

    const user = {
      id: '1',
      username: values.username
    }

    setTimeout(() => {
      setUser(user as User)
      navigate(ROUTE_CONFIG.HOME)
    }, 2000)
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <InformationModal {...{ informationModal, resetInformationModal }} />

      <Card
        variant="elevation"
        sx={{
          width: '100%',
          maxWidth: 350,
          borderRadius: 3,
          boxShadow: 3,
          px: 3,
          py: 4
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="600" align="center" gutterBottom>
            Inicio de sesión
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
          >
            {({ handleChange, handleBlur, isSubmitting, touched, values, errors }) => (
              <Form>
                <Stack spacing={3} mt={3}>
                  <Box>
                    <TextField
                      fullWidth
                      id="username-input"
                      placeholder="Escribe tu nombre de usuario"
                      label="Usuario"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      name="username"
                      size="small"
                      type="text"
                    />

                    {touched.username && errors.username && (
                      <Typography variant="body2" color="error" mt={1}>
                        {errors.username}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <TextField
                      fullWidth
                      id="password-input"
                      placeholder="Escribe tu contraseña"
                      label="Contraseña"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      name="password"
                      type="password"
                      size="small"
                    />

                    {touched.password && errors.password && (
                      <Typography variant="body2" color="error" mt={1}>
                        {errors.password}
                      </Typography>
                    )}
                  </Box>

                  <Button fullWidth type="submit" variant="contained" disabled={isSubmitting}>
                    Iniciar sesión
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          <Typography variant="body2" align="center" color="text.secondary" mt={4}>
            Accede a tu cuenta para disfrutar de nuestros servicios.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login
