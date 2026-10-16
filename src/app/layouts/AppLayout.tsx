import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bolt,
  Box,
  BriefcaseBusiness,
  BuildingComplex,
  CircleAlert,
  CircleUserIcon,
  ClipboardList,
  ListChecks,
  LogOut,
  MessageCircleQuestionMark,
  User,
  Users,
  Wrench,
} from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator.tsx';
import { Avatar } from '@/components/ui/avatar.tsx';
/*
const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '64px',
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.padding('16px', '0'),
    alignItems: 'center',
    ...shorthands.gap('12px'),
  },
  sidebarTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    marginBottom: '24px',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    ...shorthands.padding('0', '24px'),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerSearch: {
    minWidth: '300px',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  pageHeader: {
    display: 'flex',
    alignItems: 'baseline',
    ...shorthands.padding('24px', '24px', '16px', '24px'),
    ...shorthands.gap('12px'),
  },
  outletArea: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    ...shorthands.padding('0', '24px', '24px', '24px'),
    ...shorthands.overflow('hidden', 'auto'),
  },
});
*/

export const AppLayout = () => {
  // const styles = useStyles(); > migrando para o tailwindcss (v4).
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');

    navigate('/log-in');
  }

  return (
    <div className={'flex h-screen w-screen bg-neutral-200'}>
      {/* NAVEGAÇÃO LATERAL */}
      <nav className={'flex flex-col w-16 bg-brand items-center'}>
        <div className={'flex flex-col items-center mb-24'}>
          {/* Seletor de Empresa */}
          <Button variant={'ghost'} aria-label={'Selecionar Empresa'}>
            <BuildingComplex color={'white'} />
          </Button>
        </div>
        <Separator />
        {/* Ícones do ERP */}
        <Button variant={'ghost'} title={'Dashboard'}>
          <ClipboardList color={'white'} />
        </Button>
        <Button variant={'ghost'} title={'Estoque'}>
          <Box color={'white'} />
        </Button>
        <Button variant={'ghost'} title={'Ordens de Serviço'}>
          <Wrench color={'white'} />
        </Button>
        <Button variant={'ghost'} title={'Clientes'}>
          <User color={'white'} />
        </Button>
        <Button variant={'ghost'} title={'Serviços'}>
          <BriefcaseBusiness color={'white'} />
        </Button>
        <Button variant={'ghost'} title={'Funcionários'}>
          <Users color={'white'} />
        </Button>
      </nav>

      {/* ÁREA PRINCIPAL */}
      <main className={'flex-1 flex-col bg-neutral-100'}>
        {/* HEADER GLOBAL */}
        <header className={'flex items-center content-between h-14'}>
          <div className={'min-w-72'}>
            <Input
              placeholder={'Buscar... (Ctrl+K)'}
              style={{ width: '100%' }}
            />
          </div>

          <div className={'flex items-center'}>
            <Button variant={'ghost'} aria-label={'Tarefas'}>
              <ListChecks />
            </Button>
            <Button variant={'ghost'} aria-label={'Suporte'}>
              <MessageCircleQuestionMark />
            </Button>
            <Button variant={'ghost'} aria-label={'Notificações'}>
              <CircleAlert />
            </Button>

            {/* MENU DO USUÁRIO */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={'ghost'}>
                  <Avatar /> {/* Implementar componente para exi*/}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem prefix={'Perfil'}>
                    <CircleUserIcon />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    prefix={'Configurações'}
                    onClick={() => localStorage.removeItem('token')}
                  >
                    <Bolt />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem prefix={'Sair'} onClick={handleLogout}>
                    <LogOut />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* ÁREA DO OUTLET */}
        <div className={'flex-1 flex-col'}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
