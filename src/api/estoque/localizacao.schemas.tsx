import { z } from 'zod';

export const localizacaoFormSchema = z.object({
  prateleira: z
    .string()
    .min(5, 'Mín. 5 caracteres')
    .max(150, 'Máx. 150 caracteres'),
  fileira: z.string('Defina o status da categoria'),
  coluna: z.string(),
  caixa: z.string(),
  ativo: z.boolean('Defina o status da localização'),
});
