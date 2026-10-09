import {
  type DataGridProps,
  type TableRowId,
  useRestoreFocusSource,
} from '@fluentui/react-components';
import { useEffect, useMemo, useState } from 'react';
import {
  listarProdutos,
  obterProdutoById,
} from '@/features/estoque/produto.service.tsx';
import { obterEstoques } from '@/features/estoque/estoque.service.tsx';
import { useAppToast } from '@/app/context/ToastContext.tsx';
import type { ProdutoResponseDTO } from '@/features/estoque/produto.types.tsx';
import type { Item } from '@/shared/components/ProdutosDataGrid.tsx';
import type { EstoqueResponseDTO } from '@/features/estoque/estoque.types.tsx';
import type { AppError } from '@/shared/api/client.tsx';
import { formatCurrencyBRL } from '@/shared/utils/formatters.tsx';
import { obterLocalizacaoPorId } from '@/features/localizacao/localizacao.service.tsx';
import { useQuery } from '@tanstack/react-query';

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

  // RestoreFocusSourceAttributes para os drawers.
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  // Estados do produto.
  const [produto, setProduto] = useState<ProdutoResponseDTO>();
  const [produtoAtivo, setProdutoAtivo] = useState<Item | null>(null);
  const [carregandoProduto, setCarregandoProduto] = useState(true);

  // Estados dos estoques.
  const [estoques, setEstoques] = useState<EstoqueResponseDTO[]>([]);
  const [carregandoEstoques, setCarregandoEstoques] = useState(true);

  // Estados de localização.
  const [localizacaoMap, setLocalizacaoMap] = useState<Record<string, string>>(
    {}
  );

  // Estados das categorias.
  const [categoriasMap, setCategoriasMap] = useState<Record<string, string>>(
    {}
  );

  // Estados da selectedRow.
  const [selectedRows, setSelectedRows] = useState(new Set<TableRowId>());
  const onSelectionChange: DataGridProps['onSelectionChange'] = (_e, data) => {
    setSelectedRows(data.selectedItems);
  };

  // Estados dos Drawers.
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);

  const { data: produtos = [], isLoading: carregandoProdutos } = useQuery({
    queryKey: ['produtos'],
    queryFn: async () => await listarProdutos(),
  });

  const {
    data,
    isLoading: carregandoEstoques,
    isError,
    error,
  } = useQuery({
    queryKey: ['carregandoEstoques', produto?.id],
    queryFn: async () => {
      const estoques = await obterEstoques();
    },
  });

  // Use Effect de carregamento de estoques.
  useEffect(() => {
    if (!produto?.id) return;

    async function carregarEstoques() {
      try {
        setCarregandoEstoques(true);

        const estoques = await obterEstoques();

        const localizacoesDictionary: Record<string, string> = {};

        const estoquesDoProduto = estoques.filter(
          (est) => est.produtoId === produto?.id
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
  }, [notify]);

  // Use Effect de carregamento do produto.
  useEffect(() => {
    async function carregarProduto() {
      if (!produtoAtivo) return;

      try {
        setCarregandoProduto(true);
        const produtosData = await obterProdutoById(produtoAtivo.id.label);
        setProduto(produtosData);
        notify({
          intent: 'success',
          title: 'Carregar produto',
          body: 'Produto carregado com sucesso.',
          subtitle: `Código: ${produtoAtivo.codigo.label}, Descrição: ${produtoAtivo.nome.label}.`,
        });
      } catch (error) {
        console.error(`Error ao carregar os produto, error: `, error);
      } finally {
        setCarregandoProduto(false);
      }
    }
    carregarProduto();
  }, [notify, produtoAtivo]);

  const items: Item[] = useMemo(() => {
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
        id: { label: produto.id },
        nome: { label: produto.nome },
        codigo: { label: produto.codigo },
        codigoAdicional: {
          label: produto.codigoAdicional ?? '',
        },
        valor: { label: formatCurrencyBRL(produto.valor) },
        valorPromocional: {
          label: formatCurrencyBRL(produto.valorPromocional),
        },
        categoriaId: {
          label: categoriasMap[produto.categoriaId] ?? 'DESCONHECIDA',
        },
        localizacao: {
          label: '',
        },
        quantidade: { label: '0' },
        ativo: { label: produto.ativo ? 'SIM' : 'NÃO' },
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
  const handleEditClick = (item: Item) => {
    setProdutoAtivo(item);
    setIsEditDrawerOpen(true);
  };

  // Handler do trigger do drawer de visualização de produto.
  const handleViewClick = (item: Item) => {
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
