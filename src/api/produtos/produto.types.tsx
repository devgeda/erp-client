export interface ProdutoRequestDTO {
  nome: string;
  codigo: string;
  codigoAdicional: string;
  valor: string;
  valorAdicional: string;
  categoriaId: string;
  ativo: boolean;
}

export interface ProdutoResponseDTO {
  id: string;
  nome: string;
  codigo: string;
  codigoAdicional: string;
  valor: number;
  valorPromocional: number;
  categoriaId: string;
  ativo: boolean;
}
