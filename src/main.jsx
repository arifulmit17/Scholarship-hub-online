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
import PrivateRoutes from './PrivateRoutes.jsx';
import ScholarshipDetails from './Pages/ScholarshipDetails.jsx';
import Payment from './Pages/Payment.jsx';
import Userprofile from './Pages/Dashboard/Userprofile.jsx';
import DashboardLayout from './Layouts/DashboardLayout.jsx';
import Stats from './Components/Stats.jsx';
import ManageUsers from './Pages/Dashboard/Admin/ManageUsers.jsx';
import AllScholarshipDashboard from './Pages/Dashboard/AllScholarshipDashboard.jsx';
import AddScholarship from './Pages/Dashboard/AddScholarship.jsx';
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
      },
      {
        path: '/scholarshipdetails/:id',
        element: <PrivateRoutes>
          <ScholarshipDetails></ScholarshipDetails>
        </PrivateRoutes>
      },
      {
        path: '/payment',
        Component: Payment
      }
    ]
  },
  {
    path: '/*',
    element: <ErrorPage></ErrorPage>
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes>
      <DashboardLayout></DashboardLayout>
    </PrivateRoutes>,
    children: [
      {
        index:true,
        element: <PrivateRoutes>
          <Stats></Stats>
        </PrivateRoutes>,
        
      },
      {
        path: '/dashboard/myprofile',
        Component: Userprofile
      },
      {
        path: '/dashboard/manageusers',
        element: <PrivateRoutes>
          <ManageUsers></ManageUsers>
        </PrivateRoutes>
      },
      {
        path: '/dashboard/addscholarship',
        element: <PrivateRoutes>
          <AddScholarship></AddScholarship>
        </PrivateRoutes>
      },
      {
        path:'/dashboard/managescholarship',
        Component: AllScholarshipDashboard
      }
    ]
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
