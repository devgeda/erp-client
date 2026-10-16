import { useProdutosDataGrid } from '@/shared/hooks/useProdutosDataGrid.ts';
import { DataTable } from '@/features/estoque/pesquisa/tabela/data-table.tsx';
import { columns } from '@/features/estoque/pesquisa/tabela/columns.tsx';

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
};

export const ProdutosDataGrid = ({
  tipoFiltro,
  termoBusca,
}: AdicionarProdutoProdutosDataGridProps) => {
  const { produtosLocalizados } = useProdutosDataGrid({
    tipoFiltro,
    termoBusca,
  });

  return (
    <>
      <DataTable columns={columns} data={produtosLocalizados} />
    </>
  );
};
