import { Outlet } from 'react-router-dom'
import AuthContextProvider from './context/AuthContextProvider'

function App() {

  return (
    <AuthContextProvider>
      <Outlet/>
    </AuthContextProvider>
  )
}

export default App
