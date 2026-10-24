import { categoriaFormSchema } from '@/features/estoque/categorias/categoria.schemas.tsx';
import { criarCategoria } from '@/features/estoque/categorias/categoria.service.tsx';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CategoriaRequestDTO } from '@/features/estoque/categorias/categoria.types.tsx';
import { onNestedSubmit } from '@/shared/utils/nestedFormSubmit.tsx';
import { useAppToast } from '@/app/context/ToastContext.tsx';
import type { AppError } from '@/app/api/client.tsx';

// shadcn/ui.
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/shared/components/ui/dialog.tsx';
import { Switch } from '@/shared/components/ui/switch.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Input } from '@/shared/components/ui/input.tsx';

interface AdicionarProdutoCategoriaDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdicionarProdutoCategoriaDialog = ({
  isOpen,
  onClose,
}: AdicionarProdutoCategoriaDialogProps) => {
  // const styles = sharedStyles();
  const notify = useAppToast();

  const { handleSubmit, register, control, reset, resetField } =
    useForm<CategoriaRequestDTO>({
      resolver: zodResolver(categoriaFormSchema),
      mode: 'onChange',
    });

  async function onCategoriaFormSubmit(data: CategoriaRequestDTO) {
    try {
      await criarCategoria(data);
      notify({
        intent: 'success',
        title: 'Adicionar categoria',
        body: 'Categoria adicionada com sucesso.',
        subtitle: `Nome: ${data.nome}.`,
      });
    } catch (error) {
      const err = error as AppError;

      notify({
        intent: err.intent || 'error',
        title: 'Adicionar categoria',
        body: err.message || 'Falha ao processar a requisição.',
      });

      console.error(error);
    }
    reset();
  }

  const onInnerSubmit = onNestedSubmit({
    handleSubmit,
    submitFunction: onCategoriaFormSubmit,
  });

  return (
    <Dialog open={isOpen}>
      <form id={'form-dialog-categoria'} onSubmit={onInnerSubmit} noValidate>
        <DialogContent>
          <Switch {...register('ativo')} defaultChecked />
          <Controller
            name={'nome'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input {...field} value={field.value || ''} required />
            )}
          />
          <DialogFooter>
            <Button variant={'default'} type={'submit'}>
              Salvar
            </Button>
            <DialogTrigger>
              <Button
                variant={'secondary'}
                onClick={() => {
                  onClose();
                  resetField('nome');
                }}
              >
                Fechar
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
