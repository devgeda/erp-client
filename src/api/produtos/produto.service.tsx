import type {
  ProdutoRequestDTO,
  ProdutoResponseDTO,
} from '@/api/produtos/produto.types.tsx';
import { api } from '@/api/client.tsx';

export async function criarProduto(data: ProdutoRequestDTO) {
  const response = await api.post<ProdutoResponseDTO>('/produtos', data);

  return response.data;
}

export async function listarProduto() {
  const response = await api.get<ProdutoResponseDTO[]>('produtos');

  return response.data;
}
