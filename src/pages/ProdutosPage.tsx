import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Combobox,
  Divider,
  Field,
  Input,
  makeStyles,
  Option,
  shorthands,
  Switch,
  Tab,
  TabList,
  Text,
  Title3,
  tokens,
} from '@fluentui/react-components';
import {
  Add24Regular,
  Dismiss24Regular,
  Edit24Regular,
  Eye24Regular,
  History24Regular,
  Save24Regular,
} from '@fluentui/react-icons';

// 1. Definição de Estilos (Metodologia Fluent v9 - Griffel)
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
  // Estilo sutil para separar as abas do resto do conteúdo
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
  // Grids para organizar os inputs de acordo com o tamanho ideal
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
  // Utilitário para campos que precisam ocupar mais espaço
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
    // Removi o marginBottom daqui pois o cardHeader já vai cuidar do espaçamento
  },

  // Atualize o grid6 para corrigir o vazamento do IVA ST
  grid6: {
    display: 'grid',
    // O pulo do gato está no minmax(0, 1fr) em vez de apenas 1fr
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    ...shorthands.gap('16px'),
  },
});

export const ProdutosPage = () => {
  const styles = useStyles();
  // Hooks do React Router
  const navigate = useNavigate();
  const location = useLocation();

  // Uma forma simples de descobrir qual aba deve estar ativa baseada na URL atual
  // Ex: /produtos/adicionar -> ativa a aba "adicionar"
  const currentTab = location.pathname.includes('adicionar')
    ? 'adicionar'
    : location.pathname.includes('editar')
      ? 'editar'
      : 'visualizar';

  const handleTabSelect = (_event: unknown, data: { value: unknown }) => {
    // Quando o usuário clica na aba, você navega para a rota correspondente
    // (aqui é só a disposição visual, a lógica exata de rota você ajusta pro seu setup)
    if (data.value === 'adicionar') navigate('/produtos/adicionar');
    if (data.value === 'editar') navigate('/produtos/editar/123'); // ID de exemplo
    if (data.value === 'visualizar') navigate('/produtos/visualizar/123');
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
              ESTOQUE
            </Text>
            <Title3 block>Adicionar Produto</Title3>
          </div>
        </div>

        {/* O TABLIST DE NAVEGAÇÃO */}
        <div className={styles.tabContainer}>
          <TabList
            selectedValue={currentTab}
            onTabSelect={handleTabSelect}
            size="medium" // O Fluent v9 oferece tamanhos small, medium, large
          >
            <Tab value="visualizar" icon={<Eye24Regular />}>
              Visualizar
            </Tab>
            <Tab value="adicionar" icon={<Add24Regular />}>
              Adicionar
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

      {/* BLOCO 1: INFORMAÇÕES GERAIS */}
      <div className={styles.card}>
        {/* Novo cabeçalho do Card segurando o Título e o Switch */}
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            Informações Gerais
          </Text>
          <Field orientation="horizontal" label="Produto Ativo">
            <Switch defaultChecked />
          </Field>
        </div>

        <div className={styles.grid3}>
          <div className={styles.colSpan2}>
            <Field label="Nome do Produto" required>
              <Input placeholder="Ex: Óleo de Motor 5W30" />
            </Field>
          </div>

          <div className={styles.flexRowRight}>
            <Field label="Categoria" required style={{ flex: 1 }}>
              <Combobox placeholder="Selecione uma categoria">
                <Option>Filtros</Option>
                <Option>Óleos e Lubrificantes</Option>
              </Combobox>
            </Field>
            <Button icon={<Add24Regular />} aria-label="Adicionar Categoria" />
          </div>
        </div>

        <div className={styles.grid2}>
          <Field label="Código (SKU)" required>
            <Input placeholder="Código interno" />
          </Field>
          <Field label="Código Adicional (EAN/Código de Barras)">
            <Input placeholder="Código do fabricante" />
          </Field>
        </div>
      </div>

      {/* BLOCO 2: VALORES */}
      <div className={styles.card}>
        <Text size={500} weight="semibold" className={styles.cardTitle}>
          Preificação
        </Text>

        <div className={styles.grid2}>
          <Field label="Valor de Venda (R$)" required>
            <Input type="number" placeholder="0,00" />
          </Field>
          <Field label="Valor Promocional (R$)">
            <Input type="number" placeholder="0,00" />
          </Field>
        </div>
      </div>

      {/* BLOCO 3: INFORMAÇÕES FISCAIS */}
      <div className={styles.card}>
        <Text size={500} weight="semibold" className={styles.cardTitle}>
          Informações Fiscais
        </Text>

        {/* Usamos grid de 6 colunas, e expandimos os campos maiores para ocupar 2 colunas cada */}
        <div className={styles.grid6}>
          <div className={styles.colSpan2}>
            <Field label="Origem do Produto">
              <Combobox placeholder="Selecione a origem">
                <Option>0 - Nacional</Option>
                <Option>1 - Estrangeira</Option>
              </Combobox>
            </Field>
          </div>
          <div className={styles.colSpan2}>
            <Field label="NCM">
              <Input placeholder="0000.00.00" />
            </Field>
          </div>
          <div className={styles.colSpan2}>
            <Field label="CEST">
              <Input placeholder="00.000.00" />
            </Field>
          </div>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        <div className={styles.grid2}>
          <Field label="CFOP Interno">
            <Input placeholder="Ex: 5102" />
          </Field>
          <Field label="CFOP Interestadual">
            <Input placeholder="Ex: 6102" />
          </Field>
        </div>

        <div className={styles.grid3}>
          <Field label="CST ICMS / CSOSN">
            <Combobox placeholder="Selecione">
              <Option>102 - Tributada pelo Simples</Option>
            </Combobox>
          </Field>
          <Field label="CST PIS">
            <Combobox placeholder="Selecione">
              <Option>01 - Operação Tributável</Option>
            </Combobox>
          </Field>
          <Field label="CST COFINS">
            <Combobox placeholder="Selecione">
              <Option>01 - Operação Tributável</Option>
            </Combobox>
          </Field>
        </div>

        {/* Linha densa para as alíquotas, cada input ocupa 1 espaço no grid de 6 */}
        <Text size={300} weight="medium" style={{ marginTop: '8px' }}>
          Alíquotas (%)
        </Text>
        <div className={styles.grid6}>
          <Field label="ICMS">
            <Input type="number" />
          </Field>
          <Field label="PIS">
            <Input type="number" />
          </Field>
          <Field label="COFINS">
            <Input type="number" />
          </Field>
          <Field label="IPI">
            <Input type="number" />
          </Field>
          <Field label="FCP">
            <Input type="number" />
          </Field>
          <Field label="IVA ST">
            <Input type="number" />
          </Field>
        </div>
      </div>

      {/* RODAPÉ DE AÇÕES */}
      <div className={styles.actionFooter}>
        <Button appearance="secondary" icon={<Dismiss24Regular />}>
          Cancelar
        </Button>
        <Button appearance="primary" icon={<Save24Regular />}>
          Adicionar Produto
        </Button>
      </div>
    </div>
  );
};
