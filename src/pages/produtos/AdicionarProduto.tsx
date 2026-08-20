import {
  Button,
  Combobox,
  Divider,
  Field,
  Input,
  makeStyles,
  Option,
  Select,
  shorthands,
  Switch,
  Text,
  tokens,
} from '@fluentui/react-components';
import {
  Add24Regular,
  Dismiss24Regular,
  Save24Regular,
} from '@fluentui/react-icons';
import { Controller, useForm } from 'react-hook-form';
import { produtoFormSchema } from '@/api/produtos/produto.schemas.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { CategoriaResponseDTO } from '@/api/categorias/categoria.types.tsx';
import { obterCategoria } from '@/api/categorias/categoria.service.tsx';
import { AdicionarProdutoCategoriaDialog } from '@/components/AdicionarProdutoCategoriaDialog.tsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('24px'),
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
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

    alignItems: 'flex-start',
    ...shorthands.gap('8px'),
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: tokens.colorNeutralForeground1,
  },
  grid6: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    gap: '16px',
    alignItems: 'start',
  },
});

type produtoFormScheme = z.infer<typeof produtoFormSchema>;

export const AdicionarProduto = () => {
  const styles = useStyles();
  const [categorias, setCategorias] = useState<CategoriaResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const categoriasData = await obterCategoria();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      } finally {
        setCarregando(false);
      }
    }
    carregarCategorias();
  }, [isDialogOpen]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<produtoFormScheme>({
    mode: 'onChange',
    resolver: zodResolver(produtoFormSchema),
    defaultValues: {
      nome: '',
      codigo: '',
      codigoAdicional: '',
      valor: '',
      valorPromocional: '',
      categoriaId: '',
      ativo: true,
    },
  });

  function onProdutoFormSubmit(data: produtoFormScheme) {
    console.log(data);
  }

  return (
    <form
      id="form-adicionar-produto"
      className={styles.root}
      onSubmit={handleSubmit(onProdutoFormSubmit)}
    >
      {/* INFORMAÇÕES */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            Informações Gerais
          </Text>

          <Switch
            label={'Produto Ativo'}
            {...register('ativo')}
            defaultChecked
          />
        </div>

        <div className={styles.grid3}>
          <Controller
            name={'nome'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'nome'}
                label="Nome do Produto"
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

          <Controller
            name={'codigo'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'codigo'}
                label="Código do Produto"
                validationState={errors.codigo ? 'error' : 'none'}
                validationMessage={errors.codigo?.message}
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

          <Controller
            name={'codigoAdicional'}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Field
                id={'codigoAdicional'}
                label="Código Adicional"
                validationState={errors.codigoAdicional ? 'error' : 'none'}
                validationMessage={errors.codigoAdicional?.message}
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
        </div>
      </div>

      {/* CATEGORIA */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Text size={500} weight="semibold" className={styles.cardTitle}>
            Categoria
          </Text>
          <Button
            icon={<Add24Regular />}
            aria-label="Adicionar Categoria"
            onClick={() => setIsDialogOpen(true)}
          >
            Adicionar Categoria
          </Button>
        </div>

        <div className={styles.grid6}>
          <div className={styles.colSpan2}>
            <Controller
              name={'categoriaId'}
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <Field
                  id={'categoriaId'}
                  label="Categoria"
                  validationState={errors.categoriaId ? 'error' : 'none'}
                  validationMessage={errors.categoriaId?.message}
                  required
                >
                  <Select
                    disabled={carregando}
                    onChange={(_e, data) => field.onChange(data.value)}
                  >
                    <option value={''}>
                      {carregando ? 'Carregando...' : 'Selecione uma categoria'}
                    </option>
                    {categorias.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </Select>
                  <AdicionarProdutoCategoriaDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                  />
                </Field>
              )}
            ></Controller>
          </div>
        </div>
      </div>

      {/* PRECIFICAÇÃO */}
      <div className={styles.card}>
        <Text size={500} weight="semibold" className={styles.cardTitle}>
          Precificação
        </Text>

        <div className={styles.grid2}>
          <Controller name={'valor'} control={control}>
            <Field id={'produtoValor'} label="Valor (R$)">
              <Input {...register('valor')} placeholder="R$ 0,00" />
            </Field>
          </Controller>
          <Field id={'valorPromocional'} label="Valor Promocional (R$)">
            <Input {...register('valorPromocional')} placeholder="R$ 0,00" />
          </Field>
        </div>
      </div>

      {/* INFORMAÇÕES FISCAIS */}
      <div className={styles.card}>
        <Text size={500} weight="semibold" className={styles.cardTitle}>
          Informações Fiscais
        </Text>

        <div className={styles.grid6}>
          <div className={styles.colSpan2}>
            <Field label="Origem do Produto">
              <Combobox placeholder="Selecione a origem">
                <Option>0 - Nacional</Option>
                <Option>1 - Estrangeira</Option>
              </Combobox>
            </Field>
          </div>
          <div className={styles.colSpan2}>
            <Field label="NCM">
              <Input placeholder="0000.00.00" />
            </Field>
          </div>
          <div className={styles.colSpan2}>
            <Field label="CEST">
              <Input placeholder="00.000.00" />
            </Field>
          </div>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        <div className={styles.colSpan2}>
          <Field label="CFOP Interno">
            <Input placeholder="Ex: 5102" />
          </Field>
          <Field label="CFOP Interestadual">
            <Input placeholder="Ex: 6102" />
          </Field>
        </div>

        <div className={styles.grid3}>
          <Field label="CST ICMS / CSOSN">
            <Combobox placeholder="Selecione">
              <Option>102 - Tributada pelo Simples</Option>
            </Combobox>
          </Field>
          <Field label="CST PIS">
            <Combobox placeholder="Selecione">
              <Option>01 - Operação Tributável</Option>
            </Combobox>
          </Field>
          <Field label="CST COFINS">
            <Combobox placeholder="Selecione">
              <Option>01 - Operação Tributável</Option>
            </Combobox>
          </Field>
        </div>

        {/* Linha densa para as alíquotas, cada input ocupa 1 espaço no grid de 6 */}
        <Text size={300} weight="medium" style={{ marginTop: '8px' }}>
          Alíquotas (%)
        </Text>
        <div className={styles.grid6}>
          <Field label="ICMS">
            <Input type="number" />
          </Field>
          <Field label="PIS">
            <Input type="number" />
          </Field>
          <Field label="COFINS">
            <Input type="number" />
          </Field>
          <Field label="IPI">
            <Input type="number" />
          </Field>
          <Field label="FCP">
            <Input type="number" />
          </Field>
          <Field label="IVA ST">
            <Input type="number" />
          </Field>
        </div>
      </div>

      {/* RODAPÉ DE AÇÕES */}
      <div className={styles.actionFooter}>
        <Button
          type={'reset'}
          appearance="secondary"
          icon={<Dismiss24Regular />}
        >
          Cancelar
        </Button>
        <Button type={'submit'} appearance="primary" icon={<Save24Regular />}>
          Adicionar Produto
        </Button>
      </div>
    </form>
  );
};
