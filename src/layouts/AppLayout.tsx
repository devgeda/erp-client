import {
  Button,
  Divider,
  Input,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Persona,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  Alert24Regular,
  Board24Regular,
  Box24Regular,
  Briefcase24Regular,
  BuildingMultiple24Regular,
  ChatHelp24Regular,
  People24Regular,
  Person24Regular,
  PersonCircle24Regular,
  Search24Regular,
  Settings24Regular,
  SignOut24Regular,
  TaskListSquareLtrRegular,
  Wrench24Regular,
} from '@fluentui/react-icons';
import { Outlet, useNavigate } from 'react-router-dom';

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

export const AppLayout = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');

    navigate('/log-in');
  }

  return (
    <div className={styles.root}>
      {/* NAVEGAÇÃO LATERAL */}
      <nav className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          {/* Seletor de Empresa */}
          <Button
            appearance="transparent"
            icon={<BuildingMultiple24Regular color="white" />}
            aria-label="Selecionar Empresa"
          />
          <Divider appearance="subtle" />
        </div>

        {/* Ícones do ERP */}
        <Button
          appearance="transparent"
          icon={<Board24Regular color="white" />}
          title="Dashboard"
        />
        <Button
          appearance="transparent"
          icon={<Box24Regular color="white" />}
          title="Estoque"
        />
        <Button
          appearance="transparent"
          icon={<Wrench24Regular color="white" />}
          title="Ordens de Serviço"
        />
        <Button
          appearance="transparent"
          icon={<People24Regular color="white" />}
          title="Clientes"
        />
        <Button
          appearance="transparent"
          icon={<Briefcase24Regular color="white" />}
          title="Serviços"
        />
        <Button
          appearance="transparent"
          icon={<Person24Regular color="white" />}
          title="Funcionários"
        />
      </nav>

      {/* ÁREA PRINCIPAL */}
      <main className={styles.mainContent}>
        {/* HEADER GLOBAL */}
        <header className={styles.header}>
          <div className={styles.headerSearch}>
            <Input
              appearance="filled-lighter"
              placeholder="Buscar... (Ctrl+K)"
              contentBefore={<Search24Regular />}
              style={{ width: '100%' }}
            />
          </div>

          <div className={styles.headerActions}>
            <Button
              appearance="subtle"
              icon={<TaskListSquareLtrRegular />}
              aria-label="Tarefas"
            />
            <Button
              appearance="subtle"
              icon={<ChatHelp24Regular />}
              aria-label="Suporte"
            />
            <Button
              appearance="subtle"
              icon={<Alert24Regular />}
              aria-label="Notificações"
            />

            {/* MENU DO USUÁRIO */}
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="subtle">
                  {/* Persona é o componente ideal para Foto + Nome + Cargo */}
                  <Persona
                    name="João Medeiros"
                    secondaryText="Gerente de Vendas"
                    presence={{ status: 'available' }}
                    avatar={{ color: 'colorful' }}
                  />
                </Button>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem icon={<PersonCircle24Regular />}>Perfil</MenuItem>
                  <MenuItem icon={<Settings24Regular />}>
                    Configurações
                  </MenuItem>
                  <Divider />
                  <MenuItem icon={<SignOut24Regular />} onClick={handleLogout}>
                    Sair
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </header>

        {/* ÁREA DO OUTLET */}
        <div className={styles.outletArea}>
          <div
            style={{
              border: `2px ${tokens.colorNeutralStroke1}`,
              flex: 1,
              padding: '20px',
              borderRadius: tokens.borderRadiusMedium,
            }}
          >
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
