import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout.tsx';
import { ProdutosPage } from '@/pages/ProdutosPage.tsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/produtos" />} />

      <Route element={<AppLayout />}>
        <Route path="/produtos" element={<ProdutosPage />} />
      </Route>
    </Routes>
  );
}
