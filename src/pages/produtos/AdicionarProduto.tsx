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
  Text,
  tokens,
} from '@fluentui/react-components';
import {
  Add24Regular,
  Dismiss24Regular,
  Save24Regular,
} from '@fluentui/react-icons';
import { useForm } from 'react-hook-form';
import { produtoFormSchema } from '@/api/produtos/produto.schemas.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('24px'),
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
  },
  switch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
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
    pointerEvents: 'none',
    cursor: 'default',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('16px'),
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    alignItems: 'start',
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

export const AdicionarProduto = () => {
  const styles = useStyles();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof produtoFormSchema>>({
    resolver: zodResolver(produtoFormSchema),
    mode: 'onChange',
    defaultValues: {
      produtoNome: '',
      produtoCodigo: '',
      produtoCodigoAdicional: '',
      produtoValor: '',
      produtoValorPromocional: '',
      produtoCategoriaId: '',
      produtoAtivo: true,
    },
  });

  return (
    <form id="form-adicionar-produto" className={styles.root}>
      <div className={styles.card}>
        {/* Novo cabeçalho do Card segurando o Título e o Switch */}
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            Informações Gerais
          </Text>

          <Field
            orientation="horizontal"
            label="Produto Ativo"
            className={styles.switch}
          >
            <Switch defaultChecked />
          </Field>
        </div>

        <div className={styles.grid3}>
          <div className={styles.colSpan2}>
            <Field
              label="Nome do Produto"
              validationState={errors.produtoNome ? 'error' : 'none'}
              validationMessage={errors.produtoNome?.message}
              required
            >
              <Input {...register('produtoNome')} />
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
    </form>
  );
};
