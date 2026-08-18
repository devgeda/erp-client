import { api } from '@/api/client.tsx';
import type {
  CategoriaRequestDTO,
  CategoriaResponseDTO,
} from '@/api/categorias/categoria.types.tsx';

export async function criarCategoria(data: CategoriaRequestDTO) {
  const response = await api.post<CategoriaResponseDTO>('/categorias', data);

  return response.data;
}

export async function obterCategoria() {
  const response = await api.get<CategoriaResponseDTO[]>('/categorias');

  return response.data;
}
