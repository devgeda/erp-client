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
  Select,
  Switch,
} from '@fluentui/react-components';
import { Controller } from 'react-hook-form';
import { sharedStyles } from '@/shared/styles/sharedStyles.ts';
import { formatNumber } from '@/shared/utils/formatters.tsx';
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
}: AdicionarProdutoEstoqueDialogProps): JSXElement => {
  const styles = sharedStyles();

  const {
    localizacoes,
    carregandoLocalizacoes,
    form: {
      register,
      control,
      formState: { errors },
      reset,
    },
    onSubmit,
  } = useEstoqueDialog({
    produtoCriadoId: produtoCriadoId,
    updateEstoquesTrigger: updateEstoquesTrigger,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(_e, data) => !data.open && onClose()}
      modalType="modal"
    >
      <DialogSurface>
        <form id={'form-dialog-estoque'} onSubmit={onSubmit} noValidate>
          <DialogBody className={styles.content}>
            <div className={styles.cardHeader}>
              <DialogTitle>Adicionar Estoque</DialogTitle>
              <Field
                id={'ativo'}
                label={'Estoque Ativo.'}
                className={styles.switch}
                required
              >
                <Switch {...register('ativo')} defaultChecked />
              </Field>
            </div>
            <DialogContent className={styles.grid4}>
              <Controller
                name={'localizacaoId'}
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Field
                    id={'localizacaoId'}
                    label="Localização"
                    validationState={errors.localizacaoId ? 'error' : 'none'}
                    validationMessage={errors.localizacaoId?.message}
                    required
                  >
                    <Select
                      disabled={carregandoLocalizacoes}
                      value={field.value || ''}
                      onChange={(_e, data) => field.onChange(data.value)}
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
                  </Field>
                )}
              />
              <Controller
                name={'quantidade'}
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Field
                    id={'quantidade'}
                    label={'Quantidade'}
                    validationState={errors.quantidade ? 'error' : 'none'}
                    validationMessage={errors.quantidade?.message}
                    required
                  >
                    <Input
                      {...field}
                      value={field.value as never}
                      onChange={(e) => {
                        const maskNumber = formatNumber(e.target.value);
                        field.onChange(maskNumber);
                      }}
                    ></Input>
                  </Field>
                )}
              />
            </DialogContent>
            <DialogActions className={styles.actionFooter}>
              <Button appearance={'primary'} type={'submit'}>
                Adicionar
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance={'secondary'}
                  onClick={() => {
                    onClose();
                    reset();
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
