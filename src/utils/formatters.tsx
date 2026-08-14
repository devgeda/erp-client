export const formatCurrencyBRL = (value: string | number) => {
  const onlyDigits = String(value).replace(/\D/g, '');
  if (!onlyDigits) return '';

  const numberValue = Number(onlyDigits) / 100;
  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const parseCurrencyToNumber = (value: string): number => {
  const onlyDigits = value.replace(/\D/g, '');
  if (!onlyDigits) return 0;
  return Number(onlyDigits) / 100;
};
