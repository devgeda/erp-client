import {
  type DataTableFeatures,
  features,
} from '@/features/estoque/pesquisa/tabela/data-table-features.ts';

import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
  useTable,
} from '@tanstack/react-table';

// shadcn/ui.
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  sorting: SortingState;
  onSortingChange: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  columnFilters: ColumnFiltersState;
}
export function DataTable<TData extends RowData>({
  columns,
  data,
  sorting,
  onSortingChange,
  columnFilters,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
    onSortingChange,
    state: {
      sorting,
      columnFilters,
    },
  });
  return (
    <div className={'overflow-hidden rounded-md border'}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>Sem produtos.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
