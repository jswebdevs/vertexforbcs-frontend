import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminAuthProvider from './providers/AdminAuthProvider'
import StudentAuthProvider from './providers/StudentAuthProvider'
import { RouterProvider } from 'react-router-dom'
import Routes from './routers/Routes'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <StudentAuthProvider>
        <RouterProvider router={Routes}>
        </RouterProvider>
      </StudentAuthProvider>
    </AdminAuthProvider>
  </StrictMode>,
)
