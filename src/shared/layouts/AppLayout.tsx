// shadcn/ui.
import { Button } from '@/shared/components/ui/button.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu.tsx';
import { Avatar } from '@/shared/components/ui/avatar.tsx';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar.tsx';
import { LayoutSidebar } from '@/shared/layouts/sidebar/sidebar.tsx';
// lucide-icons
import {
  Bolt,
  CircleAlert,
  CircleUserIcon,
  ListChecks,
  LogOut,
  MessageCircleQuestionMark,
} from 'lucide-react';

// react-router-dom.
import { Outlet, useNavigate } from 'react-router-dom';

export const AppLayout = () => {
  // const styles = useStyles(); > migrando para o tailwindcss (v4).
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');

    navigate('/log-in');
  }

  return (
    <SidebarProvider>
      <div className={'flex h-screen w-screen bg-neutral-200'}>
        <LayoutSidebar />
        <SidebarInset>
          <header
            className={
              'flex justify-between items-center p-4 shrink-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'
            }
          >
            <div className={'flex min-w-72 items-center gap-4'}>
              <SidebarTrigger />
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

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant={'ghost'}>
                    <Avatar />
                    {/* Implementar componente para exibir informações de usuários */}
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
          <main className={'flex-1 flex-col bg-neutral-100'}>
            <div className={'flex-1 flex-col'}>
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
