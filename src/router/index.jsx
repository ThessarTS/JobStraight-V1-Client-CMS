import { createBrowserRouter, redirect } from 'react-router-dom';
import JobPage from '../components/JobPage';
import JobForm from '../components/JobForm';
import LoginForm from '../components/LoginForm';
import CompanyPage from '../components/CompanyPage';
import CompanyForm from '../components/CompanyForm';
import RegisterForm from '../components/RegisterForm';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  {
    path: '/login',
    loader: () => {
      if (localStorage.getItem('access_token')) {
        throw redirect('/');
      }
      return null;
    },
    element: <LoginForm />,
  },
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.getItem('access_token')) {
        throw redirect('/login');
      }
      return null;
    },
    children: [
      {
        path: '/',
        element: <JobPage />,
      },
      {
        path: '/companies',
        element: <CompanyPage />,
      },
      {
        path: '/add-job',
        element: <JobForm />,
      },
      {
        path: '/job/:id',
        element: <JobForm />,
      },
      {
        path: '/add-company',
        element: <CompanyForm />,
      },
      {
        path: '/company/:id',
        element: <CompanyForm />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
    ],
  },
]);

export default router;
