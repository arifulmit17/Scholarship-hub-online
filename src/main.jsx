import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './Pages/Home.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import AllScholarship from './Pages/AllScholarship.jsx';
import ErrorPage from './Pages/Errorpage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        index:true,Component: Home
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/allscholarship',
        Component: AllScholarship
      }
    ]
  },
  {
    path: '/*',
    element: <ErrorPage></ErrorPage>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
       <AuthProvider>
        <RouterProvider router={router} />
       </AuthProvider>
    </QueryClientProvider>
    
    
  </StrictMode>,
)
