import {
  Field,
  Input,
  Button,
  makeStyles,
  shorthands,
  Text,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular, Search24Regular } from '@fluentui/react-icons';

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
});

export const PesquisarProduto = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            PESQUISAR PRODUTO
          </Text>
        </div>
        <div>
          <Field>
            <Input></Input>
          </Field>
          <Button icon={<Search24Regular />}></Button>
          <Button icon={<Dismiss24Regular />}></Button>
        </div>
      </div>
    </>
  );
};
