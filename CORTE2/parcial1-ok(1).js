// Clase Cartesiana donde se gestiona las coordendas x y y
class Cartesiana {
    #x; // el # representa el encapsulamiento
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos getters y setters para atributos
    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = value;
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = value;
    }
}

// esta funcion actualiza segun la seleccion del usuario si ingresa el valor del apotema o el lado
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

// función principal para dibujar el polígono
function dibujarPoligono() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // optener los datos ingresados por el usuario 
    const n = obtenerNumeroLados();
    const opcion = obtenerOpcion();
    const lado = obtenerLado();
    const apotema = obtenerApotema();
    const centro = obtenerCentro();  // Se optiene como objeto la clase cartesiana

    let radio;

    if (!validarDatos(n, opcion, lado, apotema)) {
        return;
    }

    if (opcion === 'lado') {
        radio = lado / (2 * Math.sin(Math.PI / n));
    } else if (opcion === 'apotema') {
        radio = apotema / Math.cos(Math.PI / n);
    }

    dibujarPoligonoEnCanvas(ctx, radio, n, centro);
}

// numero de lados 
function obtenerNumeroLados() {
    return parseInt(document.getElementById('n').value);
}

// obtener lado o apotema
function obtenerOpcion() {
    return document.querySelector('input[name="opcion"]:checked').value;
}

// longitud del lado
function obtenerLado() {
    return parseFloat(document.getElementById('lado').value);
}

// longitud del apotema
function obtenerApotema() {
    return parseFloat(document.getElementById('apotema').value);
}

// Obtener el centro como un objeto Cartesiana
function obtenerCentro() {
    const x = parseFloat(document.getElementById('centroX').value);
    const y = parseFloat(document.getElementById('centroY').value);
    return new Cartesiana(x, y);
}

// Validar los datos obtenidos
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
function dibujarPoligonoEnCanvas(ctx, radio, n, centro) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    for (let i = 0; i < n; i++) {
        const angulo = (2 * Math.PI / n) * i;
        const x = centro.x + radio * Math.cos(angulo);
        const y = centro.y - radio * Math.sin(angulo);

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

actualizarEntrada();
