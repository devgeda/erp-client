import { useMemo, useState } from 'react';
import {
  getProdutos,
  obterProdutoById,
} from '@/features/estoque/produto.service.tsx';
import { getEstoques } from '@/features/estoque/pesquisa/estoque.service.tsx';
import { useAppToast } from '@/app/context/ToastContext.tsx';
import type {
  ProdutoBaseDTO,
  ProdutoResponseDTO,
} from '@/features/estoque/produto.types.tsx';
import { obterLocalizacaoPorId } from '@/features/estoque/localizacao/localizacao.service.tsx';
import { useQuery } from '@tanstack/react-query';
import { getCategorias } from '@/features/estoque/categorias/categoria.service.tsx';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';

interface useProdutosDataGridProps {
  tipoFiltroAtivo:
    | 'nome'
    | 'codigo'
    | 'codigoAdicional'
    | 'categoriaId'
    | 'localizacao'
    | 'quantidade'
    | 'ativo';
  termoBusca: string;
}

export const usePesquisarProduto = ({
  tipoFiltroAtivo,
  termoBusca,
}: useProdutosDataGridProps) => {
  // Implementa o hook useAppToast para gerenciar as notificações via Toast.
  const notify = useAppToast();

  // Implementa o estado do produto ativo.
  const [produtoAtivo, setProdutoAtivo] = useState<ProdutoResponseDTO | null>(
    null
  );

  // Estados do tanstack-table.
  const [sorting, setSorting] = useState<SortingState>([]);

  // Array filtrada para a tabela tanstack-table.
  const columnFilters: ColumnFiltersState = useMemo(() => {
    if (!termoBusca) return [];
    return [{ id: tipoFiltroAtivo, value: termoBusca }];
  }, [termoBusca, tipoFiltroAtivo]);

  // Estados dos Drawers.
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);

  // useQuery de listagem de produtos.
  const { data: produtos = [], isLoading: carregandoProdutos } = useQuery({
    queryKey: ['produtos'],
    queryFn: async () => await getProdutos(),
  });

  // useQuery de produto.
  const { data: produto, isLoading: carregandoProduto } = useQuery({
    queryKey: ['produto', produtoAtivo?.id],
    queryFn: async () => {
      const prod = await obterProdutoById(produtoAtivo!.id);
      notify({
        intent: 'success',
        title: 'Carregar produto',
        body: 'Produto carregado com sucesso.',
        subtitle: `Código: ${produtoAtivo!.codigo}, Descrição: ${produtoAtivo!.nome}.`,
      });
      return prod;
    },
    enabled: !!produtoAtivo, // Só roda se o drawer for aberto (produtoAtivo preenchido)
  });

  // useQuery de listagem de estoques e localizações.
  const { data: estoquesData, isLoading: carregandoEstoques } = useQuery({
    queryKey: ['estoques-localizacoes', produto?.id],
    queryFn: async () => {
      const estoques = await getEstoques();

      const estoquesDoProduto = estoques.filter(
        (est) => est.produtoId === produto?.id
      );

      const localizacoesDictionary: Record<string, string> = {};

      await Promise.all(
        estoquesDoProduto.map(async (est) => {
          if (!localizacoesDictionary[est.localizacaoId]) {
            const loc = await obterLocalizacaoPorId(est.localizacaoId);
            localizacoesDictionary[est.localizacaoId] = loc.codigo;
          }
        })
      );
      return {
        lista: estoquesDoProduto,
        localizacoesMap: localizacoesDictionary,
      };
    },
    enabled: !!produto?.id,
  });

  // Dados da tabela de pesquisa de estoques.
  const estoques = useMemo(
    () => estoquesData?.lista || [],
    [estoquesData?.lista]
  );

  // useQuery de listagem de categorias.
  const { data: categoriasData = [] } = useQuery({
    queryKey: ['categoriaId'],
    queryFn: async () => await getCategorias(),
    staleTime: 1000 * 60 * 5, // 5 minutos.
  });

  // Mapeia o array de categorias para um dicionário
  const categoriasMap = useMemo(() => {
    const map: Record<string, string> = {};
    categoriasData.forEach((cat) => {
      map[cat.id] = cat.nome;
    });
    return map;
  }, [categoriasData]);

  const localizacaoMap = useMemo(
    () => estoquesData?.localizacoesMap || {},
    [estoquesData?.localizacoesMap]
  );

  const produtosLocalizados: ProdutoBaseDTO[] = produtos.map(
    (p: ProdutoResponseDTO) => {
      return {
        id: p.id,
        nome: p.nome,
        codigo: p.codigo,
        codigoAdicional: p.codigoAdicional ?? '-',
        valor: p.valor,
        valorPromocional: p.valorPromocional,
        categoria: categoriasMap[p.categoriaId],
        localizacao:
          estoques.map((e) => localizacaoMap[e.localizacaoId]) || 'Sem estoque',
        quantidade: '0',
        ativo: p.ativo ? 'Sim' : 'Não',
      };
    }
  );

  // Handler do trigger do drawer de edição de produto.
  const handleEditClick = (item: ProdutoResponseDTO) => {
    setProdutoAtivo(item);
    setIsEditDrawerOpen(true);
  };

  // Handler do trigger do drawer de visualização de produto.
  const handleViewClick = (item: ProdutoResponseDTO) => {
    setProdutoAtivo(item);
    setIsViewDrawerOpen(true);
  };

  // Handler do botão de ordenação ascendente.
  const handleSortAsc = () =>
    setSorting([{ id: tipoFiltroAtivo, desc: false }]);

  // Handler do botão de ordenação descendente.
  const handleSortDesc = () =>
    setSorting([{ id: tipoFiltroAtivo, desc: true }]);

  // Handler do botão de desfazer ordenação.
  const handleClearSort = () => setSorting([]);

  return {
    produtos,
    produtoAtivo,
    produtosLocalizados,

    carregandoProduto,
    carregandoProdutos,

    estoques,
    carregandoEstoques,

    categoriasMap,

    sorting,
    setSorting,
    columnFilters,

    isEditDrawerOpen,
    setIsEditDrawerOpen,
    isViewDrawerOpen,
    setIsViewDrawerOpen,

    // Handlers.
    handleEditClick,
    handleViewClick,
    handleSortAsc,
    handleSortDesc,
    handleClearSort,
  };
};
