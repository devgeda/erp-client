import type { DataTableFeatures } from '@/features/estoque/pesquisa/tabela/data-table-features.ts';
import { createColumnHelper } from '@tanstack/react-table';

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
  columnHelper.accessor('nome', { header: 'Nome' }),
  columnHelper.accessor('codigo', { header: 'Código' }),
  columnHelper.accessor('codigoAdicional', { header: 'Código Adicional' }),
  columnHelper.accessor('valor', { header: 'Valor' }),
  columnHelper.accessor('valorPromocional', { header: 'Valor Promocional' }),
  columnHelper.accessor('categoria', { header: 'Categoria' }),
  columnHelper.accessor('localizacao', { header: 'Localização' }),
  columnHelper.accessor('quantidade', { header: 'Quantidade' }),
  columnHelper.accessor('ativo', { header: 'Ativo' }),
]);
