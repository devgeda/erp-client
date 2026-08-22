import { Field, type JSXElement, Select } from '@fluentui/react-components';
import { type Control, Controller, type Path } from 'react-hook-form';
import type { ProdutoFormInput } from '@/pages/produtos/AdicionarProduto.tsx';
import { useEffect, useState } from 'react';
import { listarProdutoFiscal } from '@/api/produtos/produto.service.tsx';
import type { ProdutoFiscalResponseDTO } from '@/api/produtos/produto.types.tsx';

export interface AdicionarProdutoFiscalSelectProps {
  endPointPath: string;
  label: string;
  nome: Path<ProdutoFormInput>;
  control: Control<ProdutoFormInput>;
}

export const AdicionarProdutoFiscalSelect = ({
  endPointPath,
  label,
  nome,
  control,
}: AdicionarProdutoFiscalSelectProps): JSXElement => {
  const [fiscal, setFiscal] = useState<ProdutoFiscalResponseDTO[]>([]);
  const [carregandoFiscal, setCarregandoFiscal] = useState(true);
  const [isFiscalSelectOpen, setIsFiscalSelectOpen] = useState(false);

  useEffect(() => {
    async function carregarFiscal() {
      try {
        const fiscalData = await listarProdutoFiscal(endPointPath);
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
  }, [isFiscalSelectOpen, endPointPath]);

  return (
    <Controller
      name={nome}
      control={control}
      defaultValue={'' as never}
      render={({ field, fieldState }) => (
        <Field
          id={`${nome}`}
          label={label}
          validationState={fieldState.error ? 'error' : 'none'}
          validationMessage={fieldState.error?.message}
        >
          <Select
            disabled={carregandoFiscal}
            onChange={(_e, data) => field.onChange(data.value)}
            onBlur={() => setIsFiscalSelectOpen(false)}
          >
            <option value={''}>
              {carregandoFiscal ? 'Carregando...' : label}
            </option>
            {fiscal.map((f) => (
              <optgroup>
                /*
                <option key={f.codigo} value={f.codigo}>
                  {`${f.codigo} - ${f.descricao}`}
                </option>
                */
              </optgroup>
            ))}
          </Select>
        </Field>
      )}
    />
  );
};
