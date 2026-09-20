import { sharedStyles } from '@/syles/shared/sharedStyles.ts';
import {
  Button,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  type TableColumnDefinition,
  Text,
} from '@fluentui/react-components';
import { useEffect, useMemo, useState } from 'react';
import type { LocalizacaoResponseDTO } from '@/api/estoque/localizacao.types.tsx';
import { obterLocalizacoes } from '@/api/estoque/localizacao.service.tsx';
import { Add24Regular, ArrowRepeatAll20Regular } from '@fluentui/react-icons';
import { LocalizacoesAdicionarLocalizacaoDialog } from '@/components/LocalizacoesAdicionarLocalizacaoDialog.tsx';

type CodigoCell = { label: string };
type PrateleiraCell = { label: string };
type FileiraCell = { label: string };
type ColunaCell = { label: string };
type CaixaCell = { label: string };
type AtivoCell = { label: string };

type Item = {
  codigo: CodigoCell;
  prateleira: PrateleiraCell;
  fileira: FileiraCell;
  coluna: ColunaCell;
  caixa: CaixaCell;
  ativo: AtivoCell;
};

const columns: TableColumnDefinition<Item>[] = [
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
    columnId: 'prateleira',
    compare: (a, b) => {
      return a.prateleira.label.localeCompare(b.prateleira.label);
    },
    renderHeaderCell: () => {
      return 'Prateleira';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>{item.prateleira.label}</TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'fileira',
    compare: (a, b) => {
      return a.fileira.label.localeCompare(b.fileira.label);
    },
    renderHeaderCell: () => {
      return 'Fileira';
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.fileira.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'coluna',
    compare: (a, b) => {
      return a.coluna.label.localeCompare(b.coluna.label);
    },
    renderHeaderCell: () => {
      return 'Coluna';
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.coluna.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'caixa',
    compare: (a, b) => {
      return a.caixa.label.localeCompare(b.caixa.label);
    },
    renderHeaderCell: () => {
      return 'Caixa';
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.caixa.label}</TableCellLayout>;
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
export const Localizacoes = () => {
  const styles = sharedStyles();

  const [localizacoes, setLocalizacoes] = useState<LocalizacaoResponseDTO[]>(
    []
  );
  const [carregandoLocalizacoes, setCarregandoLocalizacoes] = useState(false);

  const [updateLocalizacoes, setUpdateLocalizacoes] = useState(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function carregarLocalizacoes() {
      try {
        setCarregandoLocalizacoes(true);
        const localizacoesData = await obterLocalizacoes();
        setLocalizacoes(localizacoesData);
      } catch (error) {
        console.error('Error ao carregar as localizações, error: ', error);
      } finally {
        setCarregandoLocalizacoes(false);
      }
    }
    carregarLocalizacoes();
  }, []);

  const items: Item[] = useMemo(() => {
    return localizacoes.map((localizacao) => {
      return {
        codigo: { label: localizacao.codigo },
        prateleira: { label: localizacao.prateleira },
        fileira: { label: localizacao.fileira },
        coluna: { label: localizacao.fileira },
        caixa: { label: localizacao.caixa },
        ativo: { label: localizacao.ativo ? 'SIM' : 'NÃO' },
      };
    });
  }, [localizacoes]);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            LOCALIZAÇÕES
          </Text>
          <div className={styles.buttonGroup}>
            <Button
              icon={<Add24Regular />}
              aria-label="Adicionar Categoria"
              onClick={() => setIsDialogOpen(true)}
            >
              Adicionar Categoria
            </Button>
            <Button
              icon={<ArrowRepeatAll20Regular />}
              onClick={() => {
                setUpdateLocalizacoes((prev) => prev + 1);
              }}
            />
            <LocalizacoesAdicionarLocalizacaoDialog
              isOpen={isDialogOpen}
              onClose={() => {
                setIsDialogOpen(false);
                setUpdateLocalizacoes((prev) => prev + 1);
              }}
            />
          </div>
        </div>
        <DataGrid
          items={items}
          columns={columns}
          selectionMode={'single'}
          getRowId={(item) => item.id.label}
        >
          <DataGridHeader>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell focusMode={'none'}>
                  {renderHeaderCell()}
                </DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<Item>>
            {({ item, rowId }) =>
              carregandoLocalizacoes ? (
                'Carregando localizações ...'
              ) : (
                <DataGridRow key={rowId}>
                  {({ renderCell }) => (
                    <DataGridCell focusMode={'cell'}>
                      {renderCell(item)}
                    </DataGridCell>
                  )}
                </DataGridRow>
              )
            }
          </DataGridBody>
        </DataGrid>
      </div>
    </>
  );
};
