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
import { EstoqueDialog } from '@/features/estoque/EstoqueDialog.tsx';
import { AdicionarProdutoCategoriaDialog } from '@/features/estoque/adicionar/AdicionarProdutoCategoriaDialog.tsx';
import { AdicionarProdutoFiscalSelect } from '@/features/estoque/adicionar/AdicionarProdutoFiscalSelect.tsx';
import { AdicionarProdutoAliquotaField } from '@/features/estoque/adicionar/AdicionarProdutoAliquotaField.tsx';

// shadcn/ui.
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
import { Label } from '@/shared/components/ui/label.tsx';

// Lucide-icons
import { Plus, RotateCcw, SaveCheck, X } from 'lucide-react';

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
    form: { register, control, reset },
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

        <div className={'grid grid-cols-[1fr 1fr] gap-4 items-start'}>
          <Controller
            name={'valor'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
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
            )}
          />
          <Controller
            name={'valorPromocional'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
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
            )}
          />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Fiscais</CardTitle>
        </CardHeader>
        <div className={'grid grid-cols-[repeat(3, 1fr)] gap-4 items-start'}>
          <AdicionarProdutoFiscalSelect
            disabled={!!produtoCriadoId}
            endPointPath={'/produtos/origem-do-produto'}
            label={'Origem do Produto'}
            infoLabelText={FISCAL_INFO.ORIGEM_DO_PRODUTO}
            infoLabelAddon={
              <a
                href={
                  'https://app1.sefaz.mt.gov.br/Sistema/legislacao/regulamentoicms.nsf/cc90333e16d28a8c0425736e0076800a/c560e4b8bc6af2ea04256f0f006df104?OpenDocument'
                }
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                Tabela A do ICMS - Fonte: sefaz.mt.gov.br
              </a>
            }
            nome={'origemDoProduto'}
            control={control}
          />
          <Controller
            name={'ncm'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
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
            )}
          />
          <Controller
            name={'cest'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
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
            )}
          />
        </div>
        <div
          className={
            'grid grid-cols-[repeat(3, minmax(0, 1fr))] gap-4 items-start'
          }
        >
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

        <CardHeader>
          <CardTitle>Alíquotas</CardTitle>
        </CardHeader>

        <div className={'grid grid-cols-[repeat(3, 1fr)] gap-4 items-start'}>
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
              <a
                href={
                  'https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/legislacao/documentos-e-arquivos/tipi.pdf'
                }
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                Tabela TIPI - Fonte: Gov.br
              </a>
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
      </Card>
      <div
        className={
          'flex justify-end gap-3 mt-4 p-4 border-t border-t-solid border-t-neutral-200'
        }
      >
        <Button
          type={'reset'}
          variant={'secondary'}
          onClick={() => reset()}
          disabled={!!produtoCriadoId}
        >
          <X />
          Cancelar
        </Button>
        <Button
          type={'submit'}
          variant={'default'}
          disabled={!!produtoCriadoId}
        >
          <SaveCheck />
          Adicionar Produto
        </Button>
      </div>

      {produtoCriadoId && (
        <Card>
          <CardHeader>
            <CardTitle>Localização</CardTitle>
            <CardAction>
              <Button
                aria-label={'Adicionar Localização'}
                onClick={() => {
                  setIsEstoqueDialogOpen(true);
                  atualizarEstoques();
                }}
              >
                <Plus />
                Adicionar Localização
              </Button>
              <Button
                aria-label={'Recarregar Localizações'}
                onClick={() => atualizarEstoques()}
              >
                <RotateCcw />
              </Button>
            </CardAction>
          </CardHeader>
          <div className={'flex flex-col justify-between'}>
            {estoques?.length === 0 ? (
              <Label>
                Nenhum produto em estoque encontrado, cadastre a partir de
                "Adicionar Localização" ou atualize através do botão recarregar.
              </Label>
            ) : (
              estoques?.map((e) => (
                <div
                  key={e.id}
                  className={
                    'flex justify-between p-2 border-b-solid border-b-neutral-100'
                  }
                >
                  <Label>
                    Localização:
                    {localizacaoMap[e.localizacaoId] || 'Carregando...'}
                  </Label>
                  <Label>Quantidade: {e.quantidade}</Label>
                  <Label>Criado por: {e.criadoPor}</Label>
                  <Label>Data da criação: {formatDate(e.dataCriacao)}</Label>
                  <Label>Ativo: {e.ativo ? 'SIM' : 'NÃO'}</Label>
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
        </Card>
      )}
    </form>
  );
};
