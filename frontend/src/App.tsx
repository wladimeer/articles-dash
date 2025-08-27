import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './pages/private/Dashboard'
import { ROUTE_CONFIG } from './constants/route'
import NotFound from './pages/public/NotFound'
import Login from './pages/public/Login'
import Private from './routes/Private'
import Public from './routes/Public'

const App = () => {
  return (
    <>
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
    </>
  )
}

export default App
