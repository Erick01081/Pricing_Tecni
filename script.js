const porcentajeIva = 19;

function obtenerElemento(idElemento) {
  return document.getElementById(idElemento);
}

function obtenerNumeroSeguro(valorTexto) {
  const valor = Number.parseFloat(valorTexto);
  if (Number.isNaN(valor) || valor < 0) {
    return 0;
  }
  return valor;
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(valor);
}

function calcularConIva(valorBase, porcentajeGanancia) {
  const factorGanancia = 1 - porcentajeGanancia / 100;
  if (factorGanancia <= 0) {
    return { total: 0, ganancia: 0 };
  }
  const total = valorBase / factorGanancia;
  const ganancia = total - valorBase;
  return { total, ganancia };
}

function calcularMasIva(valorBase, porcentajeGanancia) {
  const resultadoConIva = calcularConIva(valorBase, porcentajeGanancia);
  const total = resultadoConIva.total * (1 + porcentajeIva / 100);
  const ganancia = resultadoConIva.ganancia;
  return { total, ganancia };
}

function pintarResultado(idTotal, idGanancia, total, ganancia) {
  const totalElemento = obtenerElemento(idTotal);
  const gananciaElemento = obtenerElemento(idGanancia);

  if (!totalElemento || !gananciaElemento) {
    return;
  }

  totalElemento.textContent = formatearMoneda(total);
  gananciaElemento.textContent = `Ganancia: ${formatearMoneda(ganancia)}`;
}

function pintarValorConIvaDebajoInput(valorBase) {
  const textoValorConIva = obtenerElemento("valorMasIvaConIvaTexto");
  if (!textoValorConIva) {
    return;
  }

  const valorConIva = valorBase * (1 + porcentajeIva / 100);
  textoValorConIva.textContent = `Valor con IVA (${porcentajeIva}%): ${formatearMoneda(valorConIva)}`;
}

function recalcularPrecios() {
  const inputConIva = obtenerElemento("valorConIva");
  const inputMasIva = obtenerElemento("valorMasIva");

  const valorConIvaBase = obtenerNumeroSeguro(inputConIva ? inputConIva.value : "0");
  const valorMasIvaBase = obtenerNumeroSeguro(inputMasIva ? inputMasIva.value : "0");

  const resultadoConIva18 = calcularConIva(valorConIvaBase, 18);
  const resultadoConIva20 = calcularConIva(valorConIvaBase, 20);
  const resultadoMasIva18 = calcularMasIva(valorMasIvaBase, 18);
  const resultadoMasIva20 = calcularMasIva(valorMasIvaBase, 20);
  pintarValorConIvaDebajoInput(valorMasIvaBase);

  pintarResultado("conIvaTotal18", "conIvaProfit18", resultadoConIva18.total, resultadoConIva18.ganancia);
  pintarResultado("conIvaTotal20", "conIvaProfit20", resultadoConIva20.total, resultadoConIva20.ganancia);
  pintarResultado("masIvaTotal18", "masIvaProfit18", resultadoMasIva18.total, resultadoMasIva18.ganancia);
  pintarResultado("masIvaTotal20", "masIvaProfit20", resultadoMasIva20.total, resultadoMasIva20.ganancia);
}

function main() {
  const inputConIva = obtenerElemento("valorConIva");
  const inputMasIva = obtenerElemento("valorMasIva");

  if (inputConIva) {
    inputConIva.addEventListener("input", recalcularPrecios);
  }

  if (inputMasIva) {
    inputMasIva.addEventListener("input", recalcularPrecios);
  }

  recalcularPrecios();
}

main();
