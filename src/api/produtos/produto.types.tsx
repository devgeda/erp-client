export interface ProdutoRequestDTO {
  nome: string;
  codigo: string;
  codigoAdicional?: string;
  valor: string;
  valorPromocional: string;
  categoriaId: string;
  ativo: boolean;
  ncm: string;
  cest: string;
  origemDoProduto: string;
  cfopInterno: string;
  cfopInterestadual: string;
  cstIcms: string;
  csosn: string;
  cstPis: string;
  cstCofins: string;
}

export interface ProdutoResponseDTO {
  id: string;
  nome: string;
  codigo: string;
  codigoAdicional?: string;
  valor: string;
  valorPromocional: string;
  categoriaId: string;
  ativo: boolean;
  ncm: string;
  cest: string;
  origemDoProduto: string;
  cfopInterno: string;
  cfopInterestadual: string;
  cstIcms: string;
  csosn: string;
  cstPis: string;
  cstCofins: string;
}

export interface ProdutoFiscalResponseDTO {
  codigo: string;
  descricao: string;
  grupo: string;
}
