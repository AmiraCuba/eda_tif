// ==========================================================================
// INSTANCIACIÓN DE LAS ESTRUCTURAS DE DATOS
// ==========================================================================
// Instanciamos tu clase Pila. Queda de forma global para usarla en todo este script.
// Creamos la pila con un límite máximo de 5 elementos para que luzca perfecta en el CSS
const miPila = new Pila(5);

// Instanciamos la Cola con un límite máximo de 5 elementos
const miCola = new Cola(5);
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
// CONTROLADOR VISUAL DE LA COLA
// ==========================================================================

// Captura de elementos del HTML
const colaInput = document.getElementById('cola-input');
const btnColaEnqueue = document.getElementById('btn-cola-enqueue');
const btnColaDequeue = document.getElementById('btn-cola-dequeue');
const btnColaPeek = document.getElementById('btn-cola-peek');
const btnColaClear = document.getElementById('btn-cola-clear');
const colaVisualizador = document.getElementById('cola-visualizador');
const colaStatusText = document.getElementById('cola-status');
const colaPeekVal = document.getElementById('cola-peek-val');

/**
 * Función que lee los datos actuales de 'miCola' y los dibuja en el HTML
 */
function renderizarCola() {
    colaVisualizador.innerHTML = '';

    if (miCola.isEmpty()) {
        colaVisualizador.innerHTML = '<div class="cola-vacia-msg">La cola está vacía. ¡Agrega un elemento!</div>';
        colaStatusText.textContent = "Vacía";
        colaStatusText.style.color = "var(--color-danger)";
        colaPeekVal.textContent = "-";
        return;
    }

    colaStatusText.textContent = `Activa (${miCola.size()} elementos)`;
    colaStatusText.style.color = "var(--color-success)";
    colaPeekVal.textContent = miCola.peek();

    const elementos = miCola.getElements();

    // Los dibujamos en orden FIFO: el frente (índice 0) a la izquierda, el último a la derecha
    for (let i = 0; i < elementos.length; i++) {
        const divNodo = document.createElement('div');
        divNodo.classList.add('nodo-cola');
        divNodo.textContent = elementos[i];
        colaVisualizador.appendChild(divNodo);
    }
}

// --- EVENTOS (Interacciones del usuario) ---

// Botón ENQUEUE (Insertar al final)
btnColaEnqueue.addEventListener('click', () => {
    const valor = colaInput.value.trim();
    if (valor === '') {
        alert('Por favor, escribe un valor para agregar a la cola.');
        return;
    }

    const exito = miCola.enqueue(valor);

    if (!exito) {
        alert(`¡Error: Queue Overflow! La cola ha alcanzado su límite máximo de ${miCola.getLimite()} elementos.`);
        return;
    }

    colaInput.value = '';
    colaInput.focus();
    renderizarCola();
});

// Permitir presionar la tecla "Enter" dentro del input para hacer Enqueue
colaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnColaEnqueue.click();
    }
});

// Botón DEQUEUE (Atender el frente)
btnColaDequeue.addEventListener('click', () => {
    if (miCola.isEmpty()) {
        alert('La cola está vacía. No hay nadie a quien atender.');
        return;
    }

    const elementoAtendido = miCola.dequeue();
    alert(`Se atendió del frente: "${elementoAtendido}"`);
    renderizarCola();
});

// Botón PEEK (Mirar el frente)
btnColaPeek.addEventListener('click', () => {
    if (miCola.isEmpty()) {
        alert('La cola está vacía.');
        return;
    }

    const frente = miCola.peek();
    alert(`El elemento al frente (Front) actual es: "${frente}"`);
});

// Botón VACIA (Clear)
btnColaClear.addEventListener('click', () => {
    if (miCola.isEmpty()) {
        alert('La cola ya está vacía.');
        return;
    }

    if (confirm('¿Estás seguro de que deseas vaciar toda la cola?')) {
        miCola.clear();
        renderizarCola();
    }
});

// Inicializamos el simulador dibujando la cola (comenzará vacía)
renderizarCola();


// ==========================================================================
// CONTROLADORES DE OTRAS ESTRUCTURAS
// ==========================================================================
// Tus compañeros de Lista, Árbol y Heap escribirán sus respectivos
// bloques de eventos y renderizados aquí abajo.