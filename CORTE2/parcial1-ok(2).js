// Clase Cartesiana que representa un punto en el plano con encapsulamiento
class Cartesiana {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos getters y setters para x e y
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

// Clase Polar que representa un punto en coordenadas polares
class Polar {
    #angulo;
    #radio;

    constructor(angulo, radio) {
        this.#angulo = angulo;
        this.#radio = radio;
    }

    // Método para convertir coordenadas polares a cartesianas
    aCartesiana() {
        const x = this.#radio * Math.cos(this.#angulo);
        const y = this.#radio * Math.sin(this.#angulo);
        return new Cartesiana(x, y);
    }
}

// Función que actualiza según la selección del usuario si ingresa el valor del apotema o el lado
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

// Función principal para dibujar el polígono
function dibujarPoligono() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Obtener los datos ingresados
    const n = obtenerNumeroLados();
    const opcion = obtenerOpcion();
    const lado = obtenerLado();
    const apotema = obtenerApotema();
    const centro = obtenerCentro();  // Se obtiene como un objeto Cartesiana

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

// Obtener el número de lados
function obtenerNumeroLados() {
    return parseInt(document.getElementById('n').value);
}

// Obtener la opción seleccionada (lado o apotema)
function obtenerOpcion() {
    return document.querySelector('input[name="opcion"]:checked').value;
}

// Obtener la longitud del lado
function obtenerLado() {
    return parseFloat(document.getElementById('lado').value);
}

// Obtener la longitud del apotema
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

// Dibujar el polígono en el canvas
function dibujarPoligonoEnCanvas(ctx, radio, n, centro) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    for (let i = 0; i < n; i++) {
        const angulo = (2 * Math.PI / n) * i;
        const polar = new Polar(angulo, radio);
        const coordenada = polar.aCartesiana();
        const x = centro.x + coordenada.x;
        const y = centro.y - coordenada.y;

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
