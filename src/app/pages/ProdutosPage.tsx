import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';

// Componentes shadcn/ui.
import { CardDescription, CardTitle } from '@/shared/components/ui/card.tsx';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs.tsx';

export const sectionTitle = 'ESTOQUE';

export const ProdutosPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const matches = useMatches();

  // Pega a rota filha que está ativa no momento
  const currentMatch = matches[matches.length - 1];
  const handle = currentMatch?.handle as { pageTitle?: string };

  return (
    <div className={'flex flex-col gap-6 max-w-7xl mx-auto p-4'}>
      {/* GRUPO DE CABEÇALHO + ABAS */}
      <div className={'flex flex-col justify-between items-start'}>
        {/* Título e Ações Globais */}
        <div className={'flex items-start gap-2'}>
          <CardTitle>{sectionTitle}</CardTitle>
          <CardDescription>
            {handle?.pageTitle ?? 'Seção de Produtos'}
          </CardDescription>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
