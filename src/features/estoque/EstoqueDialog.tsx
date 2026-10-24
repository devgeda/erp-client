// react-hook-form.
import { Controller } from 'react-hook-form';

// Formatters.
import { formatNumber } from '@/shared/utils/formatters.tsx';

// shadcn/ui.
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/shared/components/ui/dialog.tsx';
import { Switch } from '@/shared/components/ui/switch.tsx';
import { Select } from '@/shared/components/ui/select.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Button } from '@/shared/components/ui/button.tsx';

// Custom hooks.
import { useEstoqueDialog } from '@/shared/hooks/useEstoqueDialog.ts';

interface AdicionarProdutoEstoqueDialogProps {
  isOpen: boolean;
  onClose: () => void;
  updateEstoquesTrigger: () => void;
  produtoCriadoId: string;
}

export const EstoqueDialog = ({
  isOpen,
  onClose,
  updateEstoquesTrigger,
  produtoCriadoId,
}: AdicionarProdutoEstoqueDialogProps) => {
  // const styles = sharedStyles();

  const {
    localizacoes,
    carregandoLocalizacoes,
    form: { register, control, reset },
    onSubmit,
  } = useEstoqueDialog({
    produtoCriadoId: produtoCriadoId,
    updateEstoquesTrigger: updateEstoquesTrigger,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form id={'form-dialog-estoque'} onSubmit={onSubmit} noValidate>
        <DialogContent className={'flex flex-col justify-between'}>
          <DialogTitle>Adicionar Estoque</DialogTitle>
          <Switch {...register('ativo')} defaultChecked />
          <Controller
            name={'localizacaoId'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Select
                disabled={carregandoLocalizacoes}
                value={field.value || ''}
              >
                <option value={''} disabled hidden>
                  {carregandoLocalizacoes
                    ? 'Carregando...'
                    : 'Selecione um estoque'}
                </option>
                {localizacoes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.codigo}
                  </option>
                ))}
              </Select>
            )}
          />
          <Controller
            name={'quantidade'}
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value as never}
                onChange={(e) => {
                  const maskNumber = formatNumber(e.target.value);
                  field.onChange(maskNumber);
                }}
                required
              ></Input>
            )}
          />
          <DialogFooter>
            <Button variant={'default'} type={'submit'}>
              Adicionar
            </Button>
            <DialogTrigger>
              <Button
                variant={'secondary'}
                onClick={() => {
                  onClose();
                  reset();
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
