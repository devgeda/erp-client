// Formatters.
// react-hook-forms.
import { type Control, Controller, type Path } from 'react-hook-form';

// shadcn/ui.
import { Input } from '@/shared/components/ui/input.tsx';

// Custom components.
import type { ProdutoFormInput } from '@/app/pages/AdicionarProduto.tsx';

import type { ReactElement } from 'react';

interface AdicionarProdutoAliquotaFieldProps {
  nome: Path<ProdutoFormInput>;
  label: string;
  infoLabelText: string;
  infoLabelAddon?: ReactElement;
  control: Control<ProdutoFormInput>;
  disabled: boolean;
}

export const AdicionarProdutoAliquotaField = ({
  nome,
  label,
  infoLabelText,
  infoLabelAddon,
  control,
  disabled,
}: AdicionarProdutoAliquotaFieldProps) => {
  // const styles = sharedStyles();
  return (
    <Controller
      name={nome}
      control={control}
      defaultValue={'0.00' as never}
      render={({ field, fieldState }) => (
        <Input disabled={disabled} value={field.value as never} required />
      )}
    />
  );
};
