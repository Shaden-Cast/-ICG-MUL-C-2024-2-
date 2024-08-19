document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    document.getElementById("drawButton").addEventListener("click", () => {
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Obtener los valores del formulario
        const shape = document.getElementById("shape").value;
        const x = parseFloat(document.getElementById("x").value);
        const y = parseFloat(document.getElementById("y").value);
        const size = parseFloat(document.getElementById("size").value);
        const fillColor = document.getElementById("color").value;
        const borderColor = document.getElementById("borderColor").value;

        // Verificar si las coordenadas y tamaño son válidos
        if (isNaN(x) || isNaN(y) || isNaN(size)) {
            alert("Por favor, ingrese valores válidos para las coordenadas y el tamaño.");
            return;
        }

        // Establecer colores
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;

        // Dibujar la figura según la selección
        switch (shape) {
            case "circle":
                ctx.beginPath();
                ctx.arc(x, y, size, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                break;

            case "star":
                const points = 5; // Número de puntos de la estrella
                const outerRadius = size;
                const innerRadius = size / 2;
                const angle = (2 * Math.PI) / points;

                ctx.beginPath();
                for (let i = 0; i < points * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const currentAngle = angle * i;
                    const px = x + radius * Math.cos(currentAngle);
                    const py = y - radius * Math.sin(currentAngle);
                    if (i === 0) {
                        ctx.moveTo(px, py);
                    } else {
                        ctx.lineTo(px, py);
                    }
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;

            case "square":
                ctx.beginPath();
                ctx.rect(x - size / 2, y - size / 2, size, size);
                ctx.fill();
                ctx.stroke();
                break;

            case "triangle":
                ctx.beginPath();
                ctx.moveTo(x, y - size);
                ctx.lineTo(x - size, y + size);
                ctx.lineTo(x + size, y + size);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;

            case "diamond":
                ctx.beginPath();
                ctx.moveTo(x, y - size);
                ctx.lineTo(x + size, y);
                ctx.lineTo(x, y + size);
                ctx.lineTo(x - size, y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;

            case "hexagon":
                const hexPoints = 6; // Número de lados del hexágono
                const hexAngle = (2 * Math.PI) / hexPoints;

                ctx.beginPath();
                for (let i = 0; i < hexPoints; i++) {
                    const currentAngle = hexAngle * i;
                    const px = x + size * Math.cos(currentAngle);
                    const py = y + size * Math.sin(currentAngle);
                    if (i === 0) {
                        ctx.moveTo(px, py);
                    } else {
                        ctx.lineTo(px, py);
                    }
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;
        }
    });
});
