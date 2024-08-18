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

        // Establecer colores
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;



   });
});