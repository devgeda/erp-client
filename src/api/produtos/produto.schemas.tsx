import { z } from 'zod';

export const produtoFormSchema = z.object({
  produtoNome: z
    .string()
    .min(5, 'Mín. 5 caracteres')
    .max(150, 'Máx. 150 caracteres'),
  produtoCodigo: z
    .string()
    .min(1, 'Mín 1 caractere.')
    .max(32, 'Máx 32 caracteres.'),
  produtoCodigoAdicional: z
    .string()
    .min(1, 'Mín. 1 caractere')
    .max(32, 'Máx. 32 caracteres'),
  produtoValor: z.string().min(0.01, 'O valor deve ser maior que zero'),
  produtoValorPromocional: z
    .string()
    .min(0.01, 'O valor deve ser maior que zero'),
  produtoCategoriaId: z.string().uuid('Id de categoria inválido'),
  produtoAtivo: z.boolean('Defina o status do produto'),
});
