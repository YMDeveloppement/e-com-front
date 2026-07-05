import React from 'react';
import Login from '@/pages/auth/login';
import Unauthorized from '@/pages/auth/unauthorized';
import Home from '@/pages/home';
import PublicRoute from '@/plugins/routes/PublicRoute.jsx';
import CartPage from '@/pages/products/cartPage.jsx';
import Testt from '@/pages/testt.jsx';

const routes = [
  {
    path: '/auth',
    element: <PublicRoute />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'unauthorized', element: <Unauthorized /> },
    ]
  },
  {
    path: '/testt',
    element: <Testt />,
  },
  {
    path: '/newPage',
    element: <CartPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/',
    element: <Home />,
  },
];

export default routes;