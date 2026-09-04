import {
  Button,
  Divider,
  Field,
  Input,
  makeStyles,
  Portal,
  shorthands,
  Text,
  tokens,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from '@fluentui/react-components';
import * as React from 'react';
import { useState } from 'react';

import {
  ArrowReset24Regular,
  ChevronDown24Regular,
  TextSortAscending24Regular,
  TextSortDescending24Regular,
} from '@fluentui/react-icons';
import { AdicionarProdutoProdutosDataGrid } from '@/components/AdicionarProdutoProdutosDataGrid.tsx';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('24px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.gap('16px'),
    boxShadow: tokens.shadow2,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: tokens.colorNeutralForeground1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
  },
  toolbarBotoesDireita: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  fullWidth: {
    width: '100%',
    maxWidth: '100%',
  },
  toolbarSearchBox: { flexGrow: 1 },
  toolbarSortersAndFilters: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  portalContainer: {
    display: 'flex',
    width: '100%',
    marginTop: '8px',
  },
  filtersWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between', // Espalha os botões de ponta a ponta uniformemente!
    alignItems: 'center',
    flexWrap: 'wrap', // Se a tela encolher, eles quebram a linha bonitinho
    gap: '8px',
  },
});

export const PesquisarProduto = () => {
  const styles = useStyles();
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const [tipoFiltroAtivo, setTipoFiltroAtivo] = useState<
    | 'nome'
    | 'codigo'
    | 'codigoAdicional'
    | 'categoria'
    | 'localizacao'
    | 'ativo'
  >('nome');

  const [termoBusca, setTermoBusca] = useState('');

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            PESQUISAR PRODUTO
          </Text>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.toolbarSearchBox}>
            <Field className={styles.fullWidth}>
              <Input
                className={styles.fullWidth}
                type={'text'}
                placeholder={`Pesquisar por ${tipoFiltroAtivo} ...`}
                onChange={(e) => setTermoBusca(e.target.value)}
              ></Input>
            </Field>
          </div>
          <div className={styles.toolbarBotoesDireita}>
            <Divider vertical={true} />
            <div className={styles.toolbarSortersAndFilters}>
              <Toolbar>
                <ToolbarButton icon={<TextSortAscending24Regular />}>
                  Crescente
                </ToolbarButton>
                <ToolbarButton icon={<TextSortDescending24Regular />}>
                  Decrescente
                </ToolbarButton>
                <ToolbarButton icon={<ArrowReset24Regular />}>
                  Redefinir Ordenação
                </ToolbarButton>
                <ToolbarDivider />
                <ToolbarButton
                  onClick={() => setOpen(!open)}
                  icon={<ChevronDown24Regular />}
                  appearance="transparent"
                />
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
                  onClick={() => setTipoFiltroAtivo('categoria')}
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
      </div>
      <div className={styles.card}>
        <AdicionarProdutoProdutosDataGrid
          tipoFiltro={tipoFiltroAtivo}
          termoBusca={termoBusca}
        />
      </div>
    </>
  );
};
