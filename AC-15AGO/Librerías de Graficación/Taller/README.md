La parte de HTML, inicialmente se describe y se define el tipo de docmento

el cual es html, por la parte de "head" se encuentran el titulo del codigo y los estilos,

en la parte de "body" se encuentra el contenido del codigo como tal lo que el usurio podra

ver en la pagina, como se puede encontrar el estilo de fuente color, borde, color de bondo,

y de texto, tambien se añade "form-container" que centra lo visible al usurio para que este mas

organizado. El "canvas-container" es el que define el contenedor para el canvas con su borde y

fondo respectivamente, por su parte en el canvas es el que permite colocar el lienzo. Y en el cuerpo

se encuentra el encabezado centrado, en la siguente parte (<div class="form-container">) es el contenedor

desplegable donde se encuentra las diferentes seleciones de las figuras a dibujar, de la misma manera en

(<input type="number">) estan los campos de texto para las coordenadas y tamño de la figura, y tambien en

<input type="color"> se encuentra el esoacio para seleccionar el color tanto de relleno como de borde y por

ultimo en el contenido se encuentra el boton para activar y dibujar. Por ultimo se encuentra el vinvulo para

el codigo de java que permitira la funcionalidad de la pagina.

La parte de javaScript se utiliza en mayor medida para el boton de activacion y la obtencion de  los valores

necesarios para el dibujo como lo son los valores de la figura, las coordenadas x y y, el tamaño selecionado

el color de la figura tabto de borde como de relleno, se hace tambien una verificacion de lo datos de las

coordenadas y el tamaño, tambien se dfinen los colores de rellleno selecionado como el de borde, para la selecion

de cada tipo de figura se utliza el switch donde se gestiona el tipo de figura dependiendo cada caso que sera cada

figura pasanod los datos obtenidos de la seleccion del usuario, para asi dibujara la figura.
