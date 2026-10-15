import { type JSXElement, Tag } from '@fluentui/react-components';

type PesquisarProdutoEstoqueTagProps = {
  label: string;
};

export const PesquisarProdutoEstoqueTag = ({
  label,
}: PesquisarProdutoEstoqueTagProps): JSXElement => {
  return <Tag>{label}</Tag>;
};
