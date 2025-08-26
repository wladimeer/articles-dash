import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <Dashboard />
    </div>
  )
}

export default App
