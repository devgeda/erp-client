import { api } from '@/api/client.tsx';
import type { LocalizacaoResponseDTO } from '@/api/estoque/localizacao.types.tsx';

export async function obterLocalizacoes() {
  const reponse = await api.get<LocalizacaoResponseDTO[]>('/localizacoes');
  return reponse.data;
}
