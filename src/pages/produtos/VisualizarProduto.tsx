import {
  Button,
  Field,
  makeStyles,
  shorthands,
  Text,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular, Save24Regular } from '@fluentui/react-icons';

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
  label: {
    marginBottom: '6px',
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
    gap: '16px',
    alignItems: 'start',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    alignItems: 'start',
  },
  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    alignItems: 'start',
  },
  grid6: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
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

    alignItems: 'flex-start',
    ...shorthands.gap('8px'),
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: tokens.colorNeutralForeground1,
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'), // Espaço entre os botões
  },
});

export const VisualizarProduto = () => {
  const styles = useStyles();

  return (
    <>
      {/* INFORMAÇÕES */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            Informações Gerais
          </Text>

          <Field id={'ativo'} label={'Produto Ativo: '}>
            <Text> SIM (TESTE)</Text>
          </Field>
        </div>

        <div className={styles.grid3}>
          <Field id={'nome'} label="Nome do Produto">
            <Text> NOME DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'codigo'} label="Código do Produto">
            <Text> CÓDIGO DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'codigoAdicional'} label="Código Adicional">
            <Text>CÓDIGO ADICIONAL (TEXTE)</Text>
          </Field>
        </div>
      </div>
      {/* CATEGORIA */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            Categoria
          </Text>
        </div>

        <div className={styles.grid3}>
          <Field id={'categoriaId'} label="Categoria">
            <Text> CATEGORIA (TESTE)</Text>
          </Field>
        </div>
      </div>
      {/* PRECIFICAÇÃO */}
      <div className={styles.card}>
        <Text size={500} weight="semibold" className={styles.cardTitle}>
          Precificação
        </Text>

        <div className={styles.grid2}>
          <Field id={'valor'} label={'Valor (R$)'}>
            <Text> VALOR DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'valorPromocional'} label={'Valor Promocional (R$)'}>
            <Text> VALOR PROMOCIONAL DO PRODUTO (TESTE) </Text>
          </Field>
        </div>
      </div>
      {/* INFORMAÇÕES FISCAIS */}
      <div className={styles.card}>
        <Text size={500} weight="semibold" className={styles.cardTitle}>
          Informações Fiscais
        </Text>
        <div className={styles.grid3}>
          <Field id={'origemDoProduto'} label={'Origem do Produto'}>
            <Text> ORIGEM DO PRODUTO (TESTE) </Text>
          </Field>

          <Field id={'ncm'} label={'NCM'}>
            <Text>NCM DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'cest'} label={'CEST'}>
            <Text>CEST DO PRODUTO (TESTE)</Text>
          </Field>
        </div>
        <div className={styles.grid6}>
          <Field id={'cfopInterno'} label={'CFOP Interno'}>
            <Text>CFOP INTERNO DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'CFOP Interestadual'} label={'CFOP Interestadual'}>
            <Text>CFOP INTERESTADUAL DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'cstIcms'} label={'CST ICMS'}>
            <Text>CST ICMS DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'csosn'} label={'CSOSN'}>
            <Text>CSOSN DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'cstPis'} label={'CST Pis'}>
            <Text>CST PIS DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'cstCofins'} label={'CST Cofins'}>
            <Text>CST COFINS DO PRODUTO (TESTE)</Text>
          </Field>
        </div>

        {/* ALÍQUOTAS */}
        <Text size={300} weight="medium" style={{ marginTop: '8px' }}>
          Alíquotas
        </Text>

        <div className={styles.grid3}>
          <Field id={'aliquotaIcms'} label={'ICMS'}>
            <Text>ICMS DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'aliquotaPis'} label={'PIS'}>
            <Text>PIS DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'aliquotaCofins'} label={'COFINS'}>
            <Text>CONFINS DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'aliquotaIpi'} label={'IPI'}>
            <Text>IPI DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'aliquotaFcp'} label={'FCP'}>
            <Text>FCP DO PRODUTO (TESTE)</Text>
          </Field>

          <Field id={'ivaSt'} label={'IVA-ST'}>
            <Text>IVA-ST DO PRODUTO (TESTE)</Text>
          </Field>
        </div>
      </div>
      {/* RODAPÉ DE AÇÕES */}
      <div className={styles.actionFooter}>
        <Button
          appearance="secondary"
          icon={<Dismiss24Regular />}
          onClick={() => {}}
        >
          Cancelar
        </Button>
        <Button appearance="primary" icon={<Save24Regular />}>
          Adicionar Produto
        </Button>
      </div>
    </>
  );
};
