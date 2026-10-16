import { z } from 'zod';

export const localizacaoFormSchema = z.object({
  codigo: z
    .string()
    .regex(
      /^[A-Z]\d{2}-[A-Z]-[1-9](?:-[A-Z]{2}\d{2})?$/,
      'Formato inválido. Use P00-A-1-CX00.'
    ),
  prateleira: z
    .string()
    .regex(
      /^[A-Z]\d{2}$/,
      'Formato inválido. Use P00 (uma letra e dois dígitos de 00-99).'
    ),
  fileira: z
    .string()
    .regex(/^[A-Z]$/, 'Formato inválido. Use A (uma letra de A-Z).'),
  coluna: z
    .string()
    .regex(/^[1-9]$/, 'Formato inválido. Use 1 (um dígito de 1-9).'),
  caixa: z
    .string()
    .regex(
      /^[A-Z]{2}\d{2}$/,
      'Formato inválido. Use CX00 (prefixo CX e dois dígitos de 00-99).'
    )
    .or(z.literal(''))
    .optional(),
  ativo: z.boolean('Defina o status da localização'),
});
