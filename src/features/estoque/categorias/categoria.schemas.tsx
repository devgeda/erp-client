import { z } from 'zod';

export const categoriaFormSchema = z.object({
  nome: z.string().min(5, 'Mín. 5 caracteres').max(150, 'Máx. 150 caracteres'),
  ativo: z.boolean('Defina o status da categoria'),
});
