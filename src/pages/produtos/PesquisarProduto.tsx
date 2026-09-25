import {
  Button,
  type DataGridProps,
  Divider,
  Field,
  Input,
  Portal,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from '@fluentui/react-components';
import { useState } from 'react';

import {
  ArrowReset24Regular,
  ChevronDown24Regular,
  TextSortAscending24Regular,
  TextSortDescending24Regular,
} from '@fluentui/react-icons';
import { PesquisarProdutoProdutosDataGrid } from '@/components/PesquisarProdutoProdutosDataGrid.tsx';
import { sharedStyles } from '@/syles/shared/sharedStyles.ts';

export const PesquisarProduto = () => {
  const styles = sharedStyles();
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const estadoOrdenacaoInicial = {
    sortColumn: 'nome',
    sortDirection: 'ascending' as const,
  };
  const [sortState, setSortState] = useState<DataGridProps['sortState']>(
    estadoOrdenacaoInicial
  );

  const [tipoFiltroAtivo, setTipoFiltroAtivo] = useState<
    | 'nome'
    | 'codigo'
    | 'codigoAdicional'
    | 'categoriaId'
    | 'localizacao'
    | 'ativo'
  >('nome');

  const placeholders: Record<string, string> = {
    nome: 'Nome',
    codigo: 'Código',
    codigoAdicional: 'Código Adicional',
    categoriaId: 'Categoria',
    localizacao: 'Localização',
    ativo: 'Ativo',
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarSearchBox}>
            <Field className={styles.fullWidth}>
              <Input
                className={styles.fullWidth}
                type="text"
                style={{ textTransform: 'uppercase' }}
                placeholder={`Pesquisar por ${placeholders[tipoFiltroAtivo] || 'Nome'} ...`}
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value.toUpperCase())}
              />
            </Field>
          </div>
          <div className={styles.toolbarButtonsRight}>
            <Divider vertical={true} />
            <div className={styles.toolbarSortersAndFilters}>
              <Toolbar>
                <ToolbarButton
                  onClick={() =>
                    setSortState((prev) =>
                      prev
                        ? {
                            ...prev,
                            sortColumn: tipoFiltroAtivo,
                            sortDirection: 'ascending',
                          }
                        : estadoOrdenacaoInicial
                    )
                  }
                  icon={<TextSortAscending24Regular />}
                >
                  Crescente
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    setSortState((prev) =>
                      prev
                        ? {
                            ...prev,
                            sortColumn: tipoFiltroAtivo,
                            sortDirection: 'descending',
                          }
                        : estadoOrdenacaoInicial
                    )
                  }
                  icon={<TextSortDescending24Regular />}
                >
                  Decrescente
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => setSortState(estadoOrdenacaoInicial)}
                  icon={<ArrowReset24Regular />}
                >
                  Redefinir Ordenação
                </ToolbarButton>
                <ToolbarDivider />
                <ToolbarButton
                  onClick={() => setOpen(!open)}
                  icon={<ChevronDown24Regular />}
                  appearance="transparent"
                >
                  Filtros
                </ToolbarButton>
              </Toolbar>
            </div>
          </div>
        </div>
        <div ref={setMountNode} />
        {open && mountNode && (
          <Portal mountNode={mountNode}>
            <div className={styles.portalContainer}>
              <div className={styles.filtersWrapper}>
                <Button
                  appearance={'subtle'}
                  onClick={() => setTipoFiltroAtivo('nome')}
                >
                  Filtrar por Nome
                </Button>
                <Button
                  appearance={'subtle'}
                  onClick={() => setTipoFiltroAtivo('codigo')}
                >
                  Filtrar por Código
                </Button>
                <Button
                  appearance={'subtle'}
                  onClick={() => setTipoFiltroAtivo('codigoAdicional')}
                >
                  Filtrar por Código Adicional
                </Button>
                <Button
                  appearance={'subtle'}
                  onClick={() => setTipoFiltroAtivo('categoriaId')}
                >
                  Filtrar por Categoria
                </Button>
                <Button
                  appearance={'subtle'}
                  onClick={() => setTipoFiltroAtivo('localizacao')}
                >
                  Filtrar por Localização
                </Button>
                <Button
                  appearance={'subtle'}
                  onClick={() => setTipoFiltroAtivo('ativo')}
                >
                  Filtrar por Ativo
                </Button>
              </div>
            </div>
          </Portal>
        )}
        <PesquisarProdutoProdutosDataGrid
          tipoFiltro={tipoFiltroAtivo}
          termoBusca={termoBusca}
          sortState={sortState}
          onSortChange={setSortState}
        />
      </div>
    </>
  );
};
