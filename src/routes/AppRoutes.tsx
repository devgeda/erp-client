import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout.tsx';
import { ProdutosPage } from '@/pages/produtos/ProdutosPage.tsx';
import { AdicionarProduto } from '@/pages/produtos/AdicionarProduto.tsx';
import { VisualizarProduto } from '@/pages/produtos/VisualizarProduto.tsx';
import { EditarProduto } from '@/pages/produtos/EditarProduto.tsx';
import { HistoricoProduto } from '@/pages/produtos/HistoricoProduto.tsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/produtos" />} />

      <Route element={<AppLayout />}>
        <Route path="/produtos" element={<ProdutosPage />}>
          <Route path="/produtos/adicionar" element={<AdicionarProduto />} />
          <Route path="/produtos/visualizar" element={<VisualizarProduto />} />
          <Route path="/produtos/editar" element={<EditarProduto />} />
          <Route path="/produtos/historico" element={<HistoricoProduto />} />
        </Route>
      </Route>
    </Routes>
  );
}
