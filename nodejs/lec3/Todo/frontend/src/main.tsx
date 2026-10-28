import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AuthLayout from './_auth/AuthLayout.tsx'
import RootLayout from './_root/RootLayout.tsx'
import Signup from './_auth/pages/Signup.tsx'
import Login from './_auth/pages/Login.tsx'
import AuthContextProvider from './context/AuthContextProvider.tsx'
import LandingPage from './_landing/LandingPage.tsx'
import Dashboard from './_root/pages/Dashboard.tsx'
import Tasks from './_root/pages/Tasks.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='' element={<App/>}>
      <Route index element={<LandingPage/>}/>
      <Route path ='' element={<AuthLayout/>}>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
      <Route path='' element={<RootLayout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
