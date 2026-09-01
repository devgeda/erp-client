import {
  Divider,
  Field,
  makeStyles,
  Portal,
  SearchBox,
  shorthands,
  Text,
  tokens,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarToggleButton,
  typographyStyles,
} from '@fluentui/react-components';
import * as React from 'react';

import { ChevronDown24Regular } from '@fluentui/react-icons';
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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  portalContent: {
    ...typographyStyles.subtitle1,

    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    border: `${tokens.strokeWidthThick} dashed ${tokens.colorBrandStroke2}`,
    padding: '12px 6px',
  },
});

export const PesquisarProduto = () => {
  const styles = useStyles();

  /****************************************************************************/
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  /* CÓDIGO RELACIONADO AO PORTAL DOS FILTROS EXTRAS                          */
  /****************************************************************************/

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            PESQUISAR PRODUTO
          </Text>
        </div>
        <div className={styles.toolbar}>
          <Field>
            <SearchBox></SearchBox>
          </Field>
          <Divider vertical={true} />
          <Toolbar>
            <ToolbarToggleButton>Filtrar por Nome</ToolbarToggleButton>
            <ToolbarToggleButton>Filtrar por Código</ToolbarToggleButton>
            <ToolbarToggleButton>
              Filtrar por Código Adicional
            </ToolbarToggleButton>
            <ToolbarDivider />
            <ToolbarButton
              onClick={() => setOpen(!open)}
              icon={<ChevronDown24Regular />}
            />
          </Toolbar>
        </div>
        <div ref={setMountNode} />
        {open && mountNode && (
          <Portal mountNode={mountNode}>
            <div>
              <Toolbar>
                <Text>OUTROS FILTROS</Text>
              </Toolbar>
            </div>
          </Portal>
        )}
      </div>
      <div className={styles.card}>
        <AdicionarProdutoProdutosDataGrid />
      </div>
    </>
  );
};
