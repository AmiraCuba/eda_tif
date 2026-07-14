/**
 * Clase que representa una estructura de datos de tipo Pila (Stack) acotada.
 * Funciona bajo el principio LIFO con un límite de capacidad.
 */
class Pila {
    constructor(limite = 5) { // Por defecto, el límite será de 5 elementos
        this.items = [];
        this.limite = limite;
    }

    /**
     * Inserta un elemento en la cima de la pila si hay espacio (Push)
     * @param {*} elemento - El dato a almacenar
     * @returns {boolean} true si se insertó con éxito, false si hubo desbordamiento (Stack Overflow)
     */
    push(elemento) {
        if (this.isFull()) {
            return false; // Evita el Push porque la pila está llena
        }
        this.items.push(elemento);
        return true;
    }

    /**
     * Retira y devuelve el elemento en la cima de la pila (Pop)
     * @returns {*} El elemento eliminado, o null si la pila está vacía
     */
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }

    /**
     * Devuelve el elemento en la cima sin retirarlo (Peek)
     * @returns {*} El elemento en la cima, o null si está vacía
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Verifica si la pila está vacía
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Verifica si la pila alcanzó su capacidad máxima
     * @returns {boolean}
     */
    isFull() {
        return this.items.length >= this.limite;
    }

    /**
     * Devuelve la cantidad de elementos en la pila
     */
    size() {
        return this.items.length;
    }

    /**
     * Devuelve el límite de capacidad de la pila
     */
    getLimite() {
        return this.limite;
    }

    /**
     * Vacía por completo la pila
     */
    clear() {
        this.items = [];
    }

    /**
     * Devuelve una copia de los elementos actuales
     */
    getElements() {
        return [...this.items];
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Pila;
}