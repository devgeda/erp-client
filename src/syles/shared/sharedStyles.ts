import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const sharedStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('24px'),
    maxWidth: '1200px',
    ...shorthands.margin('16px', 'auto'),
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContainer: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  colSpan2: {
    gridColumnEnd: 'span 2',
  },
  actionFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    ...shorthands.gap('12px'),
    marginTop: '16px',
    ...shorthands.padding('16px', '0'),
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorNeutralStroke2,
  },
  flexRowRight: {
    display: 'flex',
    alignItems: 'flex-end',
    ...shorthands.gap('8px'),
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
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
  toolbarButtonsRight: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  switch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  headerGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
    marginBottom: '8px',
  },
  label: {
    marginBottom: '6px',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    alignItems: 'start',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    alignItems: 'start',
  },
  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    alignItems: 'start',
  },
  grid6: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '16px',
    alignItems: 'start',
  },
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
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  grid: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'start',
    gridTemplateColumns: '1fr 1fr',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
