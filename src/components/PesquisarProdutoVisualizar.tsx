import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  type JSXElement,
  makeStyles,
  shorthands,
  Text,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import type { ProdutoResponseDTO } from '@/api/produtos/produto.types.tsx';
import { formatCurrencyBRL, formatPercent } from '@/utils/formatters.tsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '16px',
    marginTop: '16px',
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
    ...shorthands.gap('8px'),
  },
});
type PesquisarProdutoVisualizarProps = {
  produto: ProdutoResponseDTO;
  categoria: string;
  onClose: () => void;
};

export const PesquisarProdutoVisualizar = ({
  produto,
  categoria,
  onClose,
}: PesquisarProdutoVisualizarProps): JSXElement => {
  const styles = useStyles();

  return (
    <>
      <DrawerHeader>
        <Button
          appearance={'subtle'}
          icon={<Dismiss24Regular />}
          onClick={onClose}
        />
        <DrawerHeaderTitle className={styles.cardTitle}>
          Visualizar Informações de {produto.nome}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div className={styles.root}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Text size={500} weight="semibold" className={styles.cardTitle}>
                Informações Gerais
              </Text>

              <Field id={'ativo'} label={'PRODUTO ATIVO:'}>
                <Text>{produto.ativo ? 'SIM' : 'NÃO'}</Text>
              </Field>
            </div>

            <div className={styles.grid3}>
              <Field id={'nome'} label="NOME DO PRODUTO:">
                <Text>{produto.nome}</Text>
              </Field>

              <Field id={'codigo'} label="CÓDIGO DO PRODUTO:">
                <Text>{produto.codigo}</Text>
              </Field>

              <Field id={'codigoAdicional'} label="CÓDIGO ADICIONAL:">
                <Text>{produto.codigoAdicional}</Text>
              </Field>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Text size={500} weight="semibold" className={styles.cardTitle}>
                Categoria
              </Text>
            </div>

            <div className={styles.grid3}>
              <Field id={'categoria'} label="CATEGORIA DO PRODUTO:">
                <Text>{categoria}</Text>
              </Field>
            </div>
          </div>
          <div className={styles.card}>
            <Text size={500} weight="semibold" className={styles.cardTitle}>
              Precificação
            </Text>

            <div className={styles.grid2}>
              <Field id={'valor'} label={'VALOR:'}>
                <Text>{formatCurrencyBRL(produto.valor)}</Text>
              </Field>

              <Field id={'valorPromocional'} label={'VALOR PROMOCIONAL:'}>
                <Text>{formatCurrencyBRL(produto.valorPromocional)}</Text>
              </Field>
            </div>
          </div>
          <div className={styles.card}>
            <Text size={500} weight="semibold" className={styles.cardTitle}>
              Informações Fiscais
            </Text>
            <div className={styles.grid3}>
              <Field id={'origemDoProduto'} label={'ORIGEM DO PRODUTO:'}>
                <Text>{produto.origemDoProduto}</Text>
              </Field>

              <Field id={'ncm'} label={'NCM:'}>
                <Text>{produto.ncm}</Text>
              </Field>

              <Field id={'cest'} label={'CEST:'}>
                <Text>{produto.cest}</Text>
              </Field>
            </div>
            <div className={styles.grid6}>
              <Field id={'cfopInterno'} label={'CFOP INTERNO:'}>
                <Text>{produto.cfopInterno}</Text>
              </Field>

              <Field id={'cfopInterestadual'} label={'CFOP INTERESTADUAL:'}>
                <Text>{produto.cfopInterestadual}</Text>
              </Field>

              <Field id={'cstIcms'} label={'CST ICMS:'}>
                <Text>{produto.cstIcms}</Text>
              </Field>

              <Field id={'csosn'} label={'CSOSN:'}>
                <Text>{produto.csosn}</Text>
              </Field>

              <Field id={'cstPis'} label={'CST PIS:'}>
                <Text>{produto.cstPis}</Text>
              </Field>

              <Field id={'cstCofins'} label={'CST COFINS:'}>
                <Text>{produto.cstCofins}</Text>
              </Field>
            </div>

            {/* ALÍQUOTAS */}
            <Text size={300} weight="medium" style={{ marginTop: '8px' }}>
              Alíquotas
            </Text>

            <div className={styles.grid3}>
              <Field id={'aliquotaIcms'} label={'ICMS:'}>
                <Text>{`${produto.aliquotaIcms} %`}</Text>
              </Field>

              <Field id={'aliquotaPis'} label={'PIS:'}>
                <Text>{produto.aliquotaPis}</Text>
              </Field>

              <Field id={'aliquotaCofins'} label={'COFINS:'}>
                <Text>{produto.aliquotaCofins}</Text>
              </Field>

              <Field id={'aliquotaIpi'} label={'IPI:'}>
                <Text>{produto.aliquotaIpi}</Text>
              </Field>

              <Field id={'aliquotaFcp'} label={'FCP:'}>
                <Text>{produto.aliquotaFcp}</Text>
              </Field>

              <Field id={'ivaSt'} label={'IVA-ST:'}>
                <Text>{`${formatPercent(produto.ivaSt)} %`}</Text>
              </Field>
            </div>
          </div>
        </div>
      </DrawerBody>
    </>
  );
};
