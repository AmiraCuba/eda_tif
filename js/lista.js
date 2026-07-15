/**
 * Nodo de una lista simplemente enlazada.
 */
class NodoLista {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

/**
 * Lista simplemente enlazada.
 */
class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this._size = 0;
    }

    /**
     * Inserta un valor al final.
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
     * Inserta un valor al inicio.
     */
    insertarInicio(valor) {
        const nuevoNodo = new NodoLista(valor);

        nuevoNodo.siguiente = this.cabeza;
        this.cabeza = nuevoNodo;
        this._size++;

        return true;
    }

    /**
     * Busca un valor.
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
     * Elimina la primera coincidencia.
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
     * Devuelve el valor de la cabeza.
     */
    primero() {
        if (this.isEmpty()) {
            return null;
        }

        return this.cabeza.valor;
    }

    isEmpty() {
        return this.cabeza === null;
    }

    size() {
        return this._size;
    }

    vaciar() {
        this.cabeza = null;
        this._size = 0;
    }

    /**
     * Devuelve los valores como un arreglo.
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
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { ListaEnlazada, NodoLista };
}