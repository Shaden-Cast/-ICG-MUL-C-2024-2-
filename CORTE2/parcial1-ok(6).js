// Clase Cartesiana con encapsulamiento
class Cartesiana {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

// Clase Polar con encapsulamiento y conversión a cartesianas
class Polar {
    #angulo;
    #radio;

    constructor(angulo, radio) {
        this.#angulo = angulo;
        this.#radio = radio;
    }

    convertirACartesiana(centroX, centroY) {
        const x = centroX + this.#radio * Math.cos(this.#angulo);
        const y = centroY - this.#radio * Math.sin(this.#angulo); // restamos porque el canvas tiene el origen en la esquina superior izquierda
        return new Cartesiana(x, y);
    }
}

// Función para actualizar los campos de entrada
function actualizarEntrada() {
    const opcion = obtenerOpcion();
    const ladoInput = document.getElementById('lado');
    const apotemaInput = document.getElementById('apotema');

    if (opcion === 'lado') {
        ladoInput.disabled = false;
        apotemaInput.disabled = true;
    } else if (opcion === 'apotema') {
        ladoInput.disabled = true;
        apotemaInput.disabled = false;
    }
}

// Función para actualizar el tipo de coordenadas
function actualizarTipoCoordenada() {
    const tipoCoordenada = obtenerTipoCoordenada();
    const radioInput = document.getElementById('radio');
    const anguloInput = document.getElementById('angulo');
    const centroXInput = document.getElementById('centroX');
    const centroYInput = document.getElementById('centroY');

    if (tipoCoordenada === 'cartesiana') {
        radioInput.disabled = true;
        anguloInput.disabled = true;
        centroXInput.disabled = false;
        centroYInput.disabled = false;
    } else if (tipoCoordenada === 'polar') {
        radioInput.disabled = false;
        anguloInput.disabled = false;
        centroXInput.disabled = true;
        centroYInput.disabled = true;
    }
}

// Función principal para dibujar el polígono
function dibujarPoligono() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const n = obtenerNumeroLados();
    const opcion = obtenerOpcion();
    const tipoCoordenada = obtenerTipoCoordenada();
    const lado = obtenerLado();
    const apotema = obtenerApotema();

    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;

    let coordenada;

    if (!validarDatos(n, opcion, lado, apotema)) {
        return;
    }

    if (tipoCoordenada === 'cartesiana') {
        coordenada = new Cartesiana(centroX, centroY);
    } else if (tipoCoordenada === 'polar') {
        const radio = obtenerRadio();
        const angulo = obtenerAngulo();
        coordenada = new Polar(angulo, radio).convertirACartesiana(centroX, centroY);
    }

    let radioPoligono;
    if (opcion === 'lado') {
        radioPoligono = lado / (2 * Math.sin(Math.PI / n));
    } else if (opcion === 'apotema') {
        radioPoligono = apotema / Math.cos(Math.PI / n);
    }

    // Usa el centro del canvas para dibujar el polígono
    dibujarPoligonoEnCanvas(ctx, radioPoligono, n, centroX, centroY);
}

// Dibujar el polígono en el canvas
function dibujarPoligonoEnCanvas(ctx, radio, n, centroX, centroY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    for (let i = 0; i < n; i++) {
        const angulo = (2 * Math.PI / n) * i;
        const x = centroX + radio * Math.cos(angulo);
        const y = centroY - radio * Math.sin(angulo);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.closePath();
    ctx.stroke();
}

// Funciones auxiliares para obtener valores del formulario
function obtenerNumeroLados() {
    return parseInt(document.getElementById('n').value);
}

function obtenerOpcion() {
    return document.querySelector('input[name="opcion"]:checked').value;
}

function obtenerTipoCoordenada() {
    return document.querySelector('input[name="tipoCoordenada"]:checked').value;
}

function obtenerLado() {
    return parseFloat(document.getElementById('lado').value);
}

function obtenerApotema() {
    return parseFloat(document.getElementById('apotema').value);
}

function obtenerRadio() {
    return parseFloat(document.getElementById('radio').value);
}

function obtenerAngulo() {
    return parseFloat(document.getElementById('angulo').value);
}

function validarDatos(n, opcion, lado, apotema) {
    if (isNaN(n) || n < 3) {
        alert("Número de lados no válido. Debe ser igual o mayor a 3.");
        return false;
    }

    if (opcion === 'lado' && isNaN(lado)) {
        alert("Debe ingresar la longitud del lado.");
        return false;
    }

    if (opcion === 'apotema' && isNaN(apotema)) {
        alert("Debe ingresar la longitud del apotema.");
        return false;
    }

    return true;
}

// Asociar funciones a eventos de cambio
document.getElementById('opcion-lado').addEventListener('change', actualizarEntrada);
document.getElementById('opcion-apotema').addEventListener('change', actualizarEntrada);
document.getElementById('opcion-cartesiana').addEventListener('change', actualizarTipoCoordenada);
document.getElementById('opcion-polar').addEventListener('change', actualizarTipoCoordenada);

// Inicializar el estado de las entradas
actualizarEntrada();
actualizarTipoCoordenada();
