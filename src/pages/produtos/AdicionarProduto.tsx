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
import { Controller, useForm } from 'react-hook-form';
import { produtoFormSchema } from '@/api/produtos/produto.schemas.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formatCurrencyBRL } from '@/utils/formatters.tsx';

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
    gap: '16px',
    alignItems: 'start',
  },
});

export const AdicionarProduto = () => {
  const styles = useStyles();

  const {
    control,
    formState: { errors },
  } = useForm<z.infer<typeof produtoFormSchema>>({
    resolver: zodResolver(produtoFormSchema),
    mode: 'onChange',
  });

  return (
    <form id="form-adicionar-produto" className={styles.root}>
      <div className={styles.card}>
        {/* CABEÇALHO(Informações Gerais) - TEXT, FIELD<SWITCH>" */}
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

        {/* NOME DO PRODUTO - CONTROLLER<FIELD<INPUT>>" */}
        <div className={styles.grid3}>
          <div className={styles.colSpan2}>
            {/* NOME DO PRODUTO - CONTROLLER<FIELD<INPUT>>" */}
            <Controller
              name="produtoNome"
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <Field
                  id={'produtoNome'}
                  label="Nome do Produto"
                  validationState={errors.produtoNome ? 'error' : 'none'}
                  validationMessage={errors.produtoNome?.message}
                  required
                >
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                    placeholder={'Insira o nome do produto ...'}
                  />
                </Field>
              )}
            />
          </div>

          <div className={styles.flexRowRight}>
            {/* CATEGORIA DO PRODUTO - FIELD<COMBOBOX<OPTION, OPTION>>, BUTTON" */}
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
          {/* CÓDIGO DO PRODUTO - CONTROLLER<FIELD<INPUT>>" */}
          <Controller
            name={'produtoCodigo'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'produtoCodigo'}
                label="Código"
                validationState={errors.produtoCodigo ? 'error' : 'none'}
                validationMessage={errors.produtoCodigo?.message}
                required
              >
                <Input
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                  placeholder="Insira o código do produto ..."
                />
              </Field>
            )}
          />

          {/* CÓDIGO ADICIONAL DO PRODUTO - CONTROLLER<FIELD<INPUT>>" */}
          <Controller
            name={'produtoCodigoAdicional'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'produtoCodigoAdicional'}
                label="Código Adicional"
                validationState={
                  errors.produtoCodigoAdicional ? 'error' : 'none'
                }
                validationMessage={errors.produtoCodigoAdicional?.message}
              >
                <Input
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                  placeholder="Código do fabricante"
                />
              </Field>
            )}
          />
        </div>
      </div>

      {/* CABEÇALHO(Preificação) - TEXT" */}
      <div className={styles.card}>
        <Text size={500} weight="semibold" className={styles.cardTitle}>
          Preificação
        </Text>

        <div className={styles.grid2}>
          <Controller
            name="produtoValor"
            control={control}
            defaultValue={0.0}
            render={({ field, fieldState }) => (
              <Field
                id={'produtoValor'}
                label="Valor (R$)"
                validationState={fieldState.error ? 'error' : 'none'}
                validationMessage={fieldState.error?.message}
              >
                <Input
                  {...field}
                  value={field.value ? formatCurrencyBRL(field.value) : ''}
                  placeholder="R$ 0,00"
                />
              </Field>
            )}
          />
          <Controller
            name="produtoValorPromocional"
            control={control}
            defaultValue={0.0}
            render={({ field }) => (
              <Field
                id={'produtoValorPromocional'}
                label="Valor (R$)"
                validationState={
                  errors.produtoValorPromocional ? 'error' : 'none'
                }
                validationMessage={errors.produtoValorPromocional?.message}
              >
                <Input
                  {...field}
                  value={field.value ? formatCurrencyBRL(field.value) : ''}
                  placeholder="R$ 0,00"
                />
              </Field>
            )}
          />
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
