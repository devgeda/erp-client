import {
  Button,
  Field,
  InfoLabel,
  Input,
  Label,
  Link,
  makeStyles,
  Select,
  shorthands,
  Switch,
  Text,
  tokens,
} from '@fluentui/react-components';
import {
  Add24Regular,
  ArrowRepeatAll20Regular,
  Dismiss24Regular,
  Save24Regular,
} from '@fluentui/react-icons';
import { Controller, useForm } from 'react-hook-form';
import { produtoFormSchema } from '@/api/produtos/produto.schemas.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import type { CategoriaResponseDTO } from '@/api/categorias/categoria.types.tsx';
import { obterCategoria } from '@/api/categorias/categoria.service.tsx';
import { AdicionarProdutoCategoriaDialog } from '@/components/AdicionarProdutoCategoriaDialog.tsx';
import {
  formatCurrencyBRL,
  formatFiscalField,
  parseCurrencyToNumber,
} from '@/utils/formatters.tsx';
import { AdicionarProdutoFiscalSelect } from '@/components/AdicionarProdutoFiscalSelect.tsx';
import { criarProduto } from '@/api/produtos/produto.service.tsx';
import { AdicionarProdutoAliquotaField } from '@/components/AdicionarProdutoAliquotaField.tsx';
import { FISCAL_INFO } from '@/constants/fiscalInfo.ts';

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

export type ProdutoFormInput = z.input<typeof produtoFormSchema>;
export type ProdutoFormOutput = z.output<typeof produtoFormSchema>;

export const AdicionarProduto = () => {
  const styles = useStyles();
  const [categorias, setCategorias] = useState<CategoriaResponseDTO[]>([]);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);
  const [updateCategorias, setUpdateCategorias] = useState(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        setCarregandoCategorias(true);
        const categoriasData = await obterCategoria();
        categoriasData.sort((a, b) => a.nome.localeCompare(b.nome));
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      } finally {
        setCarregandoCategorias(false);
      }
    }
    carregarCategorias();
  }, [updateCategorias]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProdutoFormInput>({
    mode: 'onChange',
    resolver: zodResolver(produtoFormSchema),
    defaultValues: {
      nome: '',
      codigo: '',
      codigoAdicional: '',
      valor: '',
      valorPromocional: '',
      categoriaId: '',
      ativo: true,
      origemDoProduto: '',
      cfopInterno: '',
    },
  });

  async function onProdutoFormSubmit(data: ProdutoFormOutput) {
    const payloadParaBackend = {
      ...data,

      codigoAdicional: data.codigoAdicional ?? '',

      valor: data.valor ? parseCurrencyToNumber(data.valor).toFixed(2) : '',

      valorPromocional: data.valorPromocional
        ? parseCurrencyToNumber(data.valorPromocional).toFixed(2)
        : '',

      ncm: data.ncm.replaceAll('.', ''),
      cest: data.cest.replaceAll('.', ''),
    };

    try {
      await criarProduto(payloadParaBackend);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(payloadParaBackend);
    }
  }

  return (
    <form
      id="form-adicionar-produto"
      className={styles.root}
      onSubmit={handleSubmit(onProdutoFormSubmit)}
      noValidate
    >
      {/* INFORMAÇÕES */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            Informações Gerais
          </Text>

          <Field
            id={'ativo'}
            validationState={errors.ativo ? 'error' : 'none'}
            validationMessage={errors.ativo?.message}
          >
            <Switch
              label={'Produto Ativo'}
              {...register('ativo')}
              defaultChecked
            />
          </Field>
        </div>

        <div className={styles.grid3}>
          <Controller
            name={'nome'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'nome'}
                label="Nome do Produto"
                validationState={errors.nome ? 'error' : 'none'}
                validationMessage={errors.nome?.message}
                required
              >
                <Input
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                />
              </Field>
            )}
          />

          <Controller
            name={'codigo'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'codigo'}
                label="Código do Produto"
                validationState={errors.codigo ? 'error' : 'none'}
                validationMessage={errors.codigo?.message}
                required
              >
                <Input
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                />
              </Field>
            )}
          />

          <Controller
            name={'codigoAdicional'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'codigoAdicional'}
                label="Código Adicional"
                validationState={errors.codigoAdicional ? 'error' : 'none'}
                validationMessage={errors.codigoAdicional?.message}
              >
                <Input
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                />
              </Field>
            )}
          />
        </div>
      </div>

      {/* CATEGORIA */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            Categoria
          </Text>
          <div className={styles.buttonGroup}>
            <Button
              icon={<Add24Regular />}
              aria-label="Adicionar Categoria"
              onClick={() => setIsDialogOpen(true)}
            >
              Adicionar Categoria
            </Button>
            <Button
              icon={<ArrowRepeatAll20Regular />}
              onClick={() => {
                setUpdateCategorias((prev) => prev + 1);
              }}
            />
          </div>
        </div>

        <div className={styles.grid6}>
          <div className={styles.colSpan2}>
            <Controller
              name={'categoriaId'}
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <Field
                  id={'categoriaId'}
                  label="Categoria"
                  validationState={errors.categoriaId ? 'error' : 'none'}
                  validationMessage={errors.categoriaId?.message}
                  required
                >
                  <Select
                    disabled={carregandoCategorias}
                    value={field.value || ''}
                    onChange={(_e, data) => field.onChange(data.value)}
                  >
                    <option value={''}>
                      {carregandoCategorias
                        ? 'Carregando...'
                        : 'Selecione uma categoria'}
                    </option>
                    {categorias.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </Select>
                  <AdicionarProdutoCategoriaDialog
                    isOpen={isDialogOpen}
                    onClose={() => {
                      setIsDialogOpen(false);
                      setUpdateCategorias((prev) => prev + 1);
                    }}
                  />
                </Field>
              )}
            ></Controller>
          </div>
        </div>
      </div>

      {/* PRECIFICAÇÃO */}
      <div className={styles.card}>
        <Text size={500} weight="semibold" className={styles.cardTitle}>
          Precificação
        </Text>

        <div className={styles.grid2}>
          <Controller
            name={'valor'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'valor'}
                label={'Valor (R$)'}
                validationState={errors.valor ? 'error' : 'none'}
                validationMessage={errors.valor?.message}
                required
              >
                <Input
                  {...field}
                  placeholder={'R$ 0,00'}
                  value={field.value.toString() || ''}
                  onChange={(e) => {
                    const formatted = formatCurrencyBRL(e.target.value);
                    field.onChange(formatted);
                  }}
                />
              </Field>
            )}
          />
          <Controller
            name={'valorPromocional'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'valorPromocional'}
                label={'Valor Promocional (R$)'}
                validationState={errors.valorPromocional ? 'error' : 'none'}
                validationMessage={errors.valorPromocional?.message}
              >
                <Input
                  {...field}
                  placeholder={'R$ 0,00'}
                  value={field.value.toString() || ''}
                  onChange={(e) => {
                    const formatted = formatCurrencyBRL(e.target.value);
                    field.onChange(formatted);
                  }}
                />
              </Field>
            )}
          />
        </div>
      </div>

      {/* INFORMAÇÕES FISCAIS */}
      <div className={styles.card}>
        <Text size={500} weight="semibold" className={styles.cardTitle}>
          Informações Fiscais
        </Text>
        <div className={styles.grid3}>
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/origem-do-produto'}
            label={'Origem do Produto'}
            infoLabelText={FISCAL_INFO.ORIGEM_DO_PRODUTO}
            infoLabelAddon={
              <Link
                href={
                  'https://app1.sefaz.mt.gov.br/Sistema/legislacao/regulamentoicms.nsf/cc90333e16d28a8c0425736e0076800a/c560e4b8bc6af2ea04256f0f006df104?OpenDocument'
                }
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                Tabela A do ICMS - Fonte: sefaz.mt.gov.br
              </Link>
            }
            nome={'origemDoProduto'}
            control={control}
          />
          <Controller
            name={'ncm'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'ncm'}
                validationState={errors.ncm ? 'error' : 'none'}
                validationMessage={errors.ncm?.message}
              >
                <div className={styles.label}>
                  <Label>NCM</Label>
                  <InfoLabel info={<>{FISCAL_INFO.NCM}</>} />
                </div>
                <Input
                  {...field}
                  placeholder={'0000.00.00'}
                  value={field.value || ''}
                  onChange={(e) => {
                    const maskValue = formatFiscalField(e.target.value, 'ncm');
                    field.onChange(maskValue);
                  }}
                />
              </Field>
            )}
          />
          <Controller
            name={'cest'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'cest'}
                validationState={errors.cest ? 'error' : 'none'}
                validationMessage={errors.cest?.message}
              >
                <div className={styles.label}>
                  <Label>CEST</Label>
                  <InfoLabel info={<>{FISCAL_INFO.CEST}</>} />
                </div>
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder={'00.000.00'}
                  onChange={(e) => {
                    const maskValue = formatFiscalField(e.target.value, 'cest');
                    field.onChange(maskValue);
                  }}
                />
              </Field>
            )}
          />
        </div>
        <div className={styles.grid6}>
          <AdicionarProdutoFiscalSelect
            nome={'cfopInterno'}
            infoLabelText={FISCAL_INFO.CFOP_INTERNO}
            endPointPath={'/produtos/cfop-interno'}
            label={'CFOP Interno'}
            control={control}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/cfop-interestadual'}
            label={'CFOP Interestadual'}
            infoLabelText={FISCAL_INFO.CFOP_INTERESTADUAL}
            nome={'cfopInterestadual'}
            control={control}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/cst-icms'}
            label={'CST ICMS'}
            infoLabelText={FISCAL_INFO.CST_ICMS}
            nome={'cstIcms'}
            control={control}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/csosn'}
            label={'CSOSN'}
            infoLabelText={FISCAL_INFO.CSOSN}
            nome={'csosn'}
            control={control}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/cst-pis'}
            label={'CST Pis'}
            infoLabelText={FISCAL_INFO.CST_PIS}
            nome={'cstPis'}
            control={control}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/cst-cofins'}
            label={'CST Cofins'}
            infoLabelText={FISCAL_INFO.CST_COFINS}
            nome={'cstCofins'}
            control={control}
          />
        </div>

        {/* ALÍQUOTAS */}
        <Text size={300} weight="medium" style={{ marginTop: '8px' }}>
          Alíquotas
        </Text>

        <div className={styles.grid3}>
          <AdicionarProdutoAliquotaField
            nome={'aliquotaIcms'}
            label={'ICMS'}
            infoLabelText={FISCAL_INFO.ICMS}
            control={control}
          />

          <AdicionarProdutoAliquotaField
            nome={'aliquotaPis'}
            label={'PIS'}
            infoLabelText={FISCAL_INFO.PIS}
            control={control}
          />

          <AdicionarProdutoAliquotaField
            nome={'aliquotaCofins'}
            label={'COFINS'}
            infoLabelText={FISCAL_INFO.COFINS}
            control={control}
          />
          <AdicionarProdutoAliquotaField
            nome={'aliquotaIpi'}
            label={'IPI'}
            infoLabelText={FISCAL_INFO.IPI}
            infoLabelAddon={
              <Link
                href={
                  'https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/legislacao/documentos-e-arquivos/tipi.pdf'
                }
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                Tabela TIPI - Fonte: Gov.br
              </Link>
            }
            control={control}
          />
          <AdicionarProdutoAliquotaField
            nome={'aliquotaFcp'}
            label={'FCP'}
            infoLabelText={FISCAL_INFO.FCP}
            control={control}
          />
          <AdicionarProdutoAliquotaField
            nome={'ivaSt'}
            label={'IVA-ST'}
            infoLabelText={FISCAL_INFO.IVA_ST}
            control={control}
          />
        </div>
      </div>

      {/* RODAPÉ DE AÇÕES */}
      <div className={styles.actionFooter}>
        <Button
          type={'reset'}
          appearance="secondary"
          icon={<Dismiss24Regular />}
        >
          Cancelar
        </Button>
        <Button type={'submit'} appearance="primary" icon={<Save24Regular />}>
          Adicionar Produto
        </Button>
      </div>
    </form>
  );
};
