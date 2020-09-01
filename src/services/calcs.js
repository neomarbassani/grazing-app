// REV 25 / 08 / 2020
/* eslint-disable radix */
/* eslint-disable */


export const taxaDeAcumuloPorEspecie = {
  campoNativo: {
    1: 17.6,
    2: 16.5,
    3: 12.7,
    4: 9.3,
    5: 3.5,
    6: 6.7,
    7: 6.8,
    8: 0.1,
    9: 5.7,
    10: 17.2,
    11: 14.6,
    12: 11,
    media: 10.1,
    minimo: 0.1,
  },
  azevem: {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: 16.7,
    6: 44.1,
    7: 71.9,
    8: 56.3,
    9: 76.6,
    10: 50.8,
    11: 9.4,
    12: undefined,
    media: 46.5,
    minimo: 9.4,
  },
  aveiaAzevem: {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: 23.1,
    6: 34,
    7: 43.6,
    8: 67.6,
    9: 48.8,
    10: 29.2,
    11: 16.8,
    12: undefined,
    media: 37.6,
    minimo: 16.8,
  },
  sudao: {
    1: 123,
    2: 130,
    3: 64.1,
    4: 18.8,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined,
    10: undefined,
    11: 67,
    12: 88,
    media: 81.8,
    minimo: 18.8,
  },
  milheto: {
    1: 178,
    2: 140.9,
    3: 122.9,
    4: 63.1,
    5: 16.4,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined,
    10: undefined,
    11: 101.2,
    12: 226.9,
    media: 121.3,
    minimo: 16.4,
  },
  sorgo: {
    1: 79.1,
    2: 52.2,
    3: 60.9,
    4: 49.5,
    5: 24.3,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined,
    10: undefined,
    11: 67,
    12: 86.4,
    media: 59.9,
    minimo: 24.3,
  },
  tifton: {
    1: 115.2,
    2: 113.4,
    3: 83.5,
    4: 71.3,
    5: 38.1,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined,
    10: undefined,
    11: 57.1,
    12: 111.7,
    media: 84.3,
    minimo: 38.1,
  },
  papua: {
    1: 152,
    2: 165.9,
    3: 145.3,
    4: 71,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined,
    10: undefined,
    11: 83,
    12: 124.1,
    media: 123.5,
    minimo: 71,
  },
  campoNativoMelhorado: {
    1: 59.1,
    2: 33.5,
    3: 16.8,
    4: 7.6,
    5: 4.5,
    6: 6,
    7: 10.6,
    8: 16.9,
    9: 23.5,
    10: 29,
    11: 31.9,
    12: 30.7,
    media: 22.5,
    minimo: 4.5,
  },
  aveia: {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: 21,
    6: 21,
    7: 48.9,
    8: 44.8,
    9: 56.2,
    10: 34.7,
    11: undefined,
    12: undefined,
    media: 37.8,
    minimo: 4.5,
  },
};

export const especie = {
  campoNativo: {
    relacaoMassaAltura: 197.8,
    alturaOtima: 12,
  },
  azevem: {
    relacaoMassaAltura: 119.6,
    alturaOtima: 20,
  },
  aveiaAzevem: {
    relacaoMassaAltura: 88.7,
    alturaOtima: 20,
  },
  sudao: {
    relacaoMassaAltura: 62.7,
    alturaOtima: 30,
  },
  milheto: {
    relacaoMassaAltura: 63.8,
    alturaOtima: 40,
  },
  sorgo: {
    relacaoMassaAltura: 40.6,
    alturaOtima: 50,
  },
  tifton: {
    relacaoMassaAltura: 227.1,
    alturaOtima: 19,
  },
  papua: {
    relacaoMassaAltura: 59.9,
    alturaOtima: 30,
  },
  campoNativoMelhorado: {
    relacaoMassaAltura: 229.5,
    alturaOtima: 12,
  },
  aveia: {
    relacaoMassaAltura: 85.3,
    alturaOtima: 30,
  },
};

export const consumo = {
  terneiro: ({peso}) =>
    ((Math.pow(peso, 0.75) *
      (0.2435 * 1.2 - 0.046 * Math.pow(1.2, 2) - 0.1128)) /
      1.2) *
    1.16,
  novilha: ({peso}) =>
    (Math.pow(peso, 0.75) *
      (0.2435 * 1.2 - 0.0466 * Math.pow(1.2, 2) - 0.0869)) /
    1.2,
  vacaSeca: ({peso}) =>
    (Math.pow(peso, 0.75) * (0.04997 * Math.pow(1.2, 2) + 0.0384)) / 1.2,
  vacaPrenha: ({peso}) =>
    (Math.pow(peso, 0.75) * (0.04997 * 1.2 + 0.04631)) / 1.2 + 0.2 * 10,
  novilhaLeite: ({peso, diasDeGestacao}) => {
    if (diasDeGestacao < 210) {
      return (
        ((Math.pow(peso, 0.75) *
          (0.2435 * 1.35 - 0.0466 * Math.pow(1.35, 2) - 0.1128)) /
          1.35) *
        1.16
      );
    }
    if (diasDeGestacao >= 210 && diasDeGestacao < 259) {
      return (
        ((Math.pow(peso, 0.75) *
          (0.2435 * 1.35 - 0.0466 * Math.pow(1.35, 2) - 0.1128)) /
          1.35) *
        (1 + (210 - diasDeGestacao) * 0.0025) *
        1.16
      );
    }
    if (diasDeGestacao > 259) {
      return (
        ((1.71 - 0.69 * Math.pow(2.72, 0.35 * diasDeGestacao - 280)) / 100) *
        peso *
        1.16
      );
    }
  },
  vacaLactacao: ({peso, semanasDeLactacao, quantidadeDeLeite}) => {

    const FC1 = 0.4 * (quantidadeDeLeite * 1) + 15 * 0.03 * quantidadeDeLeite;
    const FC2 = 1 - Math.pow(2.72, (-1 * (0.192 * ((semanasDeLactacao * 1) + 3.67))));

    return (Math.pow(peso, 0.75) * 0.0968 + 0.372 * FC1 - 0.293) * FC2;
  },
};

export const quantidadeDeSuplemento = ({
  peso,
  racao = 0,
  feno = 0,
  silagem = 0,
}) => {
  
  if (racao < 0 || feno < 0 || silagem < 0) {
    return peso * 0.01;
  }
  return (racao * 1) + (feno * 0.85) + (silagem * 0.3);
};

export const getMouth = data => new Date(data).getUTCMonth() + 1;

export function ajustarLotacaoAnimalContinuo({
  dataDeInicio,
  peso,
  alturaDoPasto,
  tipoDePasto,
  tempoDePermanencia,
  areaDoPotreiro,
}) {
  const relacaoMassaAltura = especie[tipoDePasto].relacaoMassaAltura;

  const taxaDeAcumulo =
    taxaDeAcumuloPorEspecie[tipoDePasto][getMouth(dataDeInicio)];

  const resultado =
    (((alturaDoPasto * relacaoMassaAltura) / tempoDePermanencia +
      taxaDeAcumulo) /
      0.12 /
      peso) *
    areaDoPotreiro;

  const resultados = [
    {
      name: 'Número de animais no potreiro',
      value: Math.round(resultado).toLocaleString('pt-BR'),
    },
  ];

  console.log(resultados);

  return resultados;
}
/* ajustarLotacaoAnimalContinuo({
  dataDeInicio: Date.now(),
  peso: 500,
  alturaDoPasto: 30,
  tipoDePasto: "campoNativo",
  tempoDePermanencia: 10,
  areaDoPotreiro: 5,
}) */

export function ajustarLotacaoAnimalRotativo({
  dataDeInicio,
  peso,
  racao = 0,
  feno = 0,
  silagem = 0,
  numeroDePiquetes,
  alturaDoPasto,
  tipoDePasto,
  tempoDePermanencia,
  areaDoPotreiro,
  diasDeGestacao = 0,
  semanasDeLactacao = 0,
  quantidadeDeLeite = 0,
  tipoDeAnimal,
}) {
  const relacaoMassaAltura = especie[tipoDePasto].relacaoMassaAltura;
  const alturaOtima = especie[tipoDePasto].alturaOtima;

  const taxaDeAcumulo =
    taxaDeAcumuloPorEspecie[tipoDePasto][getMouth(dataDeInicio)];

  const consumoNRC = consumo[tipoDeAnimal]({
    peso,
    diasDeGestacao,
    semanasDeLactacao,
    quantidadeDeLeite,
  });

  const quantSuplemento = quantidadeDeSuplemento({
    peso,
    racao,
    feno,
    silagem,
  });

  let cons = consumoNRC - quantSuplemento
  if(cons == 0) cons = 1
  const resultado =
  (
    (
      (
        ( alturaDoPasto * relacaoMassaAltura ) -
        ( alturaOtima * 0.6 * relacaoMassaAltura )
      ) * areaDoPotreiro / numeroDePiquetes
    ) + (
      taxaDeAcumulo * ( areaDoPotreiro / numeroDePiquetes ) *
      ((( alturaOtima * 0.4 ) / ( taxaDeAcumulo / relacaoMassaAltura )) / ( numeroDePiquetes < 2 ? 1 : numeroDePiquetes - 1 ))
    )
  ) / (
    ( cons ) *
    ((
      ( alturaOtima * 0.4 ) /
      ( taxaDeAcumulo / relacaoMassaAltura ) /
      ( numeroDePiquetes < 2 ? 1 : numeroDePiquetes -1 )
    ))
  )

  const resultados = [
    {
      name: 'Número de animais no potreiro',
      value: Math.round(resultado).toLocaleString('pt-BR'),
    },
  ];

  console.log({
    dataDeInicio,
    peso,
    racao,
    feno,
    silagem,
    numeroDePiquetes,
    alturaDoPasto,
    tipoDePasto,
    tempoDePermanencia,
    areaDoPotreiro,
    diasDeGestacao,
    semanasDeLactacao,
    quantidadeDeLeite,
    tipoDeAnimal,
    quantSuplemento,
    consumoNRC,
    taxaDeAcumulo,
    alturaOtima,
    relacaoMassaAltura,
    resultados
  });

  return resultados;
}
/* ajustarLotacaoAnimalRotativo({
  dataDeInicio: Date.now(),
  peso: 500,
  racao:0,
  feno:0,
  silagem:0,
  numeroDePiquetes: 1,
  alturaDoPasto: 30,
  tipoDePasto: 'campoNativo',
  tempoDePermanencia: 20,
  areaDoPotreiro: 5,
  diasDeGestacao:0,
  semanasDeLactacao:0,
  quantidadeDeLeite:0,
  categoriaAnimal: 'bovinoCorte',
  tipoDeAnimal: 'novilha',
}) */

export function tamanhoPotreiroRotativo({
  dataDeInicio,
  peso,
  quantidadeDeAnimais,
  racao = 0,
  feno = 0,
  silagem = 0,
  tipoDePasto,
  tipoDeAnimal,
  diasDeGestacao = 0,
  semanasDeLactacao = 0,
  quantidadeDeLeite = 0,
}) {
  const relacaoMassaAltura = especie[tipoDePasto].relacaoMassaAltura;
  const alturaOtima = especie[tipoDePasto].alturaOtima;
  const media = taxaDeAcumuloPorEspecie[tipoDePasto].media;

  const taxaDeAcumulo =
    taxaDeAcumuloPorEspecie[tipoDePasto][getMouth(dataDeInicio)];

  const consumoNRC = consumo[tipoDeAnimal]({
    peso,
    diasDeGestacao,
    semanasDeLactacao,
    quantidadeDeLeite,
  });

  const quantSuplemento = quantidadeDeSuplemento({
    peso,
    racao,
    feno,
    silagem,
  });

  let cons = consumoNRC - quantSuplemento
  if(cons == 0) cons = 1
  const resultado =
    ((cons * quantidadeDeAnimais) /
      (alturaOtima * 0.4 * relacaoMassaAltura + media)) *
    ((alturaOtima * 0.4) / (media / relacaoMassaAltura) + 1);

  const resultados = [
    {
      name: 'Área total do potreiro (ha)',
      value: Math.round(resultado).toLocaleString('pt-BR'),
    },
  ];

  console.log(resultados);

  return resultados;
}
/* tamanhoPotreiroRotativo({
  dataDeInicio: Date.now(),
  peso: 300,
  quantidadeDeAnimais: 50,
  racao: 0,
  silagem: 0,
  feno: 0,
  tipoDePasto: "campoNativo",
  categoriaAnimal: "bovinoCorte",
  tipoDeAnimal: "novilha",
  daysOfLactation: 0,
  weeksOfLactation: 0,
  milkQuantity: 0,
}); */

export function tamanhoPotreiroContinuo({
  dataDeInicio,
  peso,
  tipoDePasto,
  quantidadeDeAnimais,
}) {
  const constantePeloTipoDePasto =
    tipoDePasto === 'campoNativo' || tipoDePasto === 'campoNativoMelhorado'
      ? 60
      : 30;

  const relacaoMassaAltura = especie[tipoDePasto].relacaoMassaAltura;
  const alturaOtima = especie[tipoDePasto].alturaOtima;
  const media = taxaDeAcumuloPorEspecie[tipoDePasto].media;

  const resultado =
    (quantidadeDeAnimais * peso * 0.12) /
    ((alturaOtima * 0.8 * relacaoMassaAltura) / constantePeloTipoDePasto +
      media);

  const resultados = [
    {
      name: 'Área total do potreiro (ha)',
      value: Math.round(resultado).toLocaleString('pt-BR'),
    },
  ];

  console.log(resultados);

  return resultados;
}
/* tamanhoPotreiroContinuo({
  dataDeInicio: Date.now(),
  peso: 500,
  tipoDePasto: "campoNativo",
  quantidadeDeAnimais: 50,
}); */

export function fornecerSuplementoContinuo({
  dataDeInicio, //ok
  peso,
  quantidadeDeAnimais,
  areaDoPotreiro,
  alturaDoPasto,
  tempoDePermanencia,
  tipoDePasto,
  categoriaAnimal,
  tipoDeAnimal,
  diasDeGestacao = 0,
  semanasDeLactacao = 0,
  quantidadeDeLeite = 0,
}) {
  const relacaoMassaAltura = especie[tipoDePasto].relacaoMassaAltura;
  const alturaOtima = especie[tipoDePasto].alturaOtima;
  const media = taxaDeAcumuloPorEspecie[tipoDePasto].media;

  const taxaDeAcumulo =
    taxaDeAcumuloPorEspecie[tipoDePasto][getMouth(dataDeInicio)];

  const consumoNRC = consumo[tipoDeAnimal]({
    peso,
    diasDeGestacao,
    semanasDeLactacao,
    quantidadeDeLeite,
  });

  const resultado =
    (((quantidadeDeAnimais * peso) / areaDoPotreiro -
      (((alturaDoPasto * relacaoMassaAltura) / tempoDePermanencia +
        (taxaDeAcumulo -
          (0.8 * alturaOtima * relacaoMassaAltura -
            alturaDoPasto * relacaoMassaAltura) /
            tempoDePermanencia)) /
        12) *
        100) /
      peso) *
    consumoNRC *
    areaDoPotreiro;

  const resultadoMedio = resultado / quantidadeDeAnimais;
  
  let resultados
  if(resultado <= 0) {
    resultados = [{ name: 'Não há necessidade de suplementar os animais' }]
  }else 
  resultados = [
    {
      name:
        'Quantidade de suplemento para o lote de animais (kg/dia)',
      value: Math.round(resultado).toLocaleString('pt-BR'),
    },
    {
      name: 'Quantidade de suplemento por animal (kg/dia)',
      value: Math.round(resultadoMedio).toLocaleString('pt-BR'),
    }
  ];

  

  console.log(resultados);

  return resultados;
}
/* fornecerSuplementoContinuo({
  dataDeInicio: Date.now(),
  peso: 300,
  quantidadeDeAnimais: 40,
  areaDoPotreiro: 5,
  alturaDoPasto: 40,
  tempoDePermanencia: 15,
  tipoDePasto: "campoNativo",
  categoriaAnimal: "bovinoCorte",
  tipoDeAnimal: "novilha",
  diasDeGestacao: 0,
  semanasDeLactacao: 0,
  quantidadeDeLeite: 0,
  racao: 0,
  feno: 0,
  silagem: 0,
}); */

export function fornecerSuplementoRotativo({
  dataDeInicio,
  peso,
  racao = 0,
  feno = 0,
  silagem = 0,
  quantidadeDeAnimais,
  areaDoPotreiro,
  alturaDoPasto,
  numeroDePiquetes,
  diasDePermanencia,
  tipoDePasto,
  categoriaAnimal,
  tipoDeAnimal,
  diasDeGestacao = 0,
  semanasDeLactacao = 0,
  quantidadeDeLeite = 0,
}) {
  const relacaoMassaAltura = especie[tipoDePasto].relacaoMassaAltura;
  const alturaOtima = especie[tipoDePasto].alturaOtima;
  const media = taxaDeAcumuloPorEspecie[tipoDePasto].media;

  const taxaDeAcumulo =
    taxaDeAcumuloPorEspecie[tipoDePasto][getMouth(dataDeInicio)];

  const consumoNRC = consumo[tipoDeAnimal]({
    peso,
    diasDeGestacao,
    semanasDeLactacao,
    quantidadeDeLeite,
  });
  
  const resultado1 =
    (consumoNRC * diasDePermanencia * quantidadeDeAnimais -
      ((alturaDoPasto * relacaoMassaAltura -
        alturaOtima * 0.6 * relacaoMassaAltura) *
        (areaDoPotreiro / numeroDePiquetes) +
        ((taxaDeAcumulo * areaDoPotreiro) / numeroDePiquetes) *
          diasDePermanencia)) /
    diasDePermanencia;
  const resultado2 = resultado1 / quantidadeDeAnimais;
  let resultados
  if(resultado1 <= 0) {
    resultados = [{ name: 'Não há necessidade de suplementar os animais' }]
  }else 
  resultados = [
    {
      name:
        'Quantidade de suplemento para o lote de animais (kg/dia)',
      value: Math.round(resultado1).toLocaleString('pt-BR'),
    },
    {
      name: 'Quantidade de suplemento por animal (kg/dia)',
      value: Math.round(resultado2).toLocaleString('pt-BR'),
    },
  ];

  console.log(resultados);

  return resultados;
}
/* fornecerSuplementoRotativo({
  dataDeInicio: Date.now(),
  peso: 500,
  quantidadeDeAnimais: 30,
  areaDoPotreiro: 8,
  alturaDoPasto: 30,
  numeroDePiquetes: 5,
  diasDePermanencia: 20,
  tipoDePasto: "campoNativo",
  categoriaAnimal: "bovinoCorte",
  tipoDeAnimal: "novilha",
  diasDeGestacao: 0,
  semanasDeLactacao: 0,
  quantidadeDeLeite: 0,
}); */

export function definirPeriodoDeOcupacaoRotativo({
  dataDeInicio,
  peso,
  quantidadeDeAnimais,
  areaDoPotreiro,
  alturaDoPasto,
  numeroDePiquetes,
  tipoDePasto,
  categoriaAnimal,
  tipoDeAnimal,
  diasDeGestacao = 0,
  semanasDeLactacao = 0,
  quantidadeDeLeite = 0,
  racao = 0,
  feno = 0,
  silagem = 0,
}) {
  const relacaoMassaAltura = especie[tipoDePasto].relacaoMassaAltura;
  const alturaOtima = especie[tipoDePasto].alturaOtima;

  const taxaDeAcumulo =
    taxaDeAcumuloPorEspecie[tipoDePasto][getMouth(dataDeInicio)];

  const consumoNRC = consumo[tipoDeAnimal]({
    peso,
    diasDeGestacao,
    semanasDeLactacao,
    quantidadeDeLeite,
  });

  const quantSuplemento = quantidadeDeSuplemento({
    peso,
    racao,
    feno,
    silagem,
  });

  let cons = consumoNRC - quantSuplemento
  if(cons == 0) cons = 1
  const resultado =
    ((alturaDoPasto * relacaoMassaAltura -
      alturaOtima * 0.6 * relacaoMassaAltura) *
      (areaDoPotreiro / numeroDePiquetes) +
      taxaDeAcumulo * (areaDoPotreiro / numeroDePiquetes)) /
    ((cons) * quantidadeDeAnimais);

  let resultados = []
  if(resultado < 1) {
    resultados.push({ name: 'Não é possível colocar os animais na área. Aguarde até que a pastagem atinja altura pré-pastejo adequada.' })
  } else resultados.push({
    name: 'Período de ocupação (dias)',
    value: Math.round(resultado).toLocaleString('pt-BR'),
  });

  console.log(resultados);

  return resultados;
}
/* definirPeriodoDeOcupacaoRotativo({
  dataDeInicio: Date.now(),
  peso: 500,
  quantidadeDeAnimais: 30,
  areaDoPotreiro: 5,
  alturaDoPasto: 40,
  numeroDePiquetes: 5,
  tipoDePasto: "campoNativo",
  categoriaAnimal: "bovinoCorte",
  tipoDeAnimal: "novilha",
  diasDeGestacao: 0,
  semanasDeLactacao: 0,
  quantidadeDeLeite: 0,
  racao: 0,
  feno: 0,
  silagem: 0,
}); */

export function calcularNumeroDePiquetes({
  dataDeInicio,
  tipoDePasto,
  peso,
  quantidadeDeAnimais,
  areaDoPotreiro,
  tipoDeAnimal,
  categoriaAnimal,
  diasDeGestacao = 0,
  semanasDeLactacao = 0,
  quantidadeDeLeite = 0,
  racao = 0,
  feno = 0,
  silagem = 0,
}) {

  const relacaoMassaAltura = especie[tipoDePasto].relacaoMassaAltura;
  const alturaOtima = especie[tipoDePasto].alturaOtima;
  const media = taxaDeAcumuloPorEspecie[tipoDePasto].media;

  const taxaDeAcumulo =
    taxaDeAcumuloPorEspecie[tipoDePasto][getMouth(dataDeInicio)];

  const consumoNRC = consumo[tipoDeAnimal]({
    peso,
    diasDeGestacao,
    semanasDeLactacao,
    quantidadeDeLeite,
  });

  const quantSuplemento = quantidadeDeSuplemento({
    peso,
    racao,
    feno,
    silagem,
  });

  let cons = consumoNRC - quantSuplemento
  if(cons == 0) cons = 1
  const resultado1 = ( 
    (( alturaOtima* 0.4 / (media / relacaoMassaAltura)) + 1) + 
    (areaDoPotreiro / (((cons) * quantidadeDeAnimais)/(((alturaOtima*0.4)*relacaoMassaAltura)+media)))
  )/2
  const resultado2 = Math.round(
    resultado1 *
    (((cons) * quantidadeDeAnimais) /
      (alturaOtima * 0.4 * relacaoMassaAltura + media)));
  
  let resultados = [
    {
      name: 'Número de piquetes',
      value: Math.round(resultado1).toLocaleString('pt-BR'),
    },
    {
      name: 'Área do potreiro adequada (ha) para manter o lote de animais',
      value: resultado2.toFixed(1)
    },
  ];
  
  if(resultado2 == areaDoPotreiro) {
    resultados.push({name: 'A área do potreiro está adequada para manter o lote de animais.'})
  }else if(resultado2 > areaDoPotreiro) {
    resultados.push({name: 'A área do potreiro é superior à área necessária para manter o lote de animais.'})
  }else if(resultado2 < areaDoPotreiro) {
    resultados.push({name: 'A área do potreiro é inferior à área necessária para manter o lote de animais. Recomenda-se aumentar a área do potreiro, reduzir a lotação animal ou fornecer suplemento ao lote de animais.'})
  }

  console.log(resultados);

  return resultados;
}
/* calcularNumeroDePiquetes({
  dataDeInicio: Date.now(),
  tipoDePasto: "campoNativo",
  peso: 500,
  quantidadeDeAnimais: 30,
  numeroDePiquetes: 5,
  tipoDeAnimal: "novilha",
  categoriaAnimal: "bovinoCorte",
  diasDeGestacao: 0,
  semanasDeLactacao: 0,
  quantidadeDeLeite: 0,
  racao: 0,
  feno: 0,
  silagem: 0,
});
 */