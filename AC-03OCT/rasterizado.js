class Punto {
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

// Función para generar un número aleatorio entre un rango
function numeroAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

// Función para generar puntos aleatorios
function generarPuntos(n) {
    let puntos = [];
    for (let i = 0; i < n; i++) {
        const x = numeroAleatorio(50, 350); // Limites del canvas
        const y = numeroAleatorio(50, 350);
        puntos.push(new Punto(x, y));
    }
    return puntos;
}

// Función para calcular el centroide
function calcularCentroide(puntos) {
    let sumaX = 0, sumaY = 0;
    puntos.forEach(p => {
        sumaX += p.x;
        sumaY += p.y;
    });
    return new Punto(sumaX / puntos.length, sumaY / puntos.length);
}

// Función para ordenar los puntos en base al ángulo polar respecto al centroide
function ordenarPuntos(puntos) {
    const centroide = calcularCentroide(puntos);
    return puntos.sort((a, b) => {
        const angA = Math.atan2(a.y - centroide.y, a.x - centroide.x);
        const angB = Math.atan2(b.y - centroide.y, b.x - centroide.x);
        return angA - angB;
    });
}

// Dibuja el polígono en el canvas
function dibujarPoligonoCanvas(puntos) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);
    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x, puntos[i].y);
    }
    ctx.closePath();
    ctx.stroke();
}

// Determinar si el polígono es cóncavo o convexo
function esConvexo(puntos) {
    let signo = null;
    const n = puntos.length;
    for (let i = 0; i < n; i++) {
        const dx1 = puntos[(i + 1) % n].x - puntos[i].x;
        const dy1 = puntos[(i + 1) % n].y - puntos[i].y;
        const dx2 = puntos[(i + 2) % n].x - puntos[(i + 1) % n].x;
        const dy2 = puntos[(i + 2) % n].y - puntos[(i + 1) % n].y;
        const cruzProducto = dx1 * dy2 - dy1 * dx2;
        const nuevoSigno = Math.sign(cruzProducto);
        if (signo === null) {
            signo = nuevoSigno;
        } else if (nuevoSigno !== 0 && nuevoSigno !== signo) {
            return false; // Es cóncavo
        }
    }
    return true; // Es convexo
}

// Generar un polígono aleatorio entre 3 y 20 puntos
function generarPoligono() {
    const numPuntos = Math.floor(Math.random() * 18) + 3; // Entre 3 y 20 puntos
    let puntos = generarPuntos(numPuntos);

    // Ordenar los puntos para evitar líneas cruzadas
    puntos = ordenarPuntos(puntos);

    // Dibujar en canvas
    dibujarPoligonoCanvas(puntos);

    // Determinar si es cóncavo o convexo
    const convexidad = esConvexo(puntos) ? 'convexo' : 'cóncavo';
    document.getElementById('resultado').textContent = `El polígono es ${convexidad}`;
}
