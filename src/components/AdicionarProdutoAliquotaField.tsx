import {
  Field,
  InfoLabel,
  Input,
  type JSXElement,
  Label,
  makeStyles,
} from '@fluentui/react-components';
import { formatPercent } from '@/utils/formatters.tsx';
import { TextPercentRegular } from '@fluentui/react-icons';
import { type Control, Controller, type Path } from 'react-hook-form';
import type { ProdutoFormInput } from '@/pages/produtos/AdicionarProduto.tsx';
import type { ReactElement } from 'react';

const useStyles = makeStyles({
  label: {
    marginBottom: '6px',
  },
});

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
  const styles = useStyles();
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
                  {infoLabelText} {infoLabelAddon}
                </>
              }
            ></InfoLabel>
          </div>
          <Input
            value={field.value as never}
            onChange={(_e, data) => {
              const maskPercent = formatPercent(data.value);
              field.onChange(maskPercent);
              console.log(maskPercent);
            }}
            contentAfter={<TextPercentRegular />}
          />
        </Field>
      )}
    />
  );
};
