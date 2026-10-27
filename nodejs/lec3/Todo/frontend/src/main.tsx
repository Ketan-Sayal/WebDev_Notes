import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AuthLayout from './_auth/AuthLayout.tsx'
import RootLayout from './_root/RootLayout.tsx'
import Signup from './_auth/pages/Signup.tsx'
import Login from './_auth/pages/Login.tsx'
import AuthContextProvider from './context/AuthContextProvider.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App/>}>
      <Route path ='' element={<AuthLayout/>}>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
      <Route path='' element={<RootLayout/>}>

      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
)
