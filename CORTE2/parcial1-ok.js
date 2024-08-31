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

// la funcion principal dibuja el poligono 
function dibujarPoligono() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Obtener los dtaos ingresados 
    const n = obtenerNumeroLados();
    const opcion = obtenerOpcion();
    const lado = obtenerLado();
    const apotema = obtenerApotema();
    const centroX = obtenerCentroX();
    const centroY = obtenerCentroY();

    let radio;

    if (!validarDatos(n, opcion, lado, apotema)) {
        return;
    }

    if (opcion === 'lado') {
        radio = lado / (2 * Math.sin(Math.PI / n));
    } else if (opcion === 'apotema') {
        radio = apotema / Math.cos(Math.PI / n);
    }

    dibujarPoligonoEnCanvas(ctx, radio, n, centroX, centroY);
}

// obtener los lados 
function obtenerNumeroLados() {
    return parseInt(document.getElementById('n').value);
}

// optener la opcion de apotema o lado 
function obtenerOpcion() {
    return document.querySelector('input[name="opcion"]:checked').value;
}

// optener los lados 
function obtenerLado() {
    return parseFloat(document.getElementById('lado').value);
}

// Obtener el apotema 
function obtenerApotema() {
    return parseFloat(document.getElementById('apotema').value);
}

// Obtener la coordenada X 
function obtenerCentroX() {
    return parseFloat(document.getElementById('centroX').value);
}

// Obtener la coordenada Y 
function obtenerCentroY() {
    return parseFloat(document.getElementById('centroY').value);
}

// Validar los datos optenidos 
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

// Dibujar el polígono 
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


actualizarEntrada();
