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
import { categoriaFormSchema } from '@/api/categorias/categoria.schemas.tsx';
import { criarCategoria } from '@/api/categorias/categoria.service.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CategoriaRequestDTO } from '@/api/categorias/categoria.types.tsx';
import { onNestedSubmit } from '@/utils/nestedFormSubmit.tsx';

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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CategoriaRequestDTO>({
    resolver: zodResolver(categoriaFormSchema),
    mode: 'onChange',
  });

  async function onCategoriaFormSubmit(data: CategoriaRequestDTO) {
    try {
      await criarCategoria(data);
    } catch (e) {
      console.error(e);
    } finally {
      console.log(data);
    }
  }

  const onInnerSubmit = onNestedSubmit({
    handleSubmit,
    submitFunction: onCategoriaFormSubmit,
  });

  return (
    <Dialog modalType="modal">
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<Add24Regular />} aria-label="Adicionar Categoria" />
      </DialogTrigger>

      <DialogSurface>
        <form id={'form-dialog-categoria'} onSubmit={onInnerSubmit} noValidate>
          <DialogBody className={styles.content}>
            <DialogTitle>Adicionar Categoria</DialogTitle>
            <DialogContent className={styles.grid}>
              <Field
                id={'nome'}
                label={'Nome da Categoria'}
                validationState={errors.nome ? 'error' : 'none'}
                validationMessage={errors.nome?.message}
                required
              >
                <Input
                  {...register('nome')}
                  placeholder="Insira o nome da categoria"
                />
              </Field>
              <Field
                id={'ativo'}
                label={'Categoria Ativa'}
                className={styles.switch}
                required
              >
                <Switch {...register('ativo')} defaultChecked />
              </Field>
            </DialogContent>
            <DialogActions>
              <Button appearance={'primary'} type={'submit'}>
                Salvar
              </Button>
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
