import { useEffect } from 'react'
import { useArticleStore } from '../../store/article'
import ArticlesTable from '../../components/ArticlesTable'
import InformationModal from '../../components/InformationModal'
import useInformationModal from '../../hooks/useInformationModal'
import { Box, Typography, Button } from '@mui/material'
import EmptyState from '../../components/EmptyState'
import { ROUTE_CONFIG } from '../../constants/route'
import { useUserStore } from '../../store/user'
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const { informationModal, setInformationModal, resetInformationModal } = useInformationModal()
  const { fetchArticles, loading } = useArticleStore()
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
            mb: 3
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Panel de artículos
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" color="primary" onClick={() => console.log('Acción futura')}>
              Acción
            </Button>

            <Button variant="contained" color="error" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Box>
        </Box>

        {loading ? <EmptyState message="Cargando..." /> : <ArticlesTable />}
      </Box>
    </>
  )
}

export default Dashboard
