import {
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  type DataGridProps,
  DataGridRow,
  type JSXElement,
  TableCellLayout,
  type TableColumnDefinition,
  type TableRowId,
  Tooltip,
} from '@fluentui/react-components';
import { useEffect, useMemo, useState } from 'react';
import type { ProdutoResponseDTO } from '@/api/produtos/produto.types.tsx';
import { listarProdutos } from '@/api/produtos/produto.service.tsx';
import { formatCurrencyBRL } from '@/utils/formatters.tsx';
import { obterCategorias } from '@/api/categorias/categoria.service.tsx';

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

type Item = {
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

const columns: TableColumnDefinition<Item>[] = [
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
];

export const AdicionarProdutoProdutosDataGrid = (): JSXElement => {
  const [produtos, setProdutos] = useState<ProdutoResponseDTO[]>([]);
  const [categoriasMap, setCategoriasMap] = useState<Record<string, string>>(
    {}
  );
  const [carregandoProdutos, setCarregandoProdutos] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set<TableRowId>());
  const estadoOrdenacaoInicial = {
    sortColumn: 'nome',
    sortDirection: 'ascending' as const,
  };
  const [sortState, setSortState] = useState<DataGridProps['sortState']>(
    estadoOrdenacaoInicial
  );
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCodigo, setFiltroCodigo] = useState('');
  const [filtroCodigoAdicional, setFiltroCodigoAdicional] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroLocalizacao, setFiltroLocalizacao] = useState('');
  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'sim' | 'nao'>(
    'todos'
  );

  const onSelectionChange: DataGridProps['onSelectionChange'] = (_e, data) => {
    setSelectedRows(data.selectedItems);
  };

  const onSortChange: DataGridProps['onSortChange'] = (_e, nextSortState) => {
    setSortState(nextSortState);
  };

  useEffect(() => {
    async function carregarProdutos() {
      try {
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
    carregarProdutos();
  }, [produtos, categoriasMap]);

  const items: Item[] = useMemo(() => {
    const produtosFiltrados = produtos.filter((produto) => {
      if (
        filtroNome &&
        !produto.nome.toLowerCase().includes(filtroNome.toLowerCase())
      ) {
        return false;
      }
    });

    return produtos.map((produto) => {
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
          label: categoriasMap[produto.categoriaId] ?? 'Desconhecida',
        },
        localizacao: { label: '' },
        ativo: { label: produto.ativo ? 'Sim' : 'Não' },
      };
    });
  }, [produtos, categoriasMap, filtroNome]);

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectionMode="single"
      subtleSelection={true}
      selectedItems={selectedRows}
      onSelectionChange={onSelectionChange}
      getRowId={(item) => item.id.label}
      resizableColumns

      sortState={sortState}
      onSortChange={onSortChange}
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
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) =>
          carregandoProdutos ? (
            'Carregando...'
          ) : (
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
          )
        }
      </DataGridBody>
    </DataGrid>
  );
};
