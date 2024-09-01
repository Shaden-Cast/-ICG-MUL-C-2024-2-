// Función para actualizar la entrada de lado o apotema
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

// Función para actualizar el tipo de coordenadas (cartesianas o polares)
function actualizarTipoCoordenada() {
    const tipoCoordenada = obtenerTipoCoordenada();
    const centroXInput = document.getElementById('centroX');
    const centroYInput = document.getElementById('centroY');
    const radioInput = document.getElementById('radio');
    const anguloInput = document.getElementById('angulo');

    if (tipoCoordenada === 'cartesiana') {
        centroXInput.disabled = false;
        centroYInput.disabled = false;
        radioInput.disabled = true;
        anguloInput.disabled = true;
    } else if (tipoCoordenada === 'polar') {
        centroXInput.disabled = true;
        centroYInput.disabled = true;
        radioInput.disabled = false;
        anguloInput.disabled = false;
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

    let coordenada;

    if (!validarDatos(n, opcion, lado, apotema)) {
        return;
    }

    if (tipoCoordenada === 'cartesiana') {
        const centroX = obtenerCentroX();
        const centroY = obtenerCentroY();
        coordenada = new Cartesiana(centroX, centroY);
    } else if (tipoCoordenada === 'polar') {
        const radio = obtenerRadio();
        const angulo = obtenerAngulo();
        coordenada = new Polar(angulo, radio).convertirACartesiana();
    }

    let radioPoligono;
    if (opcion === 'lado') {
        radioPoligono = lado / (2 * Math.sin(Math.PI / n));
    } else if (opcion === 'apotema') {
        radioPoligono = apotema / Math.cos(Math.PI / n);
    }

    dibujarPoligonoEnCanvas(ctx, radioPoligono, n, coordenada.x, coordenada.y);
}

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

    convertirACartesiana() {
        const x = this.#radio * Math.cos(this.#angulo);
        const y = this.#radio * Math.sin(this.#angulo);
        return new Cartesiana(x, y);
    }
}

// Obtener y validar entradas
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

function obtenerCentroX() {
    return parseFloat(document.getElementById('centroX').value);
}

function obtenerCentroY() {
    return parseFloat(document.getElementById('centroY').value);
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

// Actualizar entradas según la selección
document.getElementById('opcion-lado').addEvent
