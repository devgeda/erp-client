import { useState } from 'react';

// Pages.
// Hooks.
// Components shascn/ui.
import { Input } from '@/shared/components/ui/input.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Card } from '@/shared/components/ui/card.tsx';
import { ButtonGroup } from '@/shared/components/ui/button-group.tsx';

// Ícones Lucide Icons.
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';
import { DataTable } from '@/features/estoque/pesquisa/tabela/data-table.tsx';
import { columns } from '@/features/estoque/pesquisa/tabela/columns.tsx';
import { usePesquisarProduto } from '@/shared/hooks/usePesquisarProduto.ts';

export const PesquisarProduto = () => {
  const [open, setOpen] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');

  // const notify = useAppToast(); > reimplementar

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

  const {
    produtosLocalizados,
    sorting,
    setSorting,
    columnFilters,
    handleSortAsc,
    handleSortDesc,
    handleClearSort,
  } = usePesquisarProduto({
    tipoFiltroAtivo,
    termoBusca,
  });

  return (
    <>
      <Card className={'p-4'}>
        <div className={'flex items-center gap-4 w-full'}>
          <div className={'grow'}>
            <Input
              className={'w-full max-w-1/2'}
              type={'text'}
              style={{ textTransform: 'uppercase' }}
              placeholder={`Pesquisar por ${placeholders[tipoFiltroAtivo] || 'Nome'} ...`}
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value.toUpperCase())}
            />
          </div>
          <div className={'flex items-center gap-4'}>
            <div className={'flex gap-2 items-center'}>
              <ButtonGroup>
                <Button variant={'outline'} onClick={() => handleSortAsc()}>
                  <ArrowUpAZ />
                  Crescente
                </Button>
                <Button variant={'outline'} onClick={() => handleSortDesc()}>
                  <ArrowDownAZ />
                  Decrescente
                </Button>
                <Button variant={'outline'} onClick={() => handleClearSort()}>
                  <RotateCcw />
                  Redefinir Ordenação
                </Button>
                <Button variant={'outline'} onClick={() => setOpen(!open)}>
                  {open ? <ChevronUp /> : <ChevronDown />}
                  Filtros
                </Button>
              </ButtonGroup>
              <Button variant={'outline'}>Redefinir</Button>
            </div>
          </div>
        </div>
        <div />
        {open && (
          <div className={'flex justify-center w-full'}>
            <ButtonGroup>
              <Button
                variant={'outline'}
                onClick={() => setTipoFiltroAtivo('nome')}
              >
                Filtrar por Nome
              </Button>
              <Button
                variant={'outline'}
                onClick={() => setTipoFiltroAtivo('codigo')}
              >
                Filtrar por Código
              </Button>
              <Button
                variant={'outline'}
                onClick={() => setTipoFiltroAtivo('codigoAdicional')}
              >
                Filtrar por Código Adicional
              </Button>
              <Button
                variant={'outline'}
                onClick={() => setTipoFiltroAtivo('categoriaId')}
              >
                Filtrar por Categoria
              </Button>
              <Button
                variant={'outline'}
                onClick={() => setTipoFiltroAtivo('localizacao')}
              >
                Filtrar por Localização
              </Button>
              <Button
                variant={'outline'}
                onClick={() => setTipoFiltroAtivo('ativo')}
              >
                Filtrar por Ativo
              </Button>
            </ButtonGroup>
          </div>
        )}
        <DataTable
          columns={columns}
          data={produtosLocalizados}
          sorting={sorting}
          onSortingChange={setSorting}
          columnFilters={columnFilters}
        />
      </Card>
    </>
  );
};
