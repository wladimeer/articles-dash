import { useEffect } from 'react'
import { useArticleStore } from '../../store/article'
import ArticlesTable from '../../components/ArticlesTable'
import InformationModal from '../../components/InformationModal'
import useInformationModal from '../../hooks/useInformationModal'
import { Box, Typography, Button } from '@mui/material'
import { ROUTE_CONFIG } from '../../constants/route'
import { useUserStore } from '../../store/user'
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const { informationModal, setInformationModal, resetInformationModal } = useInformationModal()
  const { fetchArticles } = useArticleStore()
  const navigate = useNavigate()

  const removeUser = useUserStore((state) => state.removeUser)

  const handleLogout = async () => {
    setInformationModal({
      title: 'Panel de artículos',
      message: '¡Has cerrado sesión con éxito! Te estamos redireccionando al inicio de sesión',
      visible: true,
      loading: true
    })

    setTimeout(() => {
      removeUser()
      navigate(ROUTE_CONFIG.LOGIN)
    }, 2500)
  }

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  return (
    <>
      <InformationModal {...{ informationModal, resetInformationModal }} />

      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            mb: 3,
            gap: 2
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ flex: { xs: '1 1 100%', md: '0 auto' } }}
          >
            Panel de artículos
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              gap: 1,
              flex: { xs: '1 1 100%', md: '0 auto' }
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ flex: { xs: '1 1 100%', md: '0 auto' } }}
              onClick={() => console.log('Acción futura')}
            >
              Acción
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ flex: { xs: '1 1 100%', md: '0 auto' } }}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Box>

        <ArticlesTable />
      </Box>
    </>
  )
}

export default Dashboard
