import {
  Button,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  type DataGridCellFocusMode,
  DataGridHeader,
  DataGridHeaderCell,
  type DataGridProps,
  DataGridRow,
  type JSXElement,
  OverlayDrawer,
  Spinner,
  TableCellLayout,
  type TableColumnDefinition,
  type TableColumnId,
  type TableRowId,
  Tooltip,
  useRestoreFocusSource,
} from '@fluentui/react-components';
import { useEffect, useMemo, useState } from 'react';
import type { ProdutoResponseDTO } from '@/api/produtos/produto.types.tsx';
import {
  listarProdutos,
  obterProdutoById,
} from '@/api/produtos/produto.service.tsx';
import { formatCurrencyBRL } from '@/utils/formatters.tsx';
import { obterCategorias } from '@/api/categorias/categoria.service.tsx';
import { Edit24Regular, Eye24Regular } from '@fluentui/react-icons';
import { PesquisarProdutoVisualizar } from '@/components/PesquisarProdutoVisualizar.tsx';

type IdCell = { label: string };

type NameCell = {
  label: string;
};

type CodigoCell = {
  label: string;
};

type CodigoAdicionalCell = { label: string };

type ValorCell = { label: string };

type ValorPromocionalCell = { label: string };

type CategoriaIdCell = { label: string };

type LocalizacaoCell = { label: string };

type AtivoCell = { label: string };

export type Item = {
  id: IdCell;
  nome: NameCell;
  codigo: CodigoCell;
  codigoAdicional: CodigoAdicionalCell;
  valor: ValorCell;
  valorPromocional: ValorPromocionalCell;
  categoriaId: CategoriaIdCell;
  localizacao: LocalizacaoCell;
  ativo: AtivoCell;
};

const getColumns = (
  onEditClick: (item: Item) => void,
  onViewClick: (item: Item) => void
): TableColumnDefinition<Item>[] => [
  createTableColumn<Item>({
    columnId: 'nome',
    compare: (a, b) => {
      return a.nome.label.localeCompare(b.nome.label);
    },
    renderHeaderCell: () => {
      return 'Nome';
    },
    renderCell: (item) => {
      return (
        <Tooltip content={item.nome.label} relationship="label">
          <TableCellLayout truncate>{item.nome.label}</TableCellLayout>
        </Tooltip>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'codigo',
    compare: (a, b) => {
      return a.codigo.label.localeCompare(b.codigo.label);
    },
    renderHeaderCell: () => {
      return 'Código';
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.codigo.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'codigoAdicional',
    compare: (a, b) => {
      return a.codigoAdicional.label.localeCompare(b.codigoAdicional.label);
    },
    renderHeaderCell: () => {
      return 'Código Adicional';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>{item.codigoAdicional.label}</TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'valor',
    compare: (a, b) => {
      return a.valor.label.localeCompare(b.valor.label);
    },
    renderHeaderCell: () => {
      return 'Valor';
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.valor.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'valorPromocional',
    compare: (a, b) => {
      return a.valorPromocional.label.localeCompare(b.valorPromocional.label);
    },
    renderHeaderCell: () => {
      return 'Valor Promocional';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>
          {item.valorPromocional.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'categoriaId',
    compare: (a, b) => {
      return a.categoriaId.label.localeCompare(b.categoriaId.label);
    },
    renderHeaderCell: () => {
      return 'Categoria';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>{item.categoriaId.label}</TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'localizacao',
    compare: (a, b) => {
      return a.localizacao.label.localeCompare(b.localizacao.label);
    },
    renderHeaderCell: () => {
      return 'Localizacao';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>{item.localizacao.label}</TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'ativo',
    compare: (a, b) => {
      return a.ativo.label.localeCompare(b.ativo.label);
    },
    renderHeaderCell: () => {
      return 'Ativo';
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.ativo.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'acoes',
    renderHeaderCell: () => {
      return 'Ações';
    },
    renderCell: (item) => {
      return (
        <>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              aria-label={'Editar'}
              icon={<Edit24Regular />}
              onClick={() => onEditClick(item)}
            />
            <Button
              aria-label={'Visualizar'}
              icon={<Eye24Regular />}
              onClick={() => onViewClick(item)}
            />
          </div>
        </>
      );
    },
  }),
];

type AdicionarProdutoProdutosDataGridProps = {
  tipoFiltro:
    | 'nome'
    | 'codigo'
    | 'codigoAdicional'
    | 'categoriaId'
    | 'localizacao'
    | 'ativo';
  termoBusca: string;
  sortState: DataGridProps['sortState'];
  onSortChange: (nextSortState: DataGridProps['sortState']) => void;
};

const getCellFocusMode = (columnId: TableColumnId): DataGridCellFocusMode => {
  switch (columnId) {
    case 'acoes':
      return 'group';
    default:
      return 'cell';
  }
};

export const PesquisarProdutoProdutosDataGrid = ({
  tipoFiltro,
  termoBusca,
  sortState,
  onSortChange,
}: AdicionarProdutoProdutosDataGridProps): JSXElement => {
  const [produtos, setProdutos] = useState<ProdutoResponseDTO[]>([]);
  const [categoriasMap, setCategoriasMap] = useState<Record<string, string>>(
    {}
  );
  const [carregandoProdutos, setCarregandoProdutos] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set<TableRowId>());

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [produtoAtivo, setProdutoAtivo] = useState<Item | null>(null);

  const [produto, setProduto] = useState<ProdutoResponseDTO>();
  const [carregandoProduto, setCarregandoProduto] = useState(true);

  const restoreFocusSourceAttributes = useRestoreFocusSource();

  const onSelectionChange: DataGridProps['onSelectionChange'] = (_e, data) => {
    setSelectedRows(data.selectedItems);
  };

  useEffect(() => {
    async function carregarProdutosCategorias() {
      try {
        setCarregandoProdutos(true);
        const produtosData = await listarProdutos();
        const categoriasData = await obterCategorias();
        const categoriasDictionay: Record<string, string> = {};

        categoriasData.forEach((cat) => {
          categoriasDictionay[cat.id] = cat.nome;
        });

        setCategoriasMap(categoriasDictionay);
        setProdutos(produtosData);
      } catch (error) {
        console.error(`Error ao carregar os produtos, error: `, error);
      } finally {
        setCarregandoProdutos(false);
      }
    }
    carregarProdutosCategorias();
  }, []);

  useEffect(() => {
    async function carregarProduto() {
      if (!produtoAtivo) return;

      try {
        setCarregandoProduto(true);
        const produtosData = await obterProdutoById(produtoAtivo.id.label);
        setProduto(produtosData);
      } catch (error) {
        console.error(`Error ao carregar os produto, error: `, error);
      } finally {
        setCarregandoProduto(false);
      }
    }
    carregarProduto();
  }, [produtoAtivo]);

  const items: Item[] = useMemo(() => {
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
        localizacao: { label: '' },
        ativo: { label: produto.ativo ? 'SIM' : 'NÃO' },
      };
    });
  }, [produtos, categoriasMap, termoBusca, tipoFiltro]);

  const handleEditClick = (item: Item) => {
    setProdutoAtivo(item);
    setIsEditDrawerOpen(true);
  };

  const handleViewClick = (item: Item) => {
    setProdutoAtivo(item);
    setIsViewDrawerOpen(true);
  };

  const gridColumns = useMemo(
    () => getColumns(handleEditClick, handleViewClick),
    []
  );

  return (
    <>
      <DataGrid
        items={items}
        columns={gridColumns}
        selectionMode="single"
        subtleSelection={true}
        selectedItems={selectedRows}
        onSelectionChange={onSelectionChange}
        getRowId={(item) => item.id.label}
        sortState={sortState}
        onSortChange={(_e, nextSortState) => onSortChange(nextSortState)}
        sortable
      >
        <DataGridHeader>
          <DataGridRow
            selectionCell={{
              checkboxIndicator: {
                'aria-label': 'Selecionar todas as linhas',
              },
            }}
          >
            {({ columnId, renderHeaderCell }) => (
              <DataGridHeaderCell
                focusMode={columnId === 'acoes' ? 'none' : undefined}
              >
                {renderHeaderCell()}
              </DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) =>
            carregandoProdutos ? (
              'Carregando produtos ...'
            ) : (
              <DataGridRow<Item>
                key={rowId}
                selectionCell={{
                  checkboxIndicator: { 'aria-label': 'Selecione a linha' },
                }}
              >
                {({ columnId, renderCell }) => (
                  <DataGridCell focusMode={getCellFocusMode(columnId)}>
                    {renderCell(item)}
                  </DataGridCell>
                )}
              </DataGridRow>
            )
          }
        </DataGridBody>
      </DataGrid>
      {isEditDrawerOpen && produtoAtivo && (
        <OverlayDrawer
          modalType={'modal'}
          {...restoreFocusSourceAttributes}
          open={isEditDrawerOpen}
          position={'end'}
          onOpenChange={(_, { open }) => setIsEditDrawerOpen(open)}
        ></OverlayDrawer>
      )}
      {isViewDrawerOpen && produtoAtivo && (
        <OverlayDrawer
          modalType={'alert'}
          {...restoreFocusSourceAttributes}
          open={isViewDrawerOpen}
          position={'end'}
          size={'large'}
          onOpenChange={(_, { open }) => setIsViewDrawerOpen(open)}
        >
          {carregandoProduto || !produto ? (
            <Spinner />
          ) : (
            <PesquisarProdutoVisualizar
              produto={produto}
              categoria={categoriasMap[produto.categoriaId] || 'Desconhecida'}
              onClose={() => setIsViewDrawerOpen(false)}
            />
          )}
        </OverlayDrawer>
      )}
    </>
  );
};
