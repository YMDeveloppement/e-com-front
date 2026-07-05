import React from 'react';  // 👈 add this
import Login from '@/pages/auth/login';
import Unauthorized from '@/pages/auth/unauthorized';
import Home from '@/pages/home';
import CartPage from '@/pages/products/cartPage.jsx';
import CategoryProducts from '@/pages/products/CategoryProducts';
import ProductsList from '@/pages/admin/pages/productslist.jsx';
import AddProduct from '@/pages/admin/pages/addproduct.jsx';
import ProtectedRoute from '@/plugins/routes/ProtectedRoute.jsx';
import Checkout from '@/pages/products/checkout.jsx';
import PublicRoute from '@/plugins/routes/PublicRoute.jsx';
const routes = [
  {
    path: '/auth',
    children: [{
      path: 'login',
      element: <Login />,
    }, {
      path: 'unauthorized',
      element: <Unauthorized />,
    }]
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'category',
        children: [{
          path: ':id',
          element: <CategoryProducts />,
        }]
      },
    ]
  },

  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['vendor']} />,
    children: [
      {
        path: '',
        element: <div>Admin Dashboard</div>,
        handle: {
          permissions: ['dashboard.product']
        }
      },
      {
        path: 'products',
        element: <ProductsList />,
        handle: {
          permissions: ['product.show']
        }
      },
      {
        path: 'add-product',
        element: <AddProduct />,
        handle: {
          permissions: ['product.create']
        }
      }
    ]
  },

  {
    path: '/vendor',
    element: <ProtectedRoute allowedRoles={['vendor']} />,
    children: [
      {
        path: '',
        element: <div>Admin Dashboard</div>,
        handle: {
          permissions: ['dashboard.product']
        }
      },
      {
        path: 'products',
        element: <ProductsList />,
        handle: {
          permissions: ['product.show']
        }
      },
      {
        path: 'add-product',
        element: <AddProduct />,
        handle: {
          permissions: ['product.create']
        }
      }
    ]
  }
];

export default routes;