// Clase para coordenadas cartesianas
class CoordenadaCartesiana {
    // Constructor para inicializar coordenadas privadas
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Método para obtener el valor de x
    getX() {
        return this.#x;
    }

    // Método para establecer el valor de x
    setX(x) {
        this.#x = x;
    }

    // Método para obtener el valor de y
    getY() {
        return this.#y;
    }

    // Método para establecer el valor de y
    setY(y) {
        this.#y = y;
    }

    // Método para convertir coordenadas cartesianas a polares
    toPolar() {
        const radio = Math.sqrt(this.#x * this.#x + this.#y * this.#y);
        const angulo = Math.atan2(this.#y, this.#x);
        return new CoordenadaPolar(radio, angulo);
    }
}

// Clase para coordenadas polares
class CoordenadaPolar {
    // Constructor para inicializar radio y ángulo privados
    #radio;
    #angulo;

    constructor(radio, angulo) {
        this.#radio = radio;
        this.#angulo = angulo;
    }

    // Método para obtener el valor del radio
    getRadio() {
        return this.#radio;
    }

    // Método para establecer el valor del radio
    setRadio(radio) {
        this.#radio = radio;
    }

    // Método para obtener el valor del ángulo
    getAngulo() {
        return this.#angulo;
    }

    // Método para establecer el valor del ángulo
    setAngulo(angulo) {
        this.#angulo = angulo;
    }

    // Método para convertir coordenadas polares a cartesianas
    toCartesian() {
        const x = this.#radio * Math.cos(this.#angulo);
        const y = this.#radio * Math.sin(this.#angulo);
        return new CoordenadaCartesiana(x, y);
    }
}
