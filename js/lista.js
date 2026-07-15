/**
 * Clase que representa un nodo de una lista simplemente enlazada.
 * Cada nodo almacena un valor y una referencia al nodo siguiente.
 */
class NodoLista {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

/**
 * Clase que representa una Lista Simplemente Enlazada.
 * Los nodos se conectan en un solo sentido desde la cabeza.
 */
class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this._size = 0;
    }

    /**
     * Inserta un nuevo valor al final de la lista.
     * @param {*} valor - El dato que se almacenará
     * @returns {boolean} true cuando se inserta correctamente
     */
    insertar(valor) {
        const nuevoNodo = new NodoLista(valor);

        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
            this._size++;
            return true;
        }

        let actual = this.cabeza;

        while (actual.siguiente !== null) {
            actual = actual.siguiente;
        }

        actual.siguiente = nuevoNodo;
        this._size++;
        return true;
    }

    /**
     * Inserta un nuevo valor al inicio de la lista.
     * @param {*} valor - El dato que se almacenará
     * @returns {boolean} true cuando se inserta correctamente
     */
    insertarInicio(valor) {
        const nuevoNodo = new NodoLista(valor);

        nuevoNodo.siguiente = this.cabeza;
        this.cabeza = nuevoNodo;
        this._size++;

        return true;
    }

    /**
     * Verifica si un valor existe dentro de la lista.
     * @param {*} valor - El dato que se desea buscar
     * @returns {boolean} true si existe, false si no se encuentra
     */
    buscar(valor) {
        let actual = this.cabeza;

        while (actual !== null) {
            if (actual.valor === valor) {
                return true;
            }

            actual = actual.siguiente;
        }

        return false;
    }

    /**
     * Elimina la primera aparición de un valor.
     * @param {*} valor - El dato que se desea eliminar
     * @returns {boolean} true si se eliminó, false si no existe
     */
    eliminar(valor) {
        if (this.cabeza === null) {
            return false;
        }

        if (this.cabeza.valor === valor) {
            this.cabeza = this.cabeza.siguiente;
            this._size--;
            return true;
        }

        let anterior = this.cabeza;
        let actual = this.cabeza.siguiente;

        while (actual !== null) {
            if (actual.valor === valor) {
                anterior.siguiente = actual.siguiente;
                this._size--;
                return true;
            }

            anterior = actual;
            actual = actual.siguiente;
        }

        return false;
    }

    /**
     * Devuelve el valor almacenado en la cabeza sin eliminarlo.
     * @returns {*} El primer valor o null si la lista está vacía
     */
    primero() {
        if (this.isEmpty()) {
            return null;
        }

        return this.cabeza.valor;
    }

    /**
     * Verifica si la lista está vacía.
     * @returns {boolean}
     */
    isEmpty() {
        return this.cabeza === null;
    }

    /**
     * Devuelve la cantidad de nodos de la lista.
     * @returns {number}
     */
    size() {
        return this._size;
    }

    /**
     * Elimina todos los nodos de la lista.
     */
    vaciar() {
        this.cabeza = null;
        this._size = 0;
    }

    /**
     * Devuelve los valores de la lista en un arreglo.
     * @returns {Array}
     */
    getElements() {
        const elementos = [];
        let actual = this.cabeza;

        while (actual !== null) {
            elementos.push(actual.valor);
            actual = actual.siguiente;
        }

        return elementos;
    }

    /**
     * Convierte la lista en una estructura sencilla para renderizarla.
     * @returns {Object|null}
     */
    getEstructura() {
        if (this.cabeza === null) {
            return null;
        }

        const construir = (nodo) => {
            if (nodo === null) {
                return null;
            }

            return {
                valor: nodo.valor,
                siguiente: construir(nodo.siguiente)
            };
        };

        return construir(this.cabeza);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { ListaEnlazada, NodoLista };
}