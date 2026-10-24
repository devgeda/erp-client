// react-hook-form.
import { type Control, Controller, type Path } from 'react-hook-form';

// Custom components.
import type { ProdutoFormInput } from '@/app/pages/AdicionarProduto.tsx';

// shadcn/ui.
import { Select } from '@/shared/components/ui/select.tsx';

import { listarProdutoFiscal } from '@/features/estoque/produto.service.tsx';
import type { ProdutoFiscalDTO } from '@/features/estoque/produto.types.tsx';

import { type ReactElement, useEffect, useState } from 'react';

export interface AdicionarProdutoFiscalSelectProps {
  endPointPath: string;
  label: string;
  infoLabelText: string;
  infoLabelAddon?: ReactElement;
  nome: Path<ProdutoFormInput>;
  control: Control<ProdutoFormInput>;
  disabled: boolean;
}

export const AdicionarProdutoFiscalSelect = ({
  endPointPath,
  label,
  infoLabelText,
  infoLabelAddon,
  nome,
  control,
  disabled,
}: AdicionarProdutoFiscalSelectProps) => {
  // const styles = sharedStyles();
  const [fiscal, setFiscal] = useState<ProdutoFiscalDTO[]>([]);
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
    void carregarFiscal();
  }, [endPointPath]);

  const fiscalAgrupado = (fiscal || []).reduce<
    Record<string, ProdutoFiscalDTO[]>
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
        <Select
          disabled={carregandoFiscal || disabled}
          value={(field.value as string) ?? ''}
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
      )}
    />
  );
};
