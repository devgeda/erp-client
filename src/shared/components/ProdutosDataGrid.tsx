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
  Tag,
  Tooltip,
} from '@fluentui/react-components';
import { useMemo } from 'react';
import { Edit24Regular, Eye24Regular } from '@fluentui/react-icons';
import { PesquisarProdutoVisualizar } from '@/shared/components/PesquisarProdutoVisualizar.tsx';
import { useProdutosDataGrid } from '@/shared/hooks/useProdutosDataGrid.ts';

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

type QuantidadeCell = { label: string };

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
  quantidade: QuantidadeCell;
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
        <Tooltip content={item.categoriaId.label} relationship="label">
          <TableCellLayout truncate>{item.categoriaId.label}</TableCellLayout>
        </Tooltip>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'localizacao',
    renderHeaderCell: () => {
      return 'Localização';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>
          <Tag>{item.localizacao.label}</Tag>
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'quantidade',
    renderHeaderCell: () => {
      return 'Quantidade';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>{item.quantidade.label}</TableCellLayout>
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
    | 'quantidade'
    | 'ativo';
  termoBusca: string;
  sortState: DataGridProps['sortState'];
  onSortChange: (nextSortState: DataGridProps['sortState']) => void;
  updateProdutosTrigger: number;
};

const getCellFocusMode = (columnId: TableColumnId): DataGridCellFocusMode => {
  switch (columnId) {
    case 'acoes':
      return 'group';
    default:
      return 'cell';
  }
};

const columnSizeOptions = {
  nome: { minWidth: 300, defaulWidth: 300 },
  codigo: { minWidth: 80, defaulWidth: 80 },
  codigoAdicional: { minWidth: 80, defaulWidth: 80 },
  valor: { minWidth: 80, defaulWidth: 80 },
  valorPromocional: { minWidth: 80, defaulWidth: 80 },
  categoriaId: { minWidth: 120, defaulWidth: 120 },
  localizacao: { minWidth: 120, defaulWidth: 120 },
  quantidade: { minWidth: 80, defaulWidth: 80 },
  ativo: { minWidth: 80, defaulWidth: 80 },
};

export const ProdutosDataGrid = ({
  tipoFiltro,
  termoBusca,
  updateProdutosTrigger,
  sortState,
  onSortChange,
}: AdicionarProdutoProdutosDataGridProps): JSXElement => {
  const {
    items,
    produto,
    produtoAtivo,
    carregandoProduto,
    carregandoProdutos,
    estoques,
    categoriasMap,
    onSelectionChange,
    selectedRows,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    isViewDrawerOpen,
    setIsViewDrawerOpen,
    handleViewClick,
    handleEditClick,
    restoreFocusSourceAttributes,
  } = useProdutosDataGrid({
    tipoFiltro,
    termoBusca,
    updateProdutosTrigger,
  });

  const gridColumns = useMemo(
    () => getColumns(handleEditClick, handleViewClick),
    [handleEditClick, handleViewClick]
  );

  return (
    <>
      <DataGrid
        items={items}
        columns={gridColumns}
        selectionMode={'single'}
        subtleSelection={true}
        resizableColumns
        columnSizingOptions={columnSizeOptions}
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
        >
          {carregandoProduto || !produto ? (
            <Spinner />
          ) : (
            <PesquisarProdutoVisualizar
              produto={produto}
              estoques={estoques}
              categoria={categoriasMap[produto.categoriaId] || 'Desconhecida'}
              onClose={() => setIsViewDrawerOpen(false)}
            />
          )}
        </OverlayDrawer>
      )}
    </>
  );
};
