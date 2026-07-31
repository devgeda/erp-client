import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout.tsx';
import { ProdutosPage } from '@/pages/produtos/ProdutosPage.tsx';
import { AdicionarProduto } from '@/pages/produtos/AdicionarProduto.tsx';
import { VisualizarProduto } from '@/pages/produtos/VisualizarProduto.tsx';
import { EditarProduto } from '@/pages/produtos/EditarProduto.tsx';
import { HistoricoProduto } from '@/pages/produtos/HistoricoProduto.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/produtos" replace />,
  },
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
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
