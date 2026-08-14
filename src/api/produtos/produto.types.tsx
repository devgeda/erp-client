export interface ProdutoRequestDTO {
  produtoNome: string;
  produtoCodigo: string;
  produtoCodigoAdicional: string;
  produtoValor: string;
  produtoValorPromocional: string;
  produtoCategoriaId: string;
  produtoAtivo: boolean;
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
