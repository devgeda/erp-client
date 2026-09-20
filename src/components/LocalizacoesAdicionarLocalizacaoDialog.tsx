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
  Switch,
} from '@fluentui/react-components';
import { categoriaFormSchema } from '@/api/categorias/categoria.schemas.tsx';
import { criarCategoria } from '@/api/categorias/categoria.service.tsx';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CategoriaRequestDTO } from '@/api/categorias/categoria.types.tsx';
import { onNestedSubmit } from '@/utils/nestedFormSubmit.tsx';
import { sharedStyles } from '@/syles/shared/sharedStyles.ts';
import { localizacaoFormSchema } from '@/api/estoque/localizacao.schemas.tsx';
import type { LocalizacaoRequestDTO } from '@/api/estoque/localizacao.types.tsx';

interface LocalizacoesAdicionarLocalizacaoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocalizacoesAdicionarLocalizacaoDialog = ({
  isOpen,
  onClose,
}: LocalizacoesAdicionarLocalizacaoDialogProps): JSXElement => {
  const styles = sharedStyles();

  const {
    handleSubmit,
    register,
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm<LocalizacaoRequestDTO>({
    resolver: zodResolver(localizacaoFormSchema),
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
