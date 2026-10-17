import { useState } from 'react';

// Pages.
import { ProdutosDataGrid } from '@/features/estoque/pesquisa/ProdutosDataGrid.tsx';

// Hooks.

// Components shascn/ui.
import { Input } from '@/shared/components/ui/input.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Card } from '@/shared/components/ui/card.tsx';
import { Separator } from '@/shared/components/ui/separator.tsx';
import { ButtonGroup } from '@/shared/components/ui/button-group.tsx';
import {
  Menubar,
  MenubarSeparator,
  MenubarTrigger,
  MenubarMenu,
} from '@/shared/components/ui/menubar.tsx';
import { AspectRatio } from '@/shared/components/ui/aspect-ratio.tsx';

// Ícones Lucide Icons.
import {
  ChevronDown,
  ChevronUp,
  ArrowUpAZ,
  ArrowDownAZ,
  RotateCcw,
} from 'lucide-react';

export const PesquisarProduto = () => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const estadoOrdenacaoInicial = {
    sortColumn: 'nome',
    sortDirection: 'ascending' as const,
  };
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

  return (
    <>
      <Card className={'p-4'}>
        <div className={'flex items-center gap-4 w-full'}>
          <div className={'grow'}>
            <Input
              className={'w-full max-w-full'}
              type={'text'}
              style={{ textTransform: 'uppercase' }}
              placeholder={`Pesquisar por ${placeholders[tipoFiltroAtivo] || 'Nome'} ...`}
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value.toUpperCase())}
            />
          </div>
          <div className={'flex items-center gap-4'}>
            <Separator orientation={'vertical'} />
            <div className={'flex gap-2 items-center'}>
              <ButtonGroup>
                <Button variant={'outline'}>
                  <ArrowUpAZ />
                  Crescente
                </Button>
                <Button variant={'outline'}>
                  <ArrowDownAZ />
                  Decrescente
                </Button>
                <Button variant={'outline'}>
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
          <div className={'flex justify-between items-center wrap'}>
            <Button
              variant={'ghost'}
              onClick={() => setTipoFiltroAtivo('nome')}
            >
              Filtrar por Nome
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => setTipoFiltroAtivo('codigo')}
            >
              Filtrar por Código
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => setTipoFiltroAtivo('codigoAdicional')}
            >
              Filtrar por Código Adicional
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => setTipoFiltroAtivo('categoriaId')}
            >
              Filtrar por Categoria
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => setTipoFiltroAtivo('localizacao')}
            >
              Filtrar por Localização
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => setTipoFiltroAtivo('ativo')}
            >
              Filtrar por Ativo
            </Button>
          </div>
        )}
        <ProdutosDataGrid
          tipoFiltro={tipoFiltroAtivo}
          termoBusca={termoBusca}
        />
      </Card>
    </>
  );
};
