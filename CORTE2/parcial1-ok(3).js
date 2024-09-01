// Clase Cartesiana para manejar coordenadas cartesianas
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

// Clase Polar para manejar coordenadas polares y convertirlas a cartesianas
class Polar {
    #angulo;
    #radio;

    constructor(angulo, radio) {
        this.#angulo = angulo;
        this.#radio = radio;
    }

    toCartesiana() {
        const x = this.#radio * Math.cos(this.#angulo);
        const y = this.#radio * Math.sin(this.#angulo);
        return new Cartesiana(x, y);
    }
}

// Función para actualizar el formulario según el tipo de coordenadas seleccionado
function actualizarTipoCoordenada() {
    const tipoCoordenada = document.querySelector('input[name="tipo-coordenada"]:checked').value;
    const cartesianaInputs = document.getElementById('cartesiana-inputs');
    const polarInputs = document.getElementById('polar-inputs');

    if (tipoCoordenada === 'cartesiana') {
        cartesianaInputs.style.display = 'block';
        polarInputs.style.display = 'none';
    } else if (tipoCoordenada === 'polar') {
        cartesianaInputs.style.display = 'none';
        polarInputs.style.display = 'block';
    }
}

// Función principal para dibujar el polígono
function dibujarPoligono() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const n = obtenerNumeroLados();
    const opcion = obtenerOpcion();
    const lado = obtenerLado();
    const apotema = obtenerApotema();
    const tipoCoordenada = obtenerTipoCoordenada();

    let coordenadasCentro;

    if (tipoCoordenada === 'cartesiana') {
        const centroX = obtenerCentroX();
        const centroY = obtenerCentroY();
        coordenadasCentro = new Cartesiana(centroX, centroY);
    } else if (tipoCoordenada === 'polar') {
        const angulo = obtenerAngulo();
        const radio = obtenerRadio();
        const polar = new Polar(angulo, radio);
        coordenadasCentro = polar.toCartesiana();
    }

    let radioPoligono;

    if (!validarDatos(n, opcion, lado, apotema)) {
        return;
    }

    if (opcion === 'lado') {
        radioPoligono = lado / (2 * Math.sin(Math.PI / n));
    } else if (opcion === 'apotema') {
        radioPoligono = apotema / Math.cos(Math.PI / n);
    }

    dibujarPoligonoEnCanvas(ctx, radioPoligono, n, coordenadasCentro.x, coordenadasCentro.y);
}

// Obtener los valores del formulario
function obtenerNumeroLados() {
    return parseInt(document.getElementById('n').value);
}

function obtenerOpcion() {
    return document.querySelector('input[name="opcion"]:checked').value;
}

function obtenerLado() {
    return parseFloat(document.getElementById('lado').value);
}

function obtenerApotema() {
    return parseFloat(document.getElementById('apotema').value);
}

function obtenerTipoCoordenada() {
    return document.querySelector('input[name="tipo-coordenada"]:checked').value;
}

function obtenerCentroX() {
    return parseFloat(document.getElementById('centroX').value);
}

function obtenerCentroY() {
    return parseFloat(document.getElementById('centroY').value);
}

function obtenerAngulo() {
    return parseFloat(document.getElementById('angulo').value);
}

function obtenerRadio() {
    return parseFloat(document.getElementById('radio').value);
}

// Validar los datos ingresados por el usuario
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

// Dibujar el polígono en el lienzo
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

// Llamar a la función de actualización cuando cambie la selección
document.getElementById('opcion-lado').addEventListener('change', actualizarEntrada);
document.getElementById('opcion-apotema').addEventListener('change', actualizarEntrada);
document.getElementById('opcion-cartesiana').addEventListener('change', actualizarTipoCoordenada);
document.getElementById('opcion-polar').addEventListener('change', actualizarTipoCoordenada);

actualizarEntrada();
actualizarTipoCoordenada();
