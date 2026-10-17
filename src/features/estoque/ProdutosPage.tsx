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

  const currentTab = location.pathname.includes('adicionar')
    ? 'adicionar'
    : location.pathname.includes('pesquisar')
      ? 'pesquisar'
      : location.pathname.includes('localizacoes')
        ? 'localizacoes'
        : location.pathname.includes('historico')
          ? 'historico'
          : 'adicionar';

  const handleTabSelect = (_event: unknown, data: { value: unknown }) => {
    if (data.value === 'adicionar') navigate('/produtos/adicionar');
    if (data.value === 'pesquisar') navigate('/produtos/pesquisar');
    if (data.value === 'localizacoes') navigate('/produtos/localizacoes');
    if (data.value === 'historico') navigate('/produtos/historico');
  };

  return (
    <div className={'flex flex-col gap-6 max-w-7xl mx-auto m-4'}>
      {/* GRUPO DE CABEÇALHO + ABAS */}
      <div className={'flex justify-between items-center mb-2'}>
        {/* Título e Ações Globais */}
        <div className={'flex justify-between items-center'}>
          <div>
            <CardTitle>{sectionTitle}</CardTitle>
            <CardDescription>
              {handle?.pageTitle ?? 'Seção de Produtos'}
            </CardDescription>
          </div>
        </div>

        {/* O TABLIST DE NAVEGAÇÃO */}
        <div className={'border-b border-solid border-b-neutral-200'}>
          <Tabs>
            <TabsList>
              <TabsTrigger value={'adicionar'}>Adicionar</TabsTrigger>
              <TabsTrigger value={'pesquisar'}>Pesquisar</TabsTrigger>
              <TabsTrigger value={'localizacoes'}>Localizações</TabsTrigger>
              <TabsTrigger value={'historico'}>Histórico</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
