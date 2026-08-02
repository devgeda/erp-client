import * as z from 'zod';

export const decimalSchema = z
  .string()
  .regex(/^\d+(,\d+)?$/, {
    message: 'O formato deve ser um número decimal (ex: 10,50)',
  })
  .refine((val) => /^\d+,\d{2}$/.test(val), {
    message: 'O número deve ter exatamente 2 casas decimais (ex: 10,50)',
  });

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
  produtoValor: decimalSchema,
  produtoValorPromocional: decimalSchema,
  produtoCategoriaId: z.string().uuid('Id de categoria inválido'),
  produtoAtivo: z.boolean('Defina o status do produto'),
});

export type CriarProdutoFormData = z.infer<typeof produtoFormSchema>;
