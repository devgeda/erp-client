import { useState } from 'react';

// Pages.
import { ProdutosDataGrid } from '@/features/estoque/pesquisa/ProdutosDataGrid.tsx';

// Hooks.

// Components shascn/ui.
import { Input } from '@/shared/components/ui/input.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Card } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import {
  Menubar,
  MenubarSeparator,
  MenubarTrigger,
  MenubarMenu,
} from '@/shared/components/ui/menubar';
import { AspectRatio } from '@/shared/components/ui/aspect-ratio.tsx';

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
      <Card>
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
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Crescente</MenubarTrigger>
                  <MenubarTrigger>Decrescente</MenubarTrigger>
                  <MenubarTrigger>Redefinir Ordenação</MenubarTrigger>
                  <MenubarSeparator />
                  <MenubarTrigger>Filtros</MenubarTrigger>
                </MenubarMenu>
              </Menubar>
              <div className={'flex items-center gap-2'}>
                <Button>Redefinir</Button>
              </div>
            </div>
          </div>
        </div>
        <div />
        {open && (
          <AspectRatio>
            <div className={'flex w-full mt-2'}>
              <div
                className={
                  'flex w-full justify-between items-center wrap gap-2'
                }
              >
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
            </div>
          </AspectRatio>
        )}
        <ProdutosDataGrid
          tipoFiltro={tipoFiltroAtivo}
          termoBusca={termoBusca}
        />
      </Card>
    </>
  );
};
