export interface CategoriaRequestDTO {
  categoriaNome: string;
  categoriaAtivo: boolean;
}

export interface CategoriaResponseDTO {
  id: string;
  nome: string;
  ativo: boolean;
}
