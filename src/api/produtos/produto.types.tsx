export interface ProdutoRequestDTO {
  nome: string;
  codigo: string;
  codigoAdicional: string;
  valor: number;
  valorAdicional: number;
  categoriaId: string;
  ativo: boolean;
  cfopInterno: string;
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
  cfopInterno: string;
}

export interface ProdutoFiscalResponseDTO {
  codigo: string;
  descricao: string;
  grupo: string;
}
