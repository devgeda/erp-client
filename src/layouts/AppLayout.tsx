import {
  type DrawerProps,
  Hamburger,
  Label,
  makeStyles,
  NavDrawer,
  NavDrawerHeader,
  tokens,
  Tooltip,
  useId,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

import { Outlet } from 'react-router-dom';
import * as React from 'react';

const useStyles = makeStyles({
  root: {
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    display: 'flex',
    width: '100%',
    height: '100dvh',
    overscrollBehavior: 'none',
  },
  nav: {
    minWidth: '260px',
  },
  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  field: {
    display: 'flex',
    marginTop: '4px',
    marginLeft: '8px',
    flexDirection: 'column',

    rowGap: tokens.spacingVerticalS,
  },
});

type DrawerType = Required<DrawerProps>['type'];

export const AppLayout = () => {
  const styles = useStyles();
  const typeLableId = useId('type-label');
  const [type, setType] = React.useState<DrawerType>('inline');
  const [isOpen, setIsOpen] = React.useState(true);
  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  return (
    <div>
      <NavDrawer open={isOpen} type={type} className={styles.nav}>
        <NavDrawerHeader>
          <Tooltip content="Close Navigation" relationship="label">
            <Hamburger onClick={() => setIsOpen(!isOpen)} />
          </Tooltip>
        </NavDrawerHeader>
      </NavDrawer>
      <div className={styles.content}>
        <Tooltip content="Close Navigation" relationship="label">
          <Hamburger onClick={(isOpen) => setIsOpen(!isOpen)} />
        </Tooltip>
        <div className={styles.field}>
          <Label id={typeLableId}>Type</Label>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
