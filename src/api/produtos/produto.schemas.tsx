import { z } from 'zod';

const limitarAliquotaSchema = z.string().refine(
  (val) => {
    const numberVal = Number(val);
    return !isNaN(numberVal) && numberVal <= 500;
  },
  { message: 'O limite percentual é de 500.00%' }
);

export const produtoFormSchema = z.object({
  nome: z
    .string()
    .min(5, 'O nome do produto precisa ter no mínimo 5 caracteres.')
    .max(150, 'O nome do produto precisa ter no 150 caracteres.'),
  codigo: z
    .string()
    .min(1, 'O código precisa ter no mínimo 1 caractere.')
    .max(32, 'O código precisa ter no máximo 32 caracteres.'),
  codigoAdicional: z
    .string()
    .max(32, 'O código adicional precisa ter no máximo 32 caracteres.')
    .optional(),
  valor: z.string().min(1, 'O valor precisa ser válido.'),
  valorPromocional: z.string().min(1, 'O valor precisa ser válido.'),
  categoriaId: z.string().uuid('Id de categoria inválido.'),
  ativo: z.boolean('Defina o status do produto'),
  ncm: z
    .string()
    .regex(/^\d{4}\.\d{2}\.\d{2}$/, 'Formato de NCM inválido. Use 0000.00.00'),
  cest: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{2}$/, 'Formato de CEST inválido. Use 00.000.00'),
  origemDoProduto: z.string().regex(/^\d{1}$/, 'O código deve ser válido'),
  cfopInterno: z.string().regex(/^\d{4}$/, 'O código deve ser válido'),
  cfopInterestadual: z.string().regex(/^\d{4}$/, 'O código deve ser válido'),
  csosn: z.string().regex(/^\d{3}$/, 'O código deve ser válido'),
  cstIcms: z.string().regex(/^\d{2}$/, 'O código deve ser válido'),
  cstPis: z.string().regex(/^\d{2}$/, 'O código deve ser válido'),
  cstCofins: z.string().regex(/^\d{2}$/, 'O código deve ser válido'),
  aliquotaIcms: limitarAliquotaSchema,
  aliquotaPis: limitarAliquotaSchema,
  aliquotaCofins: limitarAliquotaSchema,
  aliquotaIpi: limitarAliquotaSchema,
  aliquotaFcp: limitarAliquotaSchema,
  ivaSt: limitarAliquotaSchema,
});
