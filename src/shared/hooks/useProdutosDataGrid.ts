import {
  type DataGridProps,
  type TableRowId,
  useRestoreFocusSource,
} from '@fluentui/react-components';
import { useMemo, useState } from 'react';
import {
  getProdutos,
  obterProdutoById,
} from '@/features/estoque/produto.service.tsx';
import { getEstoques } from '@/features/estoque/estoque.service.tsx';
import { useAppToast } from '@/app/context/ToastContext.tsx';
import type { ProdutoResponseDTO } from '@/features/estoque/produto.types.tsx';
import { formatCurrencyBRL } from '@/shared/utils/formatters.tsx';
import { obterLocalizacaoPorId } from '@/features/localizacao/localizacao.service.tsx';
import { useQuery } from '@tanstack/react-query';
import { getCategorias } from '@/features/categorias/categoria.service.tsx';

interface useProdutosDataGridProps {
  tipoFiltro:
    | 'nome'
    | 'codigo'
    | 'codigoAdicional'
    | 'categoriaId'
    | 'localizacao'
    | 'quantidade'
    | 'ativo';
  termoBusca: string;
}

export const useProdutosDataGrid = ({
  tipoFiltro,
  termoBusca,
}: useProdutosDataGridProps) => {
  // Implementa o hook useAppToast para gerenciar as notificações via Toast.
  const notify = useAppToast();

  // Implementa o estado do produto ativo.
  const [produtoAtivo, setProdutoAtivo] = useState<ProdutoResponseDTO | null>(
    null
  );

  // RestoreFocusSourceAttributes para os drawers.
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  // Estados da selectedRow.
  const [selectedRows, setSelectedRows] = useState(new Set<TableRowId>());
  const onSelectionChange: DataGridProps['onSelectionChange'] = (_e, data) => {
    setSelectedRows(data.selectedItems);
  };

  // Estados dos Drawers.
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);

  // useQuery de listagem de produtos.
  const { data: produtos = [], isLoading: carregandoProdutos } = useQuery({
    queryKey: ['produtos', { tipoFiltro, termoBusca }],
    queryFn: async () => await getProdutos(),
  });

  // useQuery de listagem de categorias.
  const { data: categoriasData = [] } = useQuery({
    queryKey: ['categoriaId'],
    queryFn: async () => await getCategorias(),
    staleTime: 1000 * 60 * 5, // 5 minutos.
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

  // Dados da tabela de pesquisa de produtos.
  const estoques = useMemo(
    () => estoquesData?.lista || [],
    [estoquesData?.lista]
  );

  const localizacaoMap = useMemo(
    () => estoquesData?.localizacoesMap || {},
    [estoquesData?.localizacoesMap]
  );

  // Mapeia o array de categorias para um dicionário
  const categoriasMap = useMemo(() => {
    const map: Record<string, string> = {};
    categoriasData.forEach((cat) => {
      map[cat.id] = cat.nome;
    });
    return map;
  }, [categoriasData]);

  // Regras de filtragem e mapeamento dos itens.
  const items = useMemo(() => {
    if (!Array.isArray(produtos)) {
      return [];
    }

    const regrasFiltro: Record<
      string,
      (produto: ProdutoResponseDTO) => boolean
    > = {
      nome: (produto) => produto.nome.includes(termoBusca),
      codigo: (produto) => produto.codigo.includes(termoBusca),
      codigoAdicional: (produto) =>
        (produto.codigoAdicional || '').includes(termoBusca),
      categoriaId: (produto) =>
        (categoriasMap[produto.categoriaId] || '').includes(termoBusca),
      ativo: (produto) => (produto.ativo ? 'SIM' : 'NÃO').includes(termoBusca),
    };

    const produtosFiltrados = produtos.filter((produto) => {
      if (!termoBusca.trim()) return true;

      const regra = regrasFiltro[tipoFiltro];
      return regra(produto);
    });

    return produtosFiltrados.map((produto) => {
      return {
        id: produto.id,
        nome: produto.nome,
        codigo: produto.codigo,
        codigoAdicional: produto.codigoAdicional ?? '',
        valor: formatCurrencyBRL(produto.valor),
        valorPromocional: formatCurrencyBRL(produto.valorPromocional),
        categoriaId: categoriasMap[produto.categoriaId] ?? 'Sem Categoria',
        localizacao:
          estoques.map((e) => localizacaoMap[e.localizacaoId]) || 'Sem estoque',
        quantidade: '0',
        ativo: produto.ativo ? 'Sim' : 'Não',
      };
    });
  }, [
    produtos,
    termoBusca,
    categoriasMap,
    tipoFiltro,
    estoques,
    localizacaoMap,
  ]);

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

  return {
    items,

    produto,
    produtos,
    produtoAtivo,
    carregandoProduto,
    carregandoProdutos,

    estoques,
    carregandoEstoques,

    categoriasMap,

    selectedRows,
    onSelectionChange,

    isEditDrawerOpen,
    setIsEditDrawerOpen,
    isViewDrawerOpen,
    setIsViewDrawerOpen,

    handleEditClick,
    handleViewClick,
    restoreFocusSourceAttributes,
  };
};
