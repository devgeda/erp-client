import { z } from 'zod';

export const estoqueFormSchema = z.object({
  produtoId: z.uuid('Id de produto inválido.'),
  localizacaoId: z.uuid('Id de localização inválido.'),
  quantidade: z
    .int('A quantidade deve ser um número inteiro.')
    .min(0, 'A quantidade não pode ser negativa.')
    .max(999, 'Quantidade excede o limite máximo permitido.'),
  ativo: z.boolean('Defina o status do estoque.'),
});
