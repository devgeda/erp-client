export const useAppLayout = () => {
  type menuProperties = {
    navbar: {
      title: string;
      url: string;
      items?: [{ title: string; url: string; isActive: boolean }];
    }[];
  };

  const menu: menuProperties = {
    navbar: [
      { title: 'Dashboard', url: '#' },
      {
        title: 'Estoque',
        url: '/produtos',
        items: [
          {
            title: 'Pesquisar Produto',
            url: '/produtos/pesquisar',
            isActive: true,
          },
        ],
      },
    ],
  };
  return menu;
};
