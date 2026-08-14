import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  type JSXElement,
  makeStyles,
  Switch,
} from '@fluentui/react-components';
import { Add24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  switch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  grid: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'end',
    gridTemplateColumns: '1fr 1fr',
  },
  content: {
    display: 'grid',
    rowGap: '24px',
    justifyContent: 'space-between',
  },
});

export const AdicionarProdutoCategoriaDialog = (): JSXElement => {
  const styles = useStyles();

  return (
    <Dialog modalType="modal">
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<Add24Regular />} aria-label="Adicionar Categoria" />
      </DialogTrigger>

      <DialogSurface>
        <form>
          <DialogBody className={styles.content}>
            <DialogTitle>Adicionar Categoria</DialogTitle>
            <DialogContent className={styles.grid}>
              <Field label={'Nome da Categoria'}>
                <Input placeholder="Insira o nome da categoria"></Input>
              </Field>
              <Field label={'Categoria Ativa'} className={styles.switch}>
                <Switch defaultChecked />
              </Field>
            </DialogContent>
            <DialogActions>
              <Button appearance={'primary'}>Salvar</Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance={'secondary'}>Fechar</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};
