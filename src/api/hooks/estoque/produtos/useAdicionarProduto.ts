import { useAppToast } from '@/api/context/ToastContext.tsx';
import { useEffect, useState } from 'react';
import type { CategoriaResponseDTO } from '@/api/categorias/categoria.types.tsx';
import type { EstoqueResponseDTO } from '@/api/estoque/estoque.types.tsx';
import { produtoFormSchema } from '@/api/produtos/produto.schemas.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import type {
  ProdutoFormInput,
  ProdutoFormOutput,
} from '@/pages/estoque/produtos/AdicionarProduto.tsx';
import { useForm } from 'react-hook-form';
import type { AppError } from '@/api/client.tsx';
import { obterCategorias } from '@/api/categorias/categoria.service.tsx';
import { obterLocalizacaoPorId } from '@/api/localizacao/localizacao.service.tsx';
import { obterEstoques } from '@/api/estoque/estoque.service.tsx';
import { criarProduto } from '@/api/produtos/produto.service.tsx';
import { parseCurrencyToNumber } from '@/utils/formatters.tsx';

/**
 * Hook customizado para a lógica do componente de criação de produtos.
 *
 * -> Gerencia o estado do componente.
 *
 * -> Busca de categorias, estoques de produtos e localizações físicas.
 *
 * -> Validação do formulário de criação.
 *
 * -> Gerencia o evento de envio para o backend.
 */
export const useAdicionarProduto = () => {
  /** Implementa o hook useAppToast para gerenciar as notificações via Toast. */
  const notify = useAppToast();

  // Estado do produto após a criação.
  const [produtoCriadoId, setProdutoCriadoId] = useState<string | null>(null);

  // Estados da categoria.
  const [categorias, setCategorias] = useState<CategoriaResponseDTO[]>([]);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);
  const [isCategoriaDialogOpen, setIsCategoriaDialogOpen] = useState(false);
  const [updateCategoriasTrigger, setUpdateCategoriasTrigger] = useState(0);

  // Estados do estoque.
  const [estoques, setEstoques] = useState<EstoqueResponseDTO[]>([]);
  const [localizacaoMap, setLocalizacaoMap] = useState<Record<string, string>>(
    {}
  );
  const [carregandoEstoques, setCarregandoEstoques] = useState(true);
  const [isEstoqueDialogOpen, setIsEstoqueDialogOpen] = useState(false);
  const [updateEstoquesTrigger, setUpdateEstoqueTrigger] = useState(0);

  /** Condiguração do formulário. */
  const form = useForm<ProdutoFormInput>({
    mode: 'onChange',
    resolver: zodResolver(produtoFormSchema),
  });

  // Use Effect de carregamento de categorias.
  useEffect(() => {
    async function carregarCategorias() {
      try {
        setCarregandoCategorias(true);

        const categoriasData = await obterCategorias();

        categoriasData.sort((a, b) => a.nome.localeCompare(b.nome));

        setCategorias(categoriasData);
      } catch (e) {
        const error = e as AppError;
        notify({
          intent: error.intent || 'error',
          title: 'Carregar produtos',
          body: error.message || 'Falha ao processar a requisição.',
        });
        console.error('Erro ao carregar categorias:', error);
      } finally {
        setCarregandoCategorias(false);
      }
    }
    void carregarCategorias().catch(console.error);
  }, [updateCategoriasTrigger, notify]);

  // Use Effect de carregamento de estoques.
  useEffect(() => {
    if (!produtoCriadoId) return;

    async function carregarEstoques() {
      try {
        setCarregandoEstoques(true);

        const estoques = await obterEstoques();

        const localizacoesDictionary: Record<string, string> = {};

        const estoquesDoProduto = estoques.filter(
          (est) => est.produtoId === produtoCriadoId
        );

        await Promise.all(
          estoquesDoProduto.map(async (est) => {
            if (!localizacoesDictionary[est.localizacaoId]) {
              const loc = await obterLocalizacaoPorId(est.localizacaoId);
              localizacoesDictionary[est.localizacaoId] = loc.codigo;
            }
          })
        );

        setLocalizacaoMap(localizacoesDictionary);
        setEstoques(estoquesDoProduto);
      } catch (e) {
        const error = e as AppError;
        notify({
          intent: error.intent || 'error',
          title: 'Carregar estoques',
          body: error.message || 'Falha ao processar a requisição.',
        });
        console.error('Erro ao carregar estoques:', error);
      } finally {
        setCarregandoEstoques(false);
      }
    }

    void carregarEstoques().catch(console.error);
  }, [updateEstoquesTrigger, notify]);

  /**
   * onSubmit para enviar ao backend.
   *
   * Corrige os dados usando um payload antes de enviar ao backend.
   * */
  async function onProdutoFormSubmit(data: ProdutoFormOutput) {
    const payloadParaBackend = {
      ...data,

      codigoAdicional: data.codigoAdicional ?? '',
      valor: data.valor ? parseCurrencyToNumber(data.valor).toFixed(2) : '',
      valorPromocional: data.valorPromocional
        ? parseCurrencyToNumber(data.valorPromocional).toFixed(2)
        : '',
      ncm: data.ncm ? data.ncm.replaceAll('.', '') : '00000000',
      cest: data.cest ? data.cest.replaceAll('.', '') : '0000000',
      origemDoProduto: data.origemDoProduto ? data.origemDoProduto : '0',
      cfopInterno: data.cfopInterno ? data.cfopInterno : '5101',
      cfopInterestadual: data.cfopInterestadual
        ? data.cfopInterestadual
        : '6101',
      cstIcms: data.cstIcms ? data.cstIcms : '00',
      csosn: data.csosn ? data.csosn : '101',
      cstPis: data.cstPis ? data.cstPis : '01',
      cstCofins: data.cstCofins ? data.cstCofins : '01',
    };

    try {
      const produtoSalvo = await criarProduto(payloadParaBackend);

      setProdutoCriadoId(produtoSalvo.id);
      notify({
        intent: 'success',
        title: 'Adicionar produto',
        body: `Produto  adicionado com sucesso.`,
        subtitle: `Código: ${data.codigo}, Descrição: ${data.nome}.`,
      });
    } catch (e) {
      const error = e as AppError;

      notify({
        intent: error.intent || 'error',
        title: 'Adicionar produto',
        body: error.message || 'Falha ao processar a requisição.',
      });
      console.log(error);
    }
  }

  return {
    produtoCriadoId,
    categorias,
    carregandoCategorias,
    isCategoriaDialogOpen,
    setIsCategoriaDialogOpen,
    atualizarCategorias: () => setUpdateCategoriasTrigger((prev) => prev + 1),

    estoques,
    localizacaoMap,
    carregandoEstoques,
    isEstoqueDialogOpen,
    setIsEstoqueDialogOpen,
    atualizarEstoques: () => setUpdateEstoqueTrigger((prev) => prev + 1),

    form,
    onSubmit: form.handleSubmit(onProdutoFormSubmit),
  };
};
