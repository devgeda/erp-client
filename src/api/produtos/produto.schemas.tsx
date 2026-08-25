import { z } from 'zod';

export const produtoFormSchema = z.object({
  nome: z.string().min(5, 'Mín. 5 caracteres').max(150, 'Máx. 150 caracteres'),
  codigo: z.string().min(1, 'Mín 1 caractere.').max(32, 'Máx 32 caracteres.'),
  codigoAdicional: z
    .string()
    .min(1, 'Mín. 1 caractere')
    .max(32, 'Máx. 32 caracteres'),
  valor: z.string().min(1, 'O valor precisa ser válido'),
  valorPromocional: z.string().min(1, 'O valor precisa ser válido'),
  categoriaId: z.string().uuid('Id de categoria inválido'),
  ativo: z.boolean('Defina o status do produto'),
  cfopInterno: z.string(),
  cfopInterestadual: z.string(),
  cstIcms: z.string(),
  csosn: z.string(),
  cstPis: z.string(),
  cstCofins: z.string(),
});
