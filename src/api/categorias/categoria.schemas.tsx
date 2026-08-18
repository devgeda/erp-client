import { z } from 'zod';

export const categoriaFormSchema = z.object({
  categoriaNome: z
    .string()
    .min(5, 'Mín. 5 caracteres')
    .max(150, 'Máx. 150 caracteres'),
  categoriaAtivo: z.boolean('Defina o status da categoria'),
});
