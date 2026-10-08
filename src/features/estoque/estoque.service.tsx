import { api } from '@/shared/api/client.tsx';
import type {
  EstoqueRequestDTO,
  EstoqueResponseDTO,
} from '@/features/estoque/estoque.types.tsx';

export async function criarEstoque(data: EstoqueRequestDTO) {
  const response = await api.post<EstoqueResponseDTO>('/estoques', data);
  return response.data;
}

export async function obterEstoques() {
  const response = await api.get<EstoqueResponseDTO[]>('/estoques');
  return response.data;
}

export async function listarEstoquesPorProdutoId(id: string) {
  const reponse = await api.get<EstoqueResponseDTO[]>(
    `/estoques/produto/{${id}}`
  );

  return reponse.data;
}
