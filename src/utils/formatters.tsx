export const formatCurrencyBRL = (value: string | number) => {
  const onlyDigits = String(value).replace(/\D/g, '');

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

export const formatFiscalField = (value: string, fieldType: string) => {
  if (fieldType === 'ncm') {
    const onlyDigitsSliced = value.replace(/\D/g, '').slice(0, 8);

    // onChangeFormat
    if (onlyDigitsSliced.length <= 4) return onlyDigitsSliced;
    if (onlyDigitsSliced.length <= 6) {
      return `${onlyDigitsSliced.slice(0, 4)}.${onlyDigitsSliced.slice(4)}`;
    }

    return `${onlyDigitsSliced.slice(0, 4)}.${onlyDigitsSliced.slice(4, 6)}.${onlyDigitsSliced.slice(6)}`;
  }
  if (fieldType === 'cest') {
    const onlyDigitsSliced = value.replace(/\D/g, '').slice(0, 7);

    // onChangeFormat
    if (onlyDigitsSliced.length <= 2) return onlyDigitsSliced;
    if (onlyDigitsSliced.length <= 5) {
      return `${onlyDigitsSliced.slice(0, 2)}.${onlyDigitsSliced.slice(2)}`;
    }
    return `${onlyDigitsSliced.slice(0, 2)}.${onlyDigitsSliced.slice(2, 5)}.${onlyDigitsSliced.slice(5)}`;
  }
  return '';
};

export const formatPercent = (value: string) => {
  const onlyDigits = String(value).replace(/\D/g, '');

  const percent = Number(onlyDigits) / 100;
  if (percent >= 500) {
    return '500.00'; // Limita a 500.00%
  }

  return `${percent.toFixed(2)}`;
};
