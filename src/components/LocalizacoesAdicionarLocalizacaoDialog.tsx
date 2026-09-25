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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sharedStyles } from '@/syles/shared/sharedStyles.ts';
import { localizacaoFormSchema } from '@/api/estoque/localizacao.schemas.tsx';
import type { LocalizacaoRequestDTO } from '@/api/estoque/localizacao.types.tsx';

import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Dismiss24Regular, Save24Regular } from '@fluentui/react-icons';
import { criarLocalizacao } from '@/api/estoque/localizacao.service.tsx';

interface LocalizacoesAdicionarLocalizacaoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export type LocalizacaoFormInput = z.input<typeof localizacaoFormSchema>;

export const LocalizacoesAdicionarLocalizacaoDialog = ({
  isOpen,
  onClose,
}: LocalizacoesAdicionarLocalizacaoDialogProps): JSXElement => {
  const styles = sharedStyles();

  const [prateleira, setPrateleira] = useState('');
  const [fileira, setFileira] = useState('');
  const [coluna, setColuna] = useState('');
  const [caixa, setCaixa] = useState('');
  const [codigoAcc, setCodigoAcc] = useState('');

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LocalizacaoFormInput>({
    resolver: zodResolver(localizacaoFormSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    register('codigo');

    if (codigoAcc) {
      setValue('codigo', codigoAcc, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [codigoAcc, register, setValue]);

  async function onLocalizacaoFormSubmit(data: LocalizacaoRequestDTO) {
    const payload = {
      ...data,
      caixa: data.caixa?.trim() ? data.caixa : undefined,
      ativo: data.ativo,
    };
    try {
      await criarLocalizacao(payload);
    } catch (error) {
      console.error('Error ao criar a localização, error: ', error);
    }

    dialogOnClose();
  }

  const gerarCodigoLocalizacao = () => {
    if (!prateleira || !fileira || !coluna) {
      return;
    }

    let codigo = `${prateleira.trim()}-${fileira.trim()}-${coluna.trim()}`;

    if (caixa.trim() !== '') {
      codigo += `-${caixa.trim()}`;
    }

    setCodigoAcc(codigo);
  };

  const dialogOnClose = () => {
    setPrateleira('');
    setFileira('');
    setColuna('');
    setCaixa('');
    setCodigoAcc('');

    reset();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(_e, data) => !data.open && onClose()}
      modalType="modal"
    >
      <DialogSurface>
        <form
          id={'form-dialog-localizacao'}
          onSubmit={handleSubmit(onLocalizacaoFormSubmit, (errosInvalidos) =>
            console.log('O Zod bloqueou a submissão! Erros:', errosInvalidos)
          )}
          noValidate
        >
          <DialogBody className={styles.content}>
            <div className={styles.cardHeader}>
              <DialogTitle>Adicionar Localização</DialogTitle>
              <Field
                id={''}
                label={'Localização Ativa'}
                className={styles.switch}
                required
              >
                <Switch {...register('ativo')} defaultChecked />
              </Field>
            </div>
            <DialogContent className={styles.grid4}>
              <Controller
                name={'prateleira'}
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Field
                    id={'prateleira'}
                    label={'Prateleira'}
                    validationState={errors.prateleira ? 'error' : 'none'}
                    validationMessage={errors.prateleira?.message}
                    required
                  >
                    <Input
                      {...field}
                      value={field.value || ''}
                      onChange={(e, data) => {
                        field.onChange(e.target.value.toUpperCase());
                        setPrateleira(data.value.toUpperCase());
                      }}
                    />
                  </Field>
                )}
              />
              <Controller
                name={'fileira'}
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Field
                    id={'fileira'}
                    label={'Fileira'}
                    validationState={errors.fileira ? 'error' : 'none'}
                    validationMessage={errors.fileira?.message}
                    required
                  >
                    <Input
                      {...field}
                      value={field.value || ''}
                      onChange={(e, data) => {
                        field.onChange(e.target.value.toUpperCase());
                        setFileira(data.value.toUpperCase());
                      }}
                    />
                  </Field>
                )}
              />
              <Controller
                name={'coluna'}
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Field
                    id={'coluna'}
                    label={'Coluna'}
                    validationState={errors.coluna ? 'error' : 'none'}
                    validationMessage={errors.coluna?.message}
                    required
                  >
                    <Input
                      {...field}
                      value={field.value || ''}
                      onChange={(e, data) => {
                        field.onChange(e.target.value.toUpperCase());
                        setColuna(data.value.toUpperCase());
                      }}
                    />
                  </Field>
                )}
              />
              <Controller
                name={'caixa'}
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Field
                    id={'caixa'}
                    label={'Caixa'}
                    validationState={errors.caixa ? 'error' : 'none'}
                    validationMessage={errors.caixa?.message}
                    required
                  >
                    <Input
                      {...field}
                      value={field.value || ''}
                      onChange={(e, data) => {
                        field.onChange(e.target.value.toUpperCase());
                        setCaixa(data.value.toUpperCase());
                      }}
                    />
                  </Field>
                )}
              />
              <Field
                id={'codigo'}
                label={'Código da prateleira: '}
                className={styles.grid2}
              >
                {codigoAcc ? codigoAcc : 'Preencha os campos.'}
              </Field>
              <Button onClick={gerarCodigoLocalizacao}>Gerar Código</Button>
            </DialogContent>
            <DialogActions className={styles.actionFooter}>
              <Button
                type={'submit'}
                appearance={'primary'}
                icon={<Save24Regular />}
              >
                Salvar
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance={'secondary'}
                  icon={<Dismiss24Regular />}
                  onClick={dialogOnClose}
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
