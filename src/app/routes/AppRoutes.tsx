import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { AppLayout } from '@/shared/layouts/AppLayout.tsx';
import { EstoquePage } from '@/app/pages/EstoquePage.tsx';
// import { AdicionarProduto } from '@/features/estoque/AdicionarProduto.tsx';
// import { HistoricoProduto } from '@/features/estoque/HistoricoProduto.tsx';
import { LoginPage } from '@/features/autenticacao/LoginPage.tsx';
// import { SignupPage } from '@/features/autenticacao/SignupPage.tsx';
import { PesquisarProduto } from '@/app/pages/PesquisarProduto.tsx';
import { AdicionarProduto } from '@/app/pages/AdicionarProduto.tsx';

// import { Localizacoes } from '@/features/estoque/pesquisa/Localizacoes.tsx';

export function ProtectedRoute() {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={'/log-in'} />;
  }

  return <Outlet />;
}

export function PublicRoute() {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to={'/produtos/pesquisar'} />;
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/produtos/pesquisar'} replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      { path: '/log-in', element: <LoginPage /> },
      /* { path: '/sign-up', element: <SignupPage /> },*/
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
            element: <EstoquePage />,
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
              /*{
                path: '/produtos/localizacoes',
                element: <Localizacoes />,
                handle: { pageTitle: 'Localizações' },
              },*/
              /*{
                path: '/produtos/historico',
                element: <HistoricoProduto />,
                handle: {
                  pageTitle: 'Histórico de Produtos',
                },
              },*/
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
