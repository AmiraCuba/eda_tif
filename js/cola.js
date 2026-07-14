/**
 * Clase que representa una estructura de datos de tipo Cola (Queue) acotada.
 * Funciona bajo el principio FIFO con un límite de capacidad.
 */
class Cola {
    constructor(limite = 5) {
        this.items = [];
        this.limite = limite;
    }

    /**
     * Inserta un elemento al final de la cola si hay espacio (Enqueue)
     * @param {*} elemento - El dato a almacenar
     * @returns {boolean} true si se insertó con éxito, false si hubo desbordamiento (Queue Overflow)
     */
    enqueue(elemento) {
        if (this.isFull()) {
            return false;
        }
        this.items.push(elemento);
        return true;
    }

    /**
     * Retira y devuelve el elemento al frente de la cola (Dequeue)
     * @returns {*} El elemento eliminado, o null si la cola está vacía
     */
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    /**
     * Devuelve el elemento al frente sin retirarlo (Peek / Front)
     * @returns {*} El elemento al frente, o null si está vacía
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    /**
     * Verifica si la cola está vacía
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Verifica si la cola alcanzó su capacidad máxima
     * @returns {boolean}
     */
    isFull() {
        return this.items.length >= this.limite;
    }

    /**
     * Devuelve la cantidad de elementos en la cola
     * @returns {number}
     */
    size() {
        return this.items.length;
    }

    /**
     * Devuelve el límite de capacidad de la cola
     * @returns {number}
     */
    getLimite() {
        return this.limite;
    }

    /**
     * Vacía por completo la cola
     */
    clear() {
        this.items = [];
    }

    /**
     * Devuelve una copia de los elementos actuales (orden FIFO)
     * @returns {Array}
     */
    getElements() {
        return [...this.items];
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cola;
}
