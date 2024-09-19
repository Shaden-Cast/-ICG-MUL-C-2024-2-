// Crear el espacio de SVG
const svgCanvas = document.getElementById('svgCanvas');

// Clase para dibujar una línea en SVG
class Linea {
    constructor(x1, y1, x2, y2, color = "black", width = 2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.width = width;
    }

    draw() {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", this.x1);
        line.setAttribute("y1", this.y1);
        line.setAttribute("x2", this.x2);
        line.setAttribute("y2", this.y2);
        line.setAttribute("stroke", this.color);
        line.setAttribute("stroke-width", this.width);
        svgCanvas.appendChild(line);
    }
}

// Clase para dibujar una circunferencia en SVG
class Circunferencia {
    constructor(cx, cy, r, color = "blue", width = 2) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.color = color;
        this.width = width;
    }

    draw() {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this.cx);
        circle.setAttribute("cy", this.cy);
        circle.setAttribute("r", this.r);
        circle.setAttribute("stroke", this.color);
        circle.setAttribute("stroke-width", this.width);
        circle.setAttribute("fill", "none");
        svgCanvas.appendChild(circle);
    }
}

// Clase para dibujar una elipse en SVG
class Elipse {
    constructor(cx, cy, rx, ry, color = "green", width = 2) {
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
        this.color = color;
        this.width = width;
    }

    draw() {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", this.cx);
        ellipse.setAttribute("cy", this.cy);
        ellipse.setAttribute("rx", this.rx);
        ellipse.setAttribute("ry", this.ry);
        ellipse.setAttribute("stroke", this.color);
        ellipse.setAttribute("stroke-width", this.width);
        ellipse.setAttribute("fill", "none");
        svgCanvas.appendChild(ellipse);
    }
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
const linea = new Linea(50, 50, 200, 200, "black", 2);
linea.draw();

const circunferencia = new Circunferencia(300, 100, 50, "blue", 2);
circunferencia.draw();

const elipse = new Elipse(400, 300, 80, 50, "green", 2);
elipse.draw();

// Evento para exportar como SVG
document.getElementById('exportBtn').addEventListener('click', exportarSVG);
