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

  const resultadoConIva15 = calcularConIva(valorConIvaBase, 15);
  const resultadoConIva25 = calcularConIva(valorConIvaBase, 25);
  const resultadoMasIva15 = calcularMasIva(valorMasIvaBase, 15);
  const resultadoMasIva25 = calcularMasIva(valorMasIvaBase, 25);
  pintarValorConIvaDebajoInput(valorMasIvaBase);

  pintarResultado("conIvaTotal15", "conIvaProfit15", resultadoConIva15.total, resultadoConIva15.ganancia);
  pintarResultado("conIvaTotal25", "conIvaProfit25", resultadoConIva25.total, resultadoConIva25.ganancia);
  pintarResultado("masIvaTotal15", "masIvaProfit15", resultadoMasIva15.total, resultadoMasIva15.ganancia);
  pintarResultado("masIvaTotal25", "masIvaProfit25", resultadoMasIva25.total, resultadoMasIva25.ganancia);
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
