import {
  Button,
  Field,
  InfoLabel,
  Input,
  Label,
  Link,
  Select,
  Switch,
  Text,
} from '@fluentui/react-components';
import {
  Add24Regular,
  ArrowRepeatAll20Regular,
  Dismiss24Regular,
  Save24Regular,
} from '@fluentui/react-icons';
import { Controller } from 'react-hook-form';
import { produtoFormSchema } from '@/api/produtos/produto.schemas.tsx';
import { z } from 'zod';
import { AdicionarProdutoCategoriaDialog } from '@/components/produtos/AdicionarProdutoCategoriaDialog.tsx';
import {
  formatFiscalField,
  formatInputCurrencyBRL,
} from '@/utils/formatters.tsx';
import { AdicionarProdutoFiscalSelect } from '@/components/produtos/AdicionarProdutoFiscalSelect.tsx';
import { AdicionarProdutoAliquotaField } from '@/components/produtos/AdicionarProdutoAliquotaField.tsx';
import { FISCAL_INFO } from '@/constants/fiscalInfo.ts';
import { sharedStyles } from '@/syles/shared/sharedStyles.ts';
import { EstoqueDialog } from '@/components/produtos/EstoqueDialog.tsx';
import { useAdicionarProduto } from '@/api/hooks/estoque/produtos/useAdicionarProduto.ts';

export type ProdutoFormInput = z.input<typeof produtoFormSchema>;
export type ProdutoFormOutput = z.output<typeof produtoFormSchema>;

export const AdicionarProduto = () => {
  const styles = sharedStyles();

  const {
    produtoCriadoId,
    categorias,
    carregandoCategorias,
    isCategoriaDialogOpen,
    setIsCategoriaDialogOpen,
    estoques,
    isEstoqueDialogOpen,
    setIsEstoqueDialogOpen,
    localizacaoMap,
    form: {
      register,
      control,
      formState: { errors },
      reset,
    },
    onSubmit,
    atualizarCategorias,
    atualizarEstoques,
  } = useAdicionarProduto();

  return (
    <form
      id="form-adicionar-produto"
      className={styles.root}
      onSubmit={onSubmit}
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
            label={'Produto Ativo'}
            className={styles.switch}
            validationState={errors.ativo ? 'error' : 'none'}
            validationMessage={errors.ativo?.message}
            required
          >
            <Switch
              disabled={!!produtoCriadoId}
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
                  disabled={!!produtoCriadoId}
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
                  disabled={!!produtoCriadoId}
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
                  disabled={!!produtoCriadoId}
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
              disabled={!!produtoCriadoId}
              icon={<Add24Regular />}
              aria-label={'Adicionar Categoria'}
              onClick={() => {
                setIsCategoriaDialogOpen(true);
                atualizarCategorias();
              }}
            >
              Adicionar Categoria
            </Button>
            <Button
              disabled={!!produtoCriadoId}
              icon={<ArrowRepeatAll20Regular />}
              aria-label={'Recarregar Categorias'}
              onClick={() => atualizarCategorias}
            />
          </div>
        </div>

        <div className={styles.grid3}>
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
                  disabled={carregandoCategorias || !!produtoCriadoId}
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
              </Field>
            )}
          ></Controller>
        </div>
        <AdicionarProdutoCategoriaDialog
          isOpen={isCategoriaDialogOpen}
          onClose={() => {
            setIsCategoriaDialogOpen(false);
            atualizarEstoques();
          }}
        />
      </div>

      {/* PRECIFICAÇÃO */}
      <div className={styles.card}>
        <Text size={500} weight={'semibold'} className={styles.cardTitle}>
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
                  disabled={!!produtoCriadoId}
                  placeholder={'R$ 0,00'}
                  value={field.value.toString() || ''}
                  onChange={(e) => {
                    const formatted = formatInputCurrencyBRL(e.target.value);
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
                  disabled={!!produtoCriadoId}
                  placeholder={'R$ 0,00'}
                  value={field.value.toString() || ''}
                  onChange={(e) => {
                    const formatted = formatInputCurrencyBRL(e.target.value);
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
            disabled={!!produtoCriadoId}
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
                  disabled={!!produtoCriadoId}
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
                  disabled={!!produtoCriadoId}
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
            disabled={!!produtoCriadoId}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/cfop-interestadual'}
            label={'CFOP Interestadual'}
            infoLabelText={FISCAL_INFO.CFOP_INTERESTADUAL}
            nome={'cfopInterestadual'}
            control={control}
            disabled={!!produtoCriadoId}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/cst-icms'}
            label={'CST ICMS'}
            infoLabelText={FISCAL_INFO.CST_ICMS}
            nome={'cstIcms'}
            control={control}
            disabled={!!produtoCriadoId}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/csosn'}
            label={'CSOSN'}
            infoLabelText={FISCAL_INFO.CSOSN}
            nome={'csosn'}
            control={control}
            disabled={!!produtoCriadoId}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/cst-pis'}
            label={'CST Pis'}
            infoLabelText={FISCAL_INFO.CST_PIS}
            nome={'cstPis'}
            control={control}
            disabled={!!produtoCriadoId}
          />
          <AdicionarProdutoFiscalSelect
            endPointPath={'/produtos/cst-cofins'}
            label={'CST Cofins'}
            infoLabelText={FISCAL_INFO.CST_COFINS}
            nome={'cstCofins'}
            control={control}
            disabled={!!produtoCriadoId}
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
            disabled={!!produtoCriadoId}
          />
          <AdicionarProdutoAliquotaField
            nome={'aliquotaPis'}
            label={'PIS'}
            infoLabelText={FISCAL_INFO.PIS}
            control={control}
            disabled={!!produtoCriadoId}
          />
          <AdicionarProdutoAliquotaField
            nome={'aliquotaCofins'}
            label={'COFINS'}
            infoLabelText={FISCAL_INFO.COFINS}
            control={control}
            disabled={!!produtoCriadoId}
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
            disabled={!!produtoCriadoId}
          />
          <AdicionarProdutoAliquotaField
            nome={'aliquotaFcp'}
            label={'FCP'}
            infoLabelText={FISCAL_INFO.FCP}
            control={control}
            disabled={!!produtoCriadoId}
          />
          <AdicionarProdutoAliquotaField
            nome={'ivaSt'}
            label={'IVA-ST'}
            infoLabelText={FISCAL_INFO.IVA_ST}
            control={control}
            disabled={!!produtoCriadoId}
          />
        </div>
      </div>
      <div className={styles.actionFooter}>
        <Button
          type={'reset'}
          appearance="secondary"
          icon={<Dismiss24Regular />}
          onClick={() => reset()}
          disabled={!!produtoCriadoId}
        >
          Cancelar
        </Button>
        <Button
          type={'submit'}
          appearance="primary"
          icon={<Save24Regular />}
          disabled={!!produtoCriadoId}
        >
          Adicionar Produto
        </Button>
      </div>

      {/* LOCALIZAÇÃO */}
      {produtoCriadoId && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Text size={500} weight={'semibold'} className={styles.cardTitle}>
              Localização
            </Text>
            <div className={styles.buttonGroup}>
              <Button
                icon={<Add24Regular />}
                aria-label={'Adicionar Localização'}
                onClick={() => {
                  setIsEstoqueDialogOpen(true);
                  atualizarEstoques();
                }}
              >
                Adicionar Localização
              </Button>
              <Button
                icon={<ArrowRepeatAll20Regular />}
                aria-label={'Recarregar Localizações'}
                onClick={() => atualizarEstoques()}
              />
            </div>
          </div>
          <div className={styles.content}>
            {estoques?.length === 0 ? (
              <Text>
                Nenhum produto em estoque encontrado, cadastre a partir de
                "Adicionar Localização" ou atualize através do botão recarregar.
              </Text>
            ) : (
              estoques?.map((e) => (
                <div key={e.id} className={styles.list}>
                  <Text>
                    Localização:{' '}
                    {localizacaoMap[e.localizacaoId] || 'Carregando...'}
                  </Text>
                  <Text>Quantidade: {e.quantidade}</Text>
                  <Text>Criado por: {e.criadoPor}</Text>
                  <Text>Data da criação: {e.dataCriacao}</Text>
                  <Text>Ativo: {e.ativo ? 'SIM' : 'NÃO'}</Text>
                </div>
              ))
            )}
          </div>
          <EstoqueDialog
            produtoCriadoId={produtoCriadoId}
            isOpen={isEstoqueDialogOpen}
            onClose={() => {
              setIsEstoqueDialogOpen(false);
              atualizarEstoques();
            }}
            updateLocalizacoesTrigger={atualizarEstoques}
          />
        </div>
      )}
    </form>
  );
};
