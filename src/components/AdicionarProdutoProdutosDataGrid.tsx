import {
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  type JSXElement,
  TableCellLayout,
  type TableColumnDefinition,
} from '@fluentui/react-components';

type NameCell = {
  label: string;
};

type Item = { name: NameCell };

const items: Item[] = [];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'nome',
    compare: (a, b) => {
      return a.name.label.localeCompare(b.name.label);
    },
    renderHeaderCell: () => {
      return 'Nome';
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.name.label}</TableCellLayout>;
    },
  }),
];

export const AdicionarProdutoProdutosDataGrid = (): JSXElement => {
  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode={'single'}
      getRowId={(item) => item.name.label}
      focusMode={'composite'}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: {
              'aria-label': 'Selecionar todas as linhas',
            },
          }}
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell}</DataGridHeaderCell>
          )}
        </DataGridRow>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item>
              key={rowId}
              selectionCell={{
                checkboxIndicator: { 'aria-label': 'Selecione a linha' },
              }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGridHeader>
    </DataGrid>
  );
};
