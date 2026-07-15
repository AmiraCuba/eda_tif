// ==========================================================================
// INSTANCIACIÓN DE LAS ESTRUCTURAS DE DATOS
// ==========================================================================
const miPila = new Pila(5);
const miCola = new Cola(5);
const miLista = new ListaEnlazada();
const miArbol = new ArbolBinario();


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
// CONTROLADOR VISUAL DE LA LISTA ENLAZADA
// ==========================================================================

const listaInput = document.getElementById("lista-input");
const btnListaInsertar = document.getElementById("btn-lista-insertar");
const btnListaInsertarInicio = document.getElementById(
    "btn-lista-insertar-inicio"
);
const btnListaBuscar = document.getElementById("btn-lista-buscar");
const btnListaEliminar = document.getElementById("btn-lista-eliminar");
const btnListaVaciar = document.getElementById("btn-lista-vaciar");

const listaVisualizador = document.getElementById(
    "lista-visualizador"
);

const listaStatus = document.getElementById("lista-status");
const listaCabeza = document.getElementById("lista-cabeza");
const listaResultado = document.getElementById("lista-resultado");

/**
 * Convierte los números ingresados a Number.
 * El texto se conserva como String.
 */
function obtenerDatoLista() {
    const valor = listaInput.value.trim();
    const numero = Number(valor);

    if (valor !== "" && !isNaN(numero)) {
        return numero;
    }

    return valor;
}

/**
 * Dibuja todos los nodos de la lista.
 */
function renderizarLista() {
    listaVisualizador.innerHTML = "";
    listaResultado.textContent = "";
    listaResultado.className = "lista-resultado";

    if (miLista.isEmpty()) {
        listaVisualizador.innerHTML = `
            <div class="lista-vacia-msg">
                La lista está vacía. ¡Inserta un nodo!
            </div>
        `;

        listaStatus.textContent = "Vacía";
        listaCabeza.textContent = "-";
        return;
    }

    listaStatus.textContent = `Activa (${miLista.size()} nodos)`;
    listaCabeza.textContent = miLista.primero();

    const elementos = miLista.getElements();

    elementos.forEach((valor, indice) => {
        const contenedor = document.createElement("div");
        contenedor.classList.add("lista-nodo-wrapper");

        const nodo = document.createElement("div");
        nodo.classList.add("nodo-lista");
        nodo.setAttribute("data-indice", indice);

        const dato = document.createElement("span");
        dato.classList.add("nodo-lista-valor");
        dato.textContent = valor;

        const enlace = document.createElement("span");
        enlace.classList.add("nodo-lista-enlace");

        if (indice === elementos.length - 1) {
            enlace.textContent = "NULL";
        } else {
            enlace.textContent = "sig.";
        }

        nodo.appendChild(dato);
        nodo.appendChild(enlace);
        contenedor.appendChild(nodo);

        if (indice < elementos.length - 1) {
            const flecha = document.createElement("span");
            flecha.classList.add("lista-flecha");
            flecha.textContent = "→";

            contenedor.appendChild(flecha);
        }

        listaVisualizador.appendChild(contenedor);
    });
}

/**
 * Inserta al final.
 */
btnListaInsertar.addEventListener("click", () => {
    if (listaInput.value.trim() === "") {
        alert("Escribe un valor para insertar.");
        return;
    }

    miLista.insertar(obtenerDatoLista());

    listaInput.value = "";
    listaInput.focus();

    renderizarLista();
});

/**
 * Inserta al inicio.
 */
btnListaInsertarInicio.addEventListener("click", () => {
    if (listaInput.value.trim() === "") {
        alert("Escribe un valor para insertar.");
        return;
    }

    miLista.insertarInicio(obtenerDatoLista());

    listaInput.value = "";
    listaInput.focus();

    renderizarLista();
});

/**
 * Busca un valor.
 */
btnListaBuscar.addEventListener("click", () => {
    if (listaInput.value.trim() === "") {
        alert("Escribe un valor para buscar.");
        return;
    }

    const valor = obtenerDatoLista();
    const encontrado = miLista.buscar(valor);

    document
        .querySelectorAll(".nodo-lista")
        .forEach((nodo) => {
            nodo.classList.remove("nodo-lista-encontrado");
        });

    if (encontrado) {
        const elementos = miLista.getElements();
        const posicion = elementos.indexOf(valor);

        const nodoEncontrado = document.querySelector(
            `.nodo-lista[data-indice="${posicion}"]`
        );

        if (nodoEncontrado !== null) {
            nodoEncontrado.classList.add(
                "nodo-lista-encontrado"
            );
        }

        listaResultado.textContent =
            `Valor "${valor}" encontrado`;

        listaResultado.className =
            "lista-resultado lista-resultado--exito";
    } else {
        listaResultado.textContent =
            `Valor "${valor}" no encontrado`;

        listaResultado.className =
            "lista-resultado lista-resultado--fallo";
    }
});

/**
 * Elimina la primera coincidencia.
 */
btnListaEliminar.addEventListener("click", () => {
    if (miLista.isEmpty()) {
        alert("La lista está vacía.");
        return;
    }

    if (listaInput.value.trim() === "") {
        alert("Escribe un valor para eliminar.");
        return;
    }

    const valor = obtenerDatoLista();
    const eliminado = miLista.eliminar(valor);

    if (!eliminado) {
        alert(`El valor "${valor}" no existe en la lista.`);
        return;
    }

    listaInput.value = "";
    listaInput.focus();

    renderizarLista();
});

/**
 * Vacía la lista.
 */
btnListaVaciar.addEventListener("click", () => {
    if (miLista.isEmpty()) {
        alert("La lista ya está vacía.");
        return;
    }

    const confirmar = confirm(
        "¿Estás seguro de que deseas vaciar toda la lista?"
    );

    if (confirmar) {
        miLista.vaciar();
        renderizarLista();
    }
});

/**
 * Inserta al final al presionar Enter.
 */
listaInput.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        btnListaInsertar.click();
    }
});

// La lista comienza vacía.
renderizarLista();

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
// CONTROLADOR VISUAL DEL ÁRBOL BINARIO
// ==========================================================================

// Captura de elementos del HTML
const arbolInput = document.getElementById('arbol-input');
const btnArbolInsertar = document.getElementById('btn-arbol-insertar');
const btnArbolBuscar = document.getElementById('btn-arbol-buscar');
const btnArbolEliminar = document.getElementById('btn-arbol-eliminar');
const btnArbolVaciar = document.getElementById('btn-arbol-vaciar');
const arbolVisualizador = document.getElementById('arbol-visualizador');
const arbolResultado = document.getElementById('arbol-resultado');
const arbolStatusText = document.getElementById('arbol-status');
const arbolRecorridoText = document.getElementById('arbol-recorrido');
const recorridoBtns = document.querySelectorAll('.recorrido-btn');
let recorridoActual = 'inOrder';

/**
 * Renderiza el árbol completo en el DOM de forma recursiva.
 * También muestra el recorrido seleccionado (inOrder, preOrder o postOrder).
 */
function renderizarArbol() {
    arbolVisualizador.innerHTML = '';

    if (miArbol.isEmpty()) {
        arbolVisualizador.innerHTML = '<div class="arbol-vacia-msg">El árbol está vacío. ¡Inserta un nodo!</div>';
        arbolStatusText.textContent = 'Vacío';
        arbolStatusText.style.color = 'var(--color-danger)';
        arbolRecorridoText.textContent = '-';
        return;
    }

    arbolStatusText.textContent = `${miArbol.size()} nodos`;
    arbolStatusText.style.color = 'var(--color-success)';

    const metodoRecorrido = miArbol[recorridoActual]();
    arbolRecorridoText.textContent = metodoRecorrido.join(' → ');

    const estructura = miArbol.getEstructura();
    arbolVisualizador.appendChild(crearNodoArbol(estructura, 0));
}

/**
 * Crea un nodo visual del árbol de forma recursiva.
 * Genera el div circular, sus hijos izquierdo y derecho, y placeholders si no existen.
 * @param {Object} nodo - Objeto con valor, izquierda y derecha
 * @param {number} nivel - Nivel de profundidad (0 = raíz)
 * @returns {HTMLElement} El elemento DOM del nodo
 */
function crearNodoArbol(nodo, nivel) {
    if (nodo === null) return null;

    const wrapper = document.createElement('div');
    wrapper.classList.add('arbol-nodo-wrapper');

    const divNodo = document.createElement('div');
    divNodo.classList.add('nodo-arbol');
    if (nivel === 0) divNodo.classList.add('nodo-raiz');
    divNodo.textContent = nodo.valor;
    divNodo.setAttribute('data-valor', nodo.valor);

    wrapper.appendChild(divNodo);

    const tieneHijos = nodo.izquierda !== null || nodo.derecha !== null;
    if (tieneHijos) {
        const hijosContainer = document.createElement('div');
        hijosContainer.classList.add('arbol-hijos');

        const izq = document.createElement('div');
        izq.classList.add('arbol-hijo');
        if (nodo.izquierda) {
            const sub = crearNodoArbol(nodo.izquierda, nivel + 1);
            if (sub) izq.appendChild(sub);
        } else {
            izq.appendChild(crearPlaceholder());
        }
        hijosContainer.appendChild(izq);

        const der = document.createElement('div');
        der.classList.add('arbol-hijo');
        if (nodo.derecha) {
            const sub = crearNodoArbol(nodo.derecha, nivel + 1);
            if (sub) der.appendChild(sub);
        } else {
            der.appendChild(crearPlaceholder());
        }
        hijosContainer.appendChild(der);

        wrapper.appendChild(hijosContainer);
    }

    return wrapper;
}

/**
 * Crea un nodo placeholder visual (círculo punteado transparente)
 * para hijos inexistentes en el árbol.
 * @returns {HTMLElement} Elemento DOM del placeholder
 */
function crearPlaceholder() {
    const ph = document.createElement('div');
    ph.classList.add('nodo-placeholder');
    return ph;
}

// --- EVENTOS DEL ÁRBOL ---

/**
 * Botón INSERTAR: Agrega un valor al árbol BST.
 * Acepta números y texto. Evita duplicados.
 */
btnArbolInsertar.addEventListener('click', () => {
    const valor = arbolInput.value.trim();
    if (valor === '') {
        alert('Escribe un valor para insertar.');
        return;
    }

    const num = Number(valor);
    const dato = isNaN(num) ? valor : num;

    const exito = miArbol.insertar(dato);
    if (!exito) {
        alert(`El valor "${dato}" ya existe en el árbol.`);
        return;
    }

    arbolInput.value = '';
    arbolInput.focus();
    renderizarArbol();
});

// Permitir presionar "Enter" en el input para insertar directamente
arbolInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnArbolInsertar.click();
});

/**
 * Botón BUSCAR: Anima el recorrido nodo por nodo por el camino BST.
 * Ilumina cada nodo visitado y muestra un banner con el resultado.
 * Los botones se deshabilitan durante la animación.
 */
btnArbolBuscar.addEventListener('click', () => {
    const valor = arbolInput.value.trim();
    if (valor === '') {
        alert('Escribe un valor para buscar.');
        return;
    }

    const num = Number(valor);
    const dato = isNaN(num) ? valor : num;

    const camino = [];
    let actual = miArbol.raiz;
    while (actual !== null) {
        camino.push(actual.valor);
        if (dato === actual.valor) break;
        actual = dato < actual.valor ? actual.izquierda : actual.derecha;
    }

    if (camino.length === 0) return;

    const nodosEnDOM = document.querySelectorAll('.nodo-arbol');
    nodosEnDOM.forEach(n => {
        n.classList.remove('nodo-buscando', 'nodo-encontrado');
    });

    btnArbolInsertar.disabled = true;
    btnArbolBuscar.disabled = true;
    btnArbolEliminar.disabled = true;
    btnArbolVaciar.disabled = true;

    let i = 0;
    function animarPaso() {
        if (i > 0) {
            const prev = document.querySelector(`.nodo-arbol[data-valor="${camino[i - 1]}"]`);
            if (prev) prev.classList.remove('nodo-buscando');
        }

        if (i < camino.length) {
            const nodo = document.querySelector(`.nodo-arbol[data-valor="${camino[i]}"]`);
            if (nodo) {
                nodo.classList.add('nodo-buscando');
                nodo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            i++;
            setTimeout(animarPaso, 700);
        } else {
            const encontrado = miArbol.buscar(dato);
            const ultimo = camino[camino.length - 1];
            const nodoFinal = document.querySelector(`.nodo-arbol[data-valor="${ultimo}"]`);

            if (encontrado && nodoFinal) {
                nodoFinal.classList.remove('nodo-buscando');
                nodoFinal.classList.add('nodo-encontrado');
                arbolResultado.innerHTML = `<span class="resultado-icono">&#10003;</span> Nodo <strong>"${ultimo}"</strong> encontrado`;
                arbolResultado.className = 'arbol-resultado arbol-resultado--exito';
            } else {
                arbolResultado.innerHTML = `<span class="resultado-icono">&#10007;</span> Nodo <strong>"${dato}"</strong> no encontrado`;
                arbolResultado.className = 'arbol-resultado arbol-resultado--fallo';
            }

            btnArbolInsertar.disabled = false;
            btnArbolBuscar.disabled = false;
            btnArbolEliminar.disabled = false;
            btnArbolVaciar.disabled = false;

            setTimeout(() => {
                nodosEnDOM.forEach(n => {
                    n.classList.remove('nodo-buscando', 'nodo-encontrado');
                });
                arbolResultado.className = 'arbol-resultado';
                arbolResultado.innerHTML = '';
            }, 2500);
        }
    }

    animarPaso();
});

/**
 * Botón ELIMINAR: Elimina un nodo del árbol BST.
 * Maneja los 3 casos: hoja, un hijo y dos hijos (reemplazo por sucesor).
 */
btnArbolEliminar.addEventListener('click', () => {
    if (miArbol.isEmpty()) {
        alert('El árbol está vacío, no hay nada que eliminar.');
        return;
    }

    const valor = arbolInput.value.trim();
    if (valor === '') {
        alert('Escribe un valor para eliminar.');
        return;
    }

    const num = Number(valor);
    const dato = isNaN(num) ? valor : num;

    const exito = miArbol.eliminar(dato);
    if (!exito) {
        alert(`El valor "${dato}" no existe en el árbol.`);
        return;
    }

    arbolInput.value = '';
    arbolInput.focus();
    renderizarArbol();
});

/**
 * Botón VACIAR: Elimina todos los nodos del árbol.
 * Pide confirmación antes de ejecutar.
 */
btnArbolVaciar.addEventListener('click', () => {
    if (miArbol.isEmpty()) {
        alert('El árbol ya está vacío.');
        return;
    }

    if (confirm('¿Estás seguro de que deseas vaciar todo el árbol?')) {
        miArbol.vaciar();
        renderizarArbol();
    }
});

// --- BOTONES DE RECORRIDO (In-Order, Pre-Order, Post-Order) ---
// Cambian el tipo de recorrido mostrado en la barra de información
recorridoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        recorridoBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        recorridoActual = btn.getAttribute('data-recorrido');
        renderizarArbol();
    });
});

renderizarArbol();

// ==========================================================================
// INSTANCIACIÓN DEL HEAP
// ==========================================================================
const miHeap = new MaxHeap();


// ==========================================================================
// CONTROLADOR VISUAL DEL HEAP (MAX-HEAP)
// ==========================================================================

const heapInput = document.getElementById('heap-input');
const btnHeapInsertar = document.getElementById('btn-heap-insertar');
const btnHeapExtraer = document.getElementById('btn-heap-extraer');
const btnHeapPeek = document.getElementById('btn-heap-peek');
const btnHeapClear = document.getElementById('btn-heap-clear');
const heapVisualizador = document.getElementById('heap-visualizador');
const heapStatusText = document.getElementById('heap-status');
const heapPeekVal = document.getElementById('heap-peek-val');

/**
 * Renderiza el heap completo en el DOM como un árbol.
 * Reutiliza la función crearNodoArbol() para dibujar cada nodo.
 */
function renderizarHeap() {
    heapVisualizador.innerHTML = '';

    if (miHeap.isEmpty()) {
        heapVisualizador.innerHTML = '<div class="arbol-vacia-msg">El heap está vacío. ¡Inserta un elemento!</div>';
        heapStatusText.textContent = 'Vacío';
        heapStatusText.style.color = 'var(--color-danger)';
        heapPeekVal.textContent = '-';
        return;
    }

    heapStatusText.textContent = `${miHeap.size()} elementos`;
    heapStatusText.style.color = 'var(--color-success)';
    heapPeekVal.textContent = miHeap.peek();

    const estructura = miHeap.getEstructura();
    const nodoRaiz = crearNodoArbol(estructura, 0);
    if (nodoRaiz) {
        const raizCircle = nodoRaiz.querySelector('.nodo-arbol');
        if (raizCircle) {
            raizCircle.classList.add('nodo-heap-raiz');
        }
    }
    heapVisualizador.appendChild(nodoRaiz);
}

// --- EVENTOS DEL HEAP ---

/**
 * Botón INSERTAR: Agrega un valor al Max-Heap.
 */
btnHeapInsertar.addEventListener('click', () => {
    const valor = heapInput.value.trim();
    if (valor === '') {
        alert('Escribe un valor para insertar.');
        return;
    }

    const num = Number(valor);
    const dato = isNaN(num) ? valor : num;

    miHeap.insertar(dato);

    heapInput.value = '';
    heapInput.focus();
    renderizarHeap();
});

heapInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnHeapInsertar.click();
});

/**
 * Botón EXTRAER MÁX: Elimina y devuelve la raíz del heap.
 */
btnHeapExtraer.addEventListener('click', () => {
    if (miHeap.isEmpty()) {
        alert('El heap está vacío. No hay nada que extraer.');
        return;
    }

    const maximo = miHeap.extraerMaximo();
    alert(`Se extrajo el valor máximo: "${maximo}"`);
    renderizarHeap();
});

/**
 * Botón PEEK: Muestra el valor máximo sin extraerlo.
 */
btnHeapPeek.addEventListener('click', () => {
    if (miHeap.isEmpty()) {
        alert('El heap está vacío.');
        return;
    }

    const maximo = miHeap.peek();
    alert(`El valor máximo actual es: "${maximo}"`);
});

/**
 * Botón VACIAR: Elimina todos los elementos del heap.
 */
btnHeapClear.addEventListener('click', () => {
    if (miHeap.isEmpty()) {
        alert('El heap ya está vacío.');
        return;
    }

    if (confirm('¿Estás seguro de que deseas vaciar todo el heap?')) {
        miHeap.clear();
        renderizarHeap();
    }
});

renderizarHeap();
