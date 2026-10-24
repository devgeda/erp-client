import type {
  ProdutoFiscalDTO,
  ProdutoRequestDTO,
  ProdutoResponseDTO,
} from '@/features/estoque/produto.types.tsx';
import { api } from '@/app/api/client.tsx';

export async function criarProduto(data: ProdutoRequestDTO) {
  const response = await api.post<ProdutoResponseDTO>('/produtos', data);

  return response.data;
}

export async function getProdutos() {
  const response = await api.get<ProdutoResponseDTO[]>('/produtos');

  return response.data;
}

export async function obterProdutoById(id: string) {
  const response = await api.get<ProdutoResponseDTO>(`/produtos/${id}`);

  return response.data;
}

export async function listarProdutoFiscal(path: string) {
  const response = await api.get<ProdutoFiscalDTO[]>(path);

  return response.data;
}
