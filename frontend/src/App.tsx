import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './pages/private/Dashboard'
import { ROUTE_CONFIG } from './constants/route'
import NotFound from './pages/public/NotFound'
import { useThemeStore } from './store/theme'
import Login from './pages/public/Login'
import Private from './routes/Private'
import Public from './routes/Public'

const App = () => {
  const { darkMode } = useThemeStore()

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2'
      },
      secondary: {
        main: '#dc004e'
      }
    },
    typography: {
      fontFamily: '"Reddit Sans Condensed", sans-serif'
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route element={<Public />}>
            <Route path={ROUTE_CONFIG.LOGIN} element={<Login />} />
          </Route>

          <Route element={<Private />}>
            <Route path={ROUTE_CONFIG.HOME} element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
