import { api } from '../client.tsx';
import * as z from 'zod';

export interface LoginRequestDTO {
  email: string;
  senha: string;
}

export interface LoginResponseDTO {
  token: string;
}

export interface UsuarioRequestDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface UsuarioResponseDTO {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  roles: string[];
  dataCriacao: string;
  dataAlteracao: string;
}

export const loginFormSchema = z.object({
  email: z.email('Insira um email válido'),
  senha: z
    .string()
    .min(8, 'Mínimo de 8 caracteres')
    .max(255, 'Máx. 255 caracteres'),
});

export const signupFormSchema = z
  .object({
    nome: z
      .string()
      .min(12, 'Mín. 12 caracteres')
      .max(24, 'Máx. 24 caracteres'),
    email: z.email('Insira um email válido'),
    senha: z
      .string()
      .min(8, 'Mínimo de 8 caracteres')
      .max(255, 'Máx. 255 caracteres')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, {
        message:
          'A senha deve conter letra maiúscula, minúscula, número e caractere especial',
      }),
    confirmarSenha: z
      .string()
      .min(8, 'Mínimo de 8 caracteres')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, {
        message:
          'A senha deve conter letra maiúscula, minúscula, número e caractere especial',
      }),
  })
  .refine(
    (data) => data.senha === data.confirmarSenha,

    {
      message: 'As senhas não coincidem',
      path: ['confirmarSenha'],
    }
  );

export type loginFormData = z.infer<typeof loginFormSchema>;

export type signupFormData = z.infer<typeof signupFormSchema>;

export async function login(data: LoginRequestDTO) {
  const response = await api.post<LoginResponseDTO>('/usuarios/login', data);

  localStorage.setItem('token', response.data.token);

  return response.data;
}

export async function criarUsuario(data: UsuarioRequestDTO) {
  const response = await api.post<UsuarioResponseDTO>('/usuarios', data);

  return response.data;
}
