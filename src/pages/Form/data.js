export default {
  identificacao: {
    title: 'Identificação do potreiro',
    content: 'Número ou nome do potreiro.',
  },
  areaDoPotreiro: {
    title: 'Área do potreiro',
    content: 'Área total do potreiro, em hectares. OBS: Considerar área útil (em hectares), ou seja, descontar a área com solo descoberto (solo exposto) ou área coberta por touceiras (espécies de plantas não consumidas pelos animais, encontradas em pastagem de campo nativo ou campo nativo melhorado)',
  },
  numeroAnimais: {
    title: 'Número de animais',
    content: 'Número exato de animais que compõem o lote',
  },
  numeroPiquetes: {
    title: 'Número de piquetes',
    content: 'Número de subdivisões, ou seja, o número de faixas no potreiro que compõe o método de pastoreio rotativo.',
  },
  periodoOcupacaoC: {
    title: 'Período de ocupação',
    content:
      'Número de dias em que o lote de animais permanecerá no potreiro até ser realizado novo ajuste de lotação. OBS: Períodos longos (>30 dias) podem diminuir a precisão do cálculo em função de fatores climáticos.',
  },
  periodoOcupacaoR: {
    title: 'Período de ocupação',
    content:
      'Valor referente ao número aproximado de dias que os animais permanecerão em cada piquete (faixa). OBS: Para meio dia (ex. uma manhã ou uma tarde), inserir 0,5.',
  },
  quantidadeSuplemento: {
    title: 'Quantidade de suplemento',
    content:
      'Inserir a quantidade de suplemento (ração, feno e/ou silagem) fornecida aos animais, em kg/animal/dia. Inserir “0” se os animais não recebem suplementação. Utilizar a opção “Não sei” quando não se sabe exatamente a quantidade de suplemento fornecida ao lote de animais.',
  },
  alturaPasto: {
    title: 'Altura do pasto',
    content: 'Altura média, em centímetros, entre o solo e a parte superior das folhas. OBS: Realizar no mínimo 30 medições por hectare. Menor número de medições pode reduzir a precisão do cálculo em função da baixa representatividade da condição da pastagem.'
  }
};
