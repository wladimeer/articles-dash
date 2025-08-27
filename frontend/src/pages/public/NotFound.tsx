import { Link } from 'react-router'
import { useUserStore } from '../../store/user'
import { Divider, Button, Container, Stack, Typography, Card, CardContent } from '@mui/material'

const NotFound = () => {
  const { isUserValid } = useUserStore()

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
      <Card
        sx={{
          width: '100%',
          maxWidth: 450,
          px: 3,
          py: 4,
          textAlign: 'center',
          boxShadow: 'none',
          border: 'none'
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="600" gutterBottom>
            Página no encontrada
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" color="text.secondary" mb={4}>
            Lo sentimos, la página que estás buscando no existe o ha sido movida. Verifica la
            dirección o regresa al inicio.
          </Typography>

          <Stack spacing={2}>
            {isUserValid() ? (
              <Button component={Link} to="/" variant="contained">
                Volver al Inicio
              </Button>
            ) : (
              <Button component={Link} to="/login" variant="contained" color="primary">
                Iniciar Sesión
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default NotFound
