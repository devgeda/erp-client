import {
  Field,
  InfoLabel,
  type JSXElement,
  Label,
  Select,
} from '@fluentui/react-components';
import { type Control, Controller, type Path } from 'react-hook-form';
import type { ProdutoFormInput } from '@/pages/produtos/AdicionarProduto.tsx';
import { type ReactElement, useEffect, useState } from 'react';
import { listarProdutoFiscal } from '@/api/produtos/produto.service.tsx';
import type { ProdutoFiscalResponseDTO } from '@/api/produtos/produto.types.tsx';
import { sharedStyles } from '@/syles/shared/sharedStyles.ts';

export interface AdicionarProdutoFiscalSelectProps {
  endPointPath: string;
  label: string;
  infoLabelText: string;
  infoLabelAddon?: ReactElement;
  nome: Path<ProdutoFormInput>;
  control: Control<ProdutoFormInput>;
}

export const AdicionarProdutoFiscalSelect = ({
  endPointPath,
  label,
  infoLabelText,
  infoLabelAddon,
  nome,
  control,
}: AdicionarProdutoFiscalSelectProps): JSXElement => {
  const styles = sharedStyles();
  const [fiscal, setFiscal] = useState<ProdutoFiscalResponseDTO[]>([]);
  const [carregandoFiscal, setCarregandoFiscal] = useState(true);

  useEffect(() => {
    async function carregarFiscal() {
      try {
        const fiscalData = await listarProdutoFiscal(endPointPath);
        if (!fiscalData) return;
        setFiscal(fiscalData);
      } catch (error) {
        console.error(
          `Erro ao carregar dados fiscais de ${endPointPath}:`,
          error
        );
      } finally {
        setCarregandoFiscal(false);
      }
    }
    carregarFiscal();
  }, [endPointPath]);

  const fiscalAgrupado = (fiscal || []).reduce<
    Record<string, ProdutoFiscalResponseDTO[]>
  >((acc, atual) => {
    if (!acc[atual.grupo]) {
      acc[atual.grupo] = [];
    }
    acc[atual.grupo].push(atual);

    return acc;
  }, {});

  return (
    <Controller
      name={nome}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          id={`${nome}`}
          validationState={fieldState.error ? 'error' : 'none'}
          validationMessage={fieldState.error?.message}
        >
          <div className={styles.label}>
            <Label>{label}</Label>
            <InfoLabel
              info={
                <>
                  {infoLabelText} {infoLabelAddon}
                </>
              }
            ></InfoLabel>
          </div>
          <Select
            style={{ width: '100%', minWidth: 0 }}
            disabled={carregandoFiscal}
            value={(field.value as string) ?? ''}
            onChange={(_e, data) => {
              field.onChange(data.value);
            }}
            onBlur={field.onBlur}
          >
            <option value={''} disabled hidden>
              {carregandoFiscal ? 'Carregando...' : `Selecione ${label}`}
            </option>
            {fiscal.find((value) => value.grupo)
              ? Object.entries(fiscalAgrupado).map(
                  ([nomeDoGrupo, itensDoGrupo]) => (
                    <optgroup key={nomeDoGrupo} label={nomeDoGrupo}>
                      {itensDoGrupo.map((f) => (
                        <option key={f.codigo} value={f.codigo}>
                          {`${f.codigo} - ${f.descricao}`}
                        </option>
                      ))}
                    </optgroup>
                  )
                )
              : fiscal.map((f) => (
                  <option key={f.codigo} value={f.codigo}>
                    {`${f.codigo} - ${f.descricao}`}
                  </option>
                ))}
          </Select>
        </Field>
      )}
    />
  );
};
