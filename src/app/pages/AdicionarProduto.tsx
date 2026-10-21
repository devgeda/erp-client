// react-hook-form.
import { Controller } from 'react-hook-form';

// zod.
import { z } from 'zod';

// Produto service.
import { produtoFormSchema } from '@/features/estoque/produto.schemas.tsx';

// Formatters.
import {
  formatDate,
  formatFiscalField,
  formatInputCurrencyBRL,
} from '@/shared/utils/formatters.tsx';

// Constants.
import { FISCAL_INFO } from '@/shared/constants/fiscalInfo.ts';

// Custom hooks.
import { useAdicionarProduto } from '@/shared/hooks/useAdicionarProduto.ts';

// Custom components.
import { AdicionarProdutoCategoriaDialog } from '@/features/estoque/adicionar/AdicionarProdutoCategoriaDialog.tsx';
import { AdicionarProdutoFiscalSelect } from '@/features/estoque/adicionar/AdicionarProdutoFiscalSelect.tsx';
import { AdicionarProdutoAliquotaField } from '@/features/estoque/adicionar/AdicionarProdutoAliquotaField.tsx';
import { EstoqueDialog } from '@/features/estoque/EstoqueDialog.tsx';
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card.tsx';
import { Switch } from '@/shared/components/ui/switch.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Select } from '@/shared/components/ui/select.tsx';

// Lucide-icons
import { Plus, RotateCcw } from 'lucide-react';

export type ProdutoFormInput = z.input<typeof produtoFormSchema>;
export type ProdutoFormOutput = z.output<typeof produtoFormSchema>;

export const AdicionarProduto = () => {
  // const styles = sharedStyles();

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
    <form id={'form-adicionar-produto'} onSubmit={onSubmit} noValidate>
      {/* INFORMAÇÕES */}
      <Card className={'p-4'}>
        <CardHeader>
          <CardTitle>Informações Gerais</CardTitle>
          <CardAction>
            <Switch
              disabled={!!produtoCriadoId}
              {...register('ativo')}
              defaultChecked
            />
          </CardAction>
        </CardHeader>

        <div className={'grid grid-cols-[repeat(3, 1fr)] gap-4 items-start'}>
          <Controller
            name={'nome'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input
                {...field}
                disabled={!!produtoCriadoId}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e.target.value.toUpperCase());
                }}
                required
              />
            )}
          />

          <Controller
            name={'codigo'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input
                {...field}
                disabled={!!produtoCriadoId}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e.target.value.toUpperCase());
                }}
                required
              />
            )}
          />

          <Controller
            name={'codigoAdicional'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input
                {...field}
                disabled={!!produtoCriadoId}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e.target.value.toUpperCase());
                }}
              />
            )}
          />
        </div>
      </Card>

      {/* CATEGORIA */}
      <Card>
        <Card>
          <CardHeader>
            <CardTitle>Categoria</CardTitle>
          </CardHeader>
          <div className={'flex items-center gap-2'}>
            <Button
              disabled={!!produtoCriadoId}
              aria-label={'Adicionar Categoria'}
              onClick={() => {
                setIsCategoriaDialogOpen(true);
                atualizarCategorias();
              }}
            >
              <Plus />
              Adicionar Categoria
            </Button>
            <Button
              disabled={!!produtoCriadoId}
              aria-label={'Recarregar Categorias'}
              onClick={() => atualizarCategorias}
            >
              <RotateCcw />
            </Button>
          </div>
        </Card>

        <div className={'grid grid-cols-[repeat(3, 1fr)] gap-4 items-start'}>
          <Controller
            name={'categoriaId'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
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
      </Card>

      {/* PRECIFICAÇÃO */}
      <Card>
        <CardHeader>
          <CardTitle>Precificação</CardTitle>
        </CardHeader>

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
      </Card>

      {/* INFORMAÇÕES FISCAIS */}
      <div className={styles.card}>
        <Text size={500} weight={'semibold'} className={styles.cardTitle}>
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
        <Text size={300} weight={'medium'} style={{ marginTop: '8px' }}>
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
          appearance={'secondary'}
          icon={<Dismiss24Regular />}
          onClick={() => reset()}
          disabled={!!produtoCriadoId}
        >
          Cancelar
        </Button>
        <Button
          type={'submit'}
          appearance={'primary'}
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
                    Localização:
                    {localizacaoMap[e.localizacaoId] || 'Carregando...'}
                  </Text>
                  <Text>Quantidade: {e.quantidade}</Text>
                  <Text>Criado por: {e.criadoPor}</Text>
                  <Text>Data da criação: {formatDate(e.dataCriacao)}</Text>
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
            updateEstoquesTrigger={atualizarEstoques}
          />
        </div>
      )}
    </form>
  );
};
