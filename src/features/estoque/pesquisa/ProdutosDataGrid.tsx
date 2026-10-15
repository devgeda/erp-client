import {
  type DataGridProps,
  type JSXElement,
  OverlayDrawer,
  Spinner,
} from '@fluentui/react-components';
import { PesquisarProdutoVisualizar } from '@/features/estoque/pesquisa/PesquisarProdutoVisualizar.tsx';
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
  sortState: DataGridProps['sortState'];
  onSortChange: (nextSortState: DataGridProps['sortState']) => void;
};

export const ProdutosDataGrid = ({
  tipoFiltro,
  termoBusca,
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
  });

  return (
    <>
      <DataTable columns={columns} data={items} />
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
