import { api } from '@/shared/api/client.tsx';
import type {
  CategoriaRequestDTO,
  CategoriaResponseDTO,
} from '@/features/estoque/categorias/categoria.types.tsx';

export async function criarCategoria(data: CategoriaRequestDTO) {
  const response = await api.post<CategoriaResponseDTO>('/categorias', data);

  return response.data;
}

export async function obterCategoriaPorId(id: string) {
  const response = await api.get<CategoriaResponseDTO>(`/categorias/${id}`);

  return response.data;
}

export async function getCategorias() {
  const response = await api.get<CategoriaResponseDTO[]>(`/categorias`);

  return response.data;
}
