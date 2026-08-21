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
  shorthands,
  Switch,
  tokens,
} from '@fluentui/react-components';
import { categoriaFormSchema } from '@/api/categorias/categoria.schemas.tsx';
import { criarCategoria } from '@/api/categorias/categoria.service.tsx';
import { Controller, useForm } from 'react-hook-form';
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
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  actionFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    ...shorthands.gap('12px'),
    borderTopColor: tokens.colorNeutralStroke2,
  },
});

interface AdicionarProdutoCategoriaDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdicionarProdutoCategoriaDialog = ({
  isOpen,
  onClose,
}: AdicionarProdutoCategoriaDialogProps): JSXElement => {
  const styles = useStyles();

  const {
    handleSubmit,
    register,
    control,
    reset,
    resetField,
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
    reset();
  }

  const onInnerSubmit = onNestedSubmit({
    handleSubmit,
    submitFunction: onCategoriaFormSubmit,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(_e, data) => !data.open && onClose()}
      modalType="modal"
    >
      <DialogSurface>
        <form id={'form-dialog-categoria'} onSubmit={onInnerSubmit} noValidate>
          <DialogBody className={styles.content}>
            <div className={styles.cardHeader}>
              <DialogTitle>Adicionar Categoria</DialogTitle>
              <Field
                id={'ativo'}
                label={'Categoria Ativa'}
                className={styles.switch}
                required
              >
                <Switch {...register('ativo')} defaultChecked />
              </Field>
            </div>
            <DialogContent className={styles.grid}>
              <Controller
                name={'nome'}
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Field
                    id={'nome'}
                    label={'Nome da Categoria'}
                    validationState={errors.nome ? 'error' : 'none'}
                    validationMessage={errors.nome?.message}
                    required
                  >
                    <Input
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e.target.value.toUpperCase());
                      }}
                    />
                  </Field>
                )}
              />
            </DialogContent>
            <DialogActions className={styles.actionFooter}>
              <Button appearance={'primary'} type={'submit'}>
                Salvar
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance={'secondary'}
                  onClick={() => {
                    onClose();
                    resetField('nome');
                  }}
                >
                  Fechar
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};
