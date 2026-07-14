// ==========================================================================
// INSTANCIACIÓN DE LAS ESTRUCTURAS DE DATOS
// ==========================================================================
// Instanciamos tu clase Pila. Queda de forma global para usarla en todo este script.
// Creamos la pila con un límite máximo de 5 elementos para que luzca perfecta en el CSS
const miPila = new Pila(5);

// Aquí tus compañeros instanciarán sus clases cuando las tengan listas, por ejemplo:
// const miCola = new Cola();
// const miLista = new Lista();


// ==========================================================================
// SISTEMA DE PESTAÑAS (Navegación del simulador)
// ==========================================================================
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.sim-section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Desactivar todos los botones y secciones
        navButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(sec => sec.classList.remove('active'));

        // Activar el botón donde se hizo clic
        button.classList.add('active');

        // Mostrar la sección correspondiente
        const targetSectionId = `sec-${button.getAttribute('data-target')}`;
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});


// ==========================================================================
// CONTROLADOR VISUAL DE LA PILA
// ==========================================================================

// Captura de elementos del HTML
const pilaInput = document.getElementById('pila-input');
const btnPilaPush = document.getElementById('btn-pila-push');
const btnPilaPop = document.getElementById('btn-pila-pop');
const btnPilaPeek = document.getElementById('btn-pila-peek');
const btnPilaClear = document.getElementById('btn-pila-clear');
const pilaVisualizador = document.getElementById('pila-visualizador');
const pilaStatusText = document.getElementById('pila-status');
const pilaPeekVal = document.getElementById('pila-peek-val');

/**
 * Función que lee los datos actuales de 'miPila' y los dibuja en el HTML
 */
function renderizarPila() {
    // 1. Limpiamos el visualizador para redibujar de cero
    pilaVisualizador.innerHTML = '';

    // 2. Si la pila está vacía, mostramos el mensaje por defecto y actualizamos textos
    if (miPila.isEmpty()) {
        pilaVisualizador.innerHTML = '<div class="pila-vacia-msg">La pila está vacía. ¡Agrega un elemento!</div>';
        pilaStatusText.textContent = "Vacía";
        pilaStatusText.style.color = "var(--color-danger)";
        pilaPeekVal.textContent = "-";
        return;
    }

    // 3. Si tiene elementos, actualizamos la barra de estado
    pilaStatusText.textContent = `Activa (${miPila.size()} elementos)`;
    pilaStatusText.style.color = "var(--color-success)";
    pilaPeekVal.textContent = miPila.peek();

    // 4. Obtenemos la lista de elementos
    const elementos = miPila.getElements();

    // 5. Los dibujamos en orden INVERSO (LIFO)
    // El último elemento agregado (cima) debe quedar arriba del contenedor visual.
    for (let i = elementos.length - 1; i >= 0; i--) {
        const divNodo = document.createElement('div');
        divNodo.classList.add('nodo-pila');
        divNodo.textContent = elementos[i];
        pilaVisualizador.appendChild(divNodo);
    }
}

// --- EVENTOS (Interacciones del usuario) ---

// Botón PUSH (Insertar)
btnPilaPush.addEventListener('click', () => {
    const valor = pilaInput.value.trim();
    if (valor === '') {
        alert('Por favor, escribe un valor para agregar a la pila.');
        return;
    }

    // Intentamos hacer push. Tu método ahora devuelve true o false.
    const exito = miPila.push(valor);     

    if (!exito) {
        // ¡Aquí ocurre el Stack Overflow controlado!
        alert(`¡Error: Stack Overflow! La pila ha alcanzado su límite máximo de ${miPila.getLimite()} elementos.`);
        return;
    }

    pilaInput.value = '';   // Limpia el campo de texto
    pilaInput.focus();      // Devuelve el cursor al input
    renderizarPila();       // Actualiza la pantalla
});

// Permitir presionar la tecla "Enter" dentro del input para hacer Push
pilaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnPilaPush.click();
    }
});

// Botón POP (Eliminar / Sacar)
btnPilaPop.addEventListener('click', () => {
    if (miPila.isEmpty()) {
        alert('La pila está vacía. No hay nada que sacar.');
        return;
    }

    const elementoSacado = miPila.pop(); // Ejecuta la lógica en tu pila.js
    alert(`Se retiró de la cima: "${elementoSacado}"`);
    renderizarPila(); // Actualiza la pantalla
});

// Botón PEEK (Mirar la cima)
btnPilaPeek.addEventListener('click', () => {
    if (miPila.isEmpty()) {
        alert('La pila está vacía.');
        return;
    }

    const cima = miPila.peek(); // Ejecuta la lógica en tu pila.js
    alert(`El elemento en la cima (Top) actual es: "${cima}"`);
});

// Botón VACIA (Clear)
btnPilaClear.addEventListener('click', () => {
    if (miPila.isEmpty()) {
        alert('La pila ya está vacía.');
        return;
    }

    if (confirm('¿Estás seguro de que deseas vaciar toda la pila?')) {
        miPila.clear();   // Ejecuta la lógica en tu pila.js
        renderizarPila(); // Actualiza la pantalla
    }
});

// Inicializamos el simulador dibujando la pila (comenzará vacía)
renderizarPila();


// ==========================================================================
// CONTROLADORES DE OTRAS ESTRUCTURAS
// ==========================================================================
// Tus compañeros de Cola, Lista, Árbol y Heap escribirán sus respectivos
// bloques de eventos y renderizados aquí abajo.