import {
  Field,
  InfoLabel,
  Input,
  type JSXElement,
  Label,
  Text,
} from '@fluentui/react-components';
import { formatPercentField } from '@/utils/formatters.tsx';
import { TextPercentRegular } from '@fluentui/react-icons';
import { type Control, Controller, type Path } from 'react-hook-form';
import type { ProdutoFormInput } from '@/pages/produtos/AdicionarProduto.tsx';
import type { ReactElement } from 'react';
import { sharedStyles } from '@/syles/shared/sharedStyles.ts';

interface AdicionarProdutoAliquotaFieldProps {
  nome: Path<ProdutoFormInput>;
  label: string;
  infoLabelText: string;
  infoLabelAddon?: ReactElement;
  control: Control<ProdutoFormInput>;
}

export const AdicionarProdutoAliquotaField = ({
  nome,
  label,
  infoLabelText,
  infoLabelAddon,
  control,
}: AdicionarProdutoAliquotaFieldProps): JSXElement => {
  const styles = sharedStyles();
  return (
    <Controller
      name={nome}
      control={control}
      defaultValue={'0.00' as never}
      render={({ field, fieldState }) => (
        <Field
          id={nome}
          validationState={fieldState.error ? 'error' : 'none'}
          validationMessage={fieldState.error?.message}
        >
          <div className={styles.label}>
            <Label>{label}</Label>
            <InfoLabel
              info={
                <>
                  <Text align={'justify'}>{infoLabelText}</Text>
                  {infoLabelAddon}
                </>
              }
            ></InfoLabel>
          </div>
          <Input
            value={field.value as never}
            onChange={(_e, data) => {
              const maskPercent = formatPercentField(data.value);
              field.onChange(maskPercent);
            }}
            contentAfter={<TextPercentRegular />}
          />
        </Field>
      )}
    />
  );
};
