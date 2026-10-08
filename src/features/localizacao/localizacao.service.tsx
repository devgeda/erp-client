import { api } from '@/shared/api/client.tsx';
import type {
  LocalizacaoRequestDTO,
  LocalizacaoResponseDTO,
} from '@/features/localizacao/localizacao.types.tsx';

export async function criarLocalizacao(data: LocalizacaoRequestDTO) {
  const response = await api.post<LocalizacaoResponseDTO>(
    '/localizacoes',
    data
  );
  return response.data;
}

export async function obterLocalizacaoPorId(id: string) {
  const response = await api.get<LocalizacaoResponseDTO>(`/localizacoes/${id}`);
  return response.data;
}

export async function listarLocalizacoes() {
  const reponse = await api.get<LocalizacaoResponseDTO[]>('/localizacoes');
  return reponse.data;
}
