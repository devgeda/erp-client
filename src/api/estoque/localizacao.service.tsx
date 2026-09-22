import { api } from '@/api/client.tsx';
import type {
  LocalizacaoRequestDTO,
  LocalizacaoResponseDTO,
} from '@/api/estoque/localizacao.types.tsx';

export async function criarLocalizacao(data: LocalizacaoRequestDTO) {
  const response = await api.post<LocalizacaoResponseDTO>(
    '/localizacoes',
    data
  );
  return response.data;
}

export async function listarLocalizacao() {
  const reponse = await api.get<LocalizacaoResponseDTO[]>('/localizacoes');

  return reponse.data;
}
