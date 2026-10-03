export interface EstoqueRequestDTO {
  produtoId: string;
  localizacaoId: string;
  quantidade: number;
  ativo: boolean;
}

export interface EstoqueResponseDTO {
  id: string;
  produtoId: string;
  localizacaoId: string;
  quantidade: number;
  criadoPor: string;
  dataCriacao: ;
  ativo: boolean;
}
