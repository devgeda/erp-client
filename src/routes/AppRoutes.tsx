import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout.tsx';
import { ProdutosPage } from '@/pages/produtos/ProdutosPage.tsx';
import { AdicionarProduto } from '@/pages/produtos/AdicionarProduto.tsx';
import { VisualizarProduto } from '@/pages/produtos/VisualizarProduto.tsx';
import { EditarProduto } from '@/pages/produtos/EditarProduto.tsx';
import { HistoricoProduto } from '@/pages/produtos/HistoricoProduto.tsx';
import { LoginPage } from '@/pages/autenticacao/LoginPage.tsx';
import { SignupPage } from '@/pages/autenticacao/SignupPage.tsx';
import { PesquisarProduto } from '@/pages/produtos/PesquisarProduto.tsx';

export function ProtectedRoute() {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/log-in" />;
  }

  return <Outlet />;
}

export function PublicRoute() {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/produtos" />;
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/produtos" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      { path: '/log-in', element: <LoginPage /> },
      { path: '/sign-up', element: <SignupPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/produtos',
            element: <ProdutosPage />,
            children: [
              {
                path: '/produtos/adicionar',
                element: <AdicionarProduto />,
                handle: {
                  pageTitle: 'Adicionar Produto',
                },
              },
              {
                path: '/produtos/pesquisar',
                element: <PesquisarProduto />,
                handle: { pageTitle: 'Pesquisar Produto' },
              },
              {
                path: '/produtos/visualizar',
                element: <VisualizarProduto />,
                handle: {
                  pageTitle: 'Visualizar Produto',
                },
              },
              {
                path: '/produtos/editar',
                element: <EditarProduto />,
                handle: {
                  pageTitle: 'Editar Produto',
                },
              },
              {
                path: '/produtos/historico',
                element: <HistoricoProduto />,
                handle: {
                  pageTitle: 'Histórico de Produtos',
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
