export const FISCAL_INFO = {
  // ALIQUOTAS
  ICMS: 'Imposto sobre Circulação de Mercadorias e Serviços. É um imposto estadual brasileiro que incide sobre a circulação de produtos e sobre serviços',
  PIS: 'Programa de Integração Social. Contribuição federal calculada sobre o faturamento.',
  COFINS:
    'Contribuição para o Financiamento da Seguridade Social. É um tributo federal brasileiro cobrado sobre o faturamento bruto das empresas.',
  IPI: 'Imposto sobre Produtos Industrializados. É um imposto federal brasileiro que incide sobre o valor de produtos que passaram por qualquer processo de industrialização (como transformação, beneficiamento, montagem ou acondicionamento) ou no momento da desembaraço aduaneiro de produtos importados. Informar o valor de acordo com a tabela TIPI.',
  FCP: 'Fundo de combate à Pobreza. É um adicional ao ICMS instituído pelos governos estaduais.',
  IVA_ST:
    'Índice de Valor Adicionado Setorial. No cadastro de produtos, o IVA-ST é uma porcentagem estipulada pelo governo que serve para calcular o imposto de produtos sujeitos à Substituição Tributária (ICMS-ST).',

  // CÓDIGOS FISCAIS
  CFOP_INTERNO:
    'Código Fiscal de Operações e Prestações de operação interna, identifica a movimentação de mercadorias e prestação de serviços dentro do mesmo estado.',
  CFOP_INTERESTADUAL:
    'Código Fiscal de Operações e Prestações de operações interestaduais, identifica operações comerciais — como vendas, devoluções, transferências ou prestação de serviços — realizadas entre estados diferentes',
  CST_ICMS:
    'Código de Situação Tributária do ICMS, mercadoria e como o ICMS será tributado naquela operação específica. Este código é obrigatório para empresas do regime de Lucro Presumido ou Lucro Real. Empresas do Simples Nacional utilizam uma tabela diferente, chamada CSOSN.',
  CSOSN:
    'Código de Situação da Operação no Simples Nacional, é um código numérico de quatro dígitos usado exclusivamente por empresas do Simples Nacional para indicar a origem do produto e como a operação é tributada pelo ICMS.',
  CST_PIS:
    'Código de Situação Tributária do PIS/Pasep, é um código numérico de dois dígitos usado em documentos fiscais e obrigações acessórias para indicar como a contribuição incide sobre cada operação de uma empresa.',
  CST_COFINS:
    'Código de Situação Tributária da COFINS,  (Código de Situação Tributária da COFINS) é um código numérico de dois dígitos usado em notas fiscais e arquivos do SPED para informar como o produto ou serviço é tributado pela COFINS (se paga alíquota normal, se é isento, imune, monofásico ou se gera crédito).',
  ORIGEM_DO_PRODUTO:
    'A origem do produto na nota fiscal indica se uma mercadoria é nacional ou estrangeira, sendo representada por um dígito de 0 a 8 na Tabela A do ICMS.',
} as const;
