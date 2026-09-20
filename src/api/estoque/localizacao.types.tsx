export interface LocalizacaoRequestDTO {
  codigo: string;
  prateleira: string;
  fileira: string;
  coluna: string;
  caixa: string;
  ativo: boolean;
}

export interface LocalizacaoResponseDTO {
  id: string;
  codigo: string;
  prateleira: string;
  fileira: string;
  coluna: string;
  caixa: string;
  ativo: boolean;
}

export interface EstoqueResponseDTO {
  id: string;
  produtoId: string;
  localizacaoId: string;
  quantidade: number;
  ativo: boolean;
}
