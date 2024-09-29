// Crear el espacio de SVG
const svgCanvas = document.getElementById('svgCanvas');

// Clase para representar un punto en el espacio
class Punto {
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

    #x;
    #y;
}

// Clase para dibujar una línea en SVG
class Linea {
    constructor(puntoInicio, puntoFin, color = "black", width = 2) {
        this.#puntoInicio = puntoInicio; // Instancia de Punto
        this.#puntoFin = puntoFin;       // Instancia de Punto
        this.#color = color;
        this.#width = width;
    }

    drawBresenham() {
        const x1 = this.#puntoInicio.x;
        const y1 = this.#puntoInicio.y;
        const x2 = this.#puntoFin.x;
        const y2 = this.#puntoFin.y;

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.drawPoint(x1, y1);

            if (x1 === x2 && y1 === y2) break;

            const err2 = err * 2;
            if (err2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (err2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }

    drawPoint(x, y) {
        const point = document.createElementNS("http://www.w3.org/2000/svg", "line");
        point.setAttribute("x1", x);
        point.setAttribute("y1", y);
        point.setAttribute("x2", x);
        point.setAttribute("y2", y);
        point.setAttribute("stroke", this.#color);
        point.setAttribute("stroke-width", this.#width);
        svgCanvas.appendChild(point);
    }

    #puntoInicio;
    #puntoFin;
    #color;
    #width;
}

// Clase para dibujar una circunferencia en SVG
class Circunferencia {
    constructor(centro, r, color = "blue", width = 2) {
        this.#centro = centro; // Instancia de Punto para el centro
        this.#r = r;
        this.#color = color;
        this.#width = width;
    }

    draw() {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this.#centro.x);
        circle.setAttribute("cy", this.#centro.y);
        circle.setAttribute("r", this.#r);
        circle.setAttribute("stroke", this.#color);
        circle.setAttribute("stroke-width", this.#width);
        circle.setAttribute("fill", "none");
        svgCanvas.appendChild(circle);
    }

    #centro;
    #r;
    #color;
    #width;
}

// Clase para dibujar una elipse en SVG
class Elipse {
    constructor(centro, rx, ry, color = "green", width = 2) {
        this.#centro = centro; // Instancia de Punto para el centro
        this.#rx = rx; // Radio en el eje X
        this.#ry = ry; // Radio en el eje Y
        this.#color = color;
        this.#width = width;
    }

    draw() {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", this.#centro.x);
        ellipse.setAttribute("cy", this.#centro.y);
        ellipse.setAttribute("rx", this.#rx);
        ellipse.setAttribute("ry", this.#ry);
        ellipse.setAttribute("stroke", this.#color);
        ellipse.setAttribute("stroke-width", this.#width);
        ellipse.setAttribute("fill", "none");
        svgCanvas.appendChild(ellipse);
    }

    #centro;
    #rx;
    #ry;
    #color;
    #width;
}

// Función para exportar el contenido SVG como archivo SVG
function exportarSVG() {
    const svgData = new XMLSerializer().serializeToString(svgCanvas);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgURL = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = svgURL;
    link.download = "primitivas.svg";  // Nombre del archivo
    link.click();
}

// Dibujar las primitivas en SVG
const puntoInicio = new Punto(50, 50);
const puntoFin = new Punto(200, 200);
const linea = new Linea(puntoInicio, puntoFin, "black", 2);
linea.drawBresenham(); // Dibuja la línea usando el algoritmo de Bresenham

const centroCircunferencia = new Punto(300, 100);
const circunferencia = new Circunferencia(centroCircunferencia, 50, "blue", 2);
circunferencia.draw();

const centroElipse = new Punto(400, 300);
const elipse = new Elipse(centroElipse, 80, 50, "green", 2);
elipse.draw();

// Evento para exportar como SVG
document.getElementById('exportBtn').addEventListener('click', exportarSVG);
