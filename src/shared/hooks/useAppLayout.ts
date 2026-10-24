import { type LucideIcon, Package } from 'lucide-react';

export const useAppLayout = () => {
  type menuProperties = {
    navbar: {
      title: string;
      items?: {
        title: string;
        url: string;
        icon: LucideIcon;
        isActive: boolean;
        subItems?: { title: string; url: string; isActive: boolean }[];
      }[];
    }[];
  };

  const menu: menuProperties = {
    navbar: [
      { title: 'Dashboard' },
      {
        title: 'Estoque',
        items: [
          {
            title: 'Produtos',
            url: '/produtos',
            icon: Package,
            isActive: true,
            subItems: [
              {
                title: 'Adicionar Produto',
                url: '/produtos/adicionar',
                isActive: true,
              },
              {
                title: 'Procurar Produtos',
                url: '/produtos/pesquisar',
                isActive: true,
              },
            ],
          },
        ],
      },
    ],
  };
  return menu;
};
