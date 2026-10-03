import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';

import { Tab, TabList, Text, Title3, tokens } from '@fluentui/react-components';
import {
  Add24Regular,
  BoxSearch24Regular,
  History24Regular,
  Search24Regular,
} from '@fluentui/react-icons';
import { sharedStyles } from '@/syles/shared/sharedStyles.ts';

export const sectionTitle = 'ESTOQUE';

export const ProdutosPage = () => {
  const styles = sharedStyles();
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
    <div className={styles.root}>
      {/* GRUPO DE CABEÇALHO + ABAS */}
      <div className={styles.headerGroup}>
        {/* Título e Ações Globais */}
        <div className={styles.headerTop}>
          <div>
            <Text
              size={300}
              weight="semibold"
              style={{ color: tokens.colorBrandForeground1 }}
            >
              {sectionTitle}
            </Text>
            <Title3 block>{handle?.pageTitle ?? 'Seção de Produtos'}</Title3>
          </div>
        </div>

        {/* O TABLIST DE NAVEGAÇÃO */}
        <div className={styles.tabContainer}>
          <TabList
            selectedValue={currentTab}
            onTabSelect={handleTabSelect}
            size="medium"
          >
            <Tab value="adicionar" icon={<Add24Regular />}>
              Adicionar
            </Tab>
            <Tab value="pesquisar" icon={<Search24Regular />}>
              Pesquisar
            </Tab>
            <Tab value="localizacoes" icon={<BoxSearch24Regular />}>
              Localizações
            </Tab>
            <Tab value="historico" icon={<History24Regular />}>
              Histórico
            </Tab>
          </TabList>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
