import type { DataTableFeatures } from '@/features/estoque/pesquisa/tabela/data-table-features.ts';

// tanstack-query.
import { createColumnHelper } from '@tanstack/react-table';

// shadcn/ui.
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu.tsx';
import { Button } from '@/shared/components/ui/button.tsx';

// lucide-react.
import { ArrowUpAZ, ArrowDownAZ, MoreHorizontal } from 'lucide-react';

// utils.
import { formatCurrencyBRL } from '@/shared/utils/formatters.tsx';

export type Columns = {
  id: string;
  nome: string;
  codigo: string;
  codigoAdicional: string;
  valor: string;
  valorPromocional: string;
  categoria: string;
  localizacao: string[];
  quantidade: string;
  ativo: string;
};

// Helper para acessar dados das colunas.
const columnHelper = createColumnHelper<DataTableFeatures, Columns>();

export const columns = columnHelper.columns([
  columnHelper.accessor('nome', {
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          {column.getIsSorted() === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const cellContent = row.getValue('nome');
      return <div className={'px-2'}>{cellContent as string}</div>;
    },
  }),
  columnHelper.accessor('codigo', { header: 'Código' }),
  columnHelper.accessor('codigoAdicional', { header: 'Código Adicional' }),
  columnHelper.accessor('valor', {
    header: () => <div className={'text-right'}>Valor</div>,
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue('valor'));
      const formattedValor = formatCurrencyBRL(valor);
      return <div className={'text-right font-medium'}>{formattedValor}</div>;
    },
  }),
  columnHelper.accessor('valorPromocional', {
    header: () => <div className={'text-right'}>Valor Promocional</div>,
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue('valor'));
      const formattedValor = formatCurrencyBRL(valor);
      return <div className={'text-right font-medium'}>{formattedValor}</div>;
    },
  }),
  columnHelper.accessor('categoria', { header: 'Categoria' }),
  columnHelper.accessor('localizacao', { header: 'Localização' }),
  columnHelper.accessor('quantidade', {
    header: () => <div className={'text-right'}>Quantidade</div>,
    cell: ({ row }) => {
      const valor = row.getValue('quantidade');
      return <div className={'text-right font-medium'}>{valor as string}</div>;
    },
  }),
  columnHelper.accessor('ativo', { header: 'Ativo' }),
  columnHelper.display({
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className={'h-8 w-8 p-0'}>
              <span className={'sr-only'}>Abir Menu</span>
              <MoreHorizontal className={'h-4 w-4'} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={'end'} className={'flex-col w-auto'}>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem>Visualizar Produto</DropdownMenuItem>
            <DropdownMenuItem>Editar Produto</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Copiar Código</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
