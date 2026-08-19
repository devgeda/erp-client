import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';

import {
  makeStyles,
  shorthands,
  Tab,
  TabList,
  Text,
  Title3,
  tokens,
} from '@fluentui/react-components';
import {
  Add24Regular,
  Edit24Regular,
  Eye24Regular,
  History24Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('24px'),
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
  },
  headerGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
    marginBottom: '8px',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContainer: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('24px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.gap('16px'),
    boxShadow: tokens.shadow2,
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('16px'),
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap('16px'),
  },
  colSpan2: {
    gridColumnEnd: 'span 2',
  },
  actionFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    ...shorthands.gap('12px'),
    marginTop: '16px',
    ...shorthands.padding('16px', '0'),
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorNeutralStroke2,
  },
  flexRowRight: {
    display: 'flex',
    alignItems: 'flex-end',
    ...shorthands.gap('8px'),
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  cardTitle: {
    color: tokens.colorNeutralForeground1,
  },
  grid6: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    ...shorthands.gap('16px'),
  },
});

export const sectionTitle = 'ESTOQUE';

export const ProdutosPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const matches = useMatches();

  // Pega a rota filha que está ativa no momento
  const currentMatch = matches[matches.length - 1];
  const handle = currentMatch?.handle as any;

  // Uma forma simples de descobrir qual aba deve estar ativa baseada na URL atual
  // Ex: /produtos/adicionar -> ativa a aba "adicionar"
  const currentTab = location.pathname.includes('adicionar')
    ? 'adicionar'
    : location.pathname.includes('editar')
      ? 'editar'
      : location.pathname.includes('visualizar')
        ? 'visualizar'
        : location.pathname.includes('historico')
          ? 'historico'
          : 'adicionar';

  const handleTabSelect = (_event: unknown, data: { value: unknown }) => {
    if (data.value === 'adicionar') navigate('/produtos/adicionar');
    if (data.value === 'editar') navigate('/produtos/editar');
    if (data.value === 'visualizar') navigate('/produtos/visualizar');
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
            <Tab value="visualizar" icon={<Eye24Regular />}>
              Visualizar
            </Tab>
            <Tab value="editar" icon={<Edit24Regular />}>
              Editar
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
