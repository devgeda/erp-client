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
import {
  ArrowDown01,
  ArrowDownAZ,
  ArrowUp10,
  ArrowUpAZ,
  MoreHorizontal,
} from 'lucide-react';

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
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
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
  columnHelper.accessor('codigo', {
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
        >
          Código
          {column.getIsSorted() === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const cellContent = row.getValue('codigo');
      return <div className={'px-2'}>{cellContent as string}</div>;
    },
  }),
  columnHelper.accessor('codigoAdicional', {
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
        >
          Código Adicional
          {column.getIsSorted() === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const cellContent = row.getValue('codigoAdicional');
      return <div className={'px-2'}>{cellContent as string}</div>;
    },
  }),
  columnHelper.accessor('valor', {
    header: ({ column }) => {
      return (
        <div className={'text-right'}>
          <Button
            variant={'ghost'}
            onClick={(e) =>
              column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
            }
          >
            Valor
            {column.getIsSorted() === 'asc' ? <ArrowUp10 /> : <ArrowDown01 />}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue('valor'));
      const formattedValor = formatCurrencyBRL(valor);
      return <div className={'text-right font-medium'}>{formattedValor}</div>;
    },
  }),
  columnHelper.accessor('valorPromocional', {
    header: ({ column }) => {
      return (
        <div className={'text-right'}>
          <Button
            variant={'ghost'}
            onClick={(e) =>
              column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
            }
          >
            Valor Promocional
            {column.getIsSorted() === 'asc' ? <ArrowUp10 /> : <ArrowDown01 />}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const valorPromocional = parseFloat(row.getValue('valorPromocional'));
      const formattedValorPromocional = formatCurrencyBRL(valorPromocional);
      return (
        <div className={'text-right font-medium'}>
          {formattedValorPromocional}
        </div>
      );
    },
  }),
  columnHelper.accessor('categoria', {
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
        >
          Categoria
          {column.getIsSorted() === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const cellContent = row.getValue('categoria');
      return <div className={'px-2'}>{cellContent as string}</div>;
    },
  }),
  columnHelper.accessor('localizacao', {
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
        >
          Localização
          {column.getIsSorted() === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const cellContent = row.getValue('localizacao');
      return <div className={'px-2'}>{cellContent as string}</div>;
    },
  }),
  columnHelper.accessor('quantidade', {
    header: ({ column }) => {
      return (
        <div className={'text-right'}>
          <Button
            variant={'ghost'}
            onClick={(e) =>
              column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
            }
          >
            Quantidade
            {column.getIsSorted() === 'asc' ? <ArrowUp10 /> : <ArrowDown01 />}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const cellContent = row.getValue('quantidade');
      return (
        <div className={'text-right font-medium'}>{cellContent as string}</div>
      );
    },
  }),
  columnHelper.accessor('ativo', {
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
        >
          Ativo
          {column.getIsSorted() === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const cellContent = row.getValue('ativo');
      return <div className={'px-2'}>{cellContent as string}</div>;
    },
  }),
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
