/**
 * Clase que representa un Montículo Máximo (Max-Heap).
 * El elemento de mayor valor siempre se encuentra en la raíz.
 * Implementado con un arreglo donde:
 * - Padre de i: Math.floor((i - 1) / 2)
 * - Hijo izquierdo de i: 2i + 1
 * - Hijo derecho de i: 2i + 2
 */
class MaxHeap {
    constructor() {
        this.items = [];
    }

    /**
     * Devuelve el índice del padre de un nodo.
     * @param {number} i - Índice del nodo
     * @returns {number} Índice del padre
     */
    _padre(i) {
        return Math.floor((i - 1) / 2);
    }

    /**
     * Devuelve el índice del hijo izquierdo de un nodo.
     * @param {number} i - Índice del nodo
     * @returns {number} Índice del hijo izquierdo
     */
    _hijoIzq(i) {
        return 2 * i + 1;
    }

    /**
     * Devuelve el índice del hijo derecho de un nodo.
     * @param {number} i - Índice del nodo
     * @returns {number} Índice del hijo derecho
     */
    _hijoDer(i) {
        return 2 * i + 2;
    }

    /**
     * Restaura la propiedad de Max-Heap hacia arriba (bubble-up).
     * Intercambia el nodo con su padre mientras sea mayor.
     * @param {number} i - Índice del nodo a elevar
     */
    _bubbleUp(i) {
        while (i > 0 && this.items[i] > this.items[this._padre(i)]) {
            const temp = this.items[i];
            this.items[i] = this.items[this._padre(i)];
            this.items[this._padre(i)] = temp;
            i = this._padre(i);
        }
    }

    /**
     * Restaura la propiedad de Max-Heap hacia abajo (bubble-down).
     * Intercambia el nodo con el mayor de sus hijos mientras sea menor.
     * @param {number} i - Índice del nodo a descender
     */
    _bubbleDown(i) {
        const n = this.items.length;
        while (true) {
            let mayor = i;
            const izq = this._hijoIzq(i);
            const der = this._hijoDer(i);

            if (izq < n && this.items[izq] > this.items[mayor]) {
                mayor = izq;
            }
            if (der < n && this.items[der] > this.items[mayor]) {
                mayor = der;
            }

            if (mayor === i) break;

            const temp = this.items[i];
            this.items[i] = this.items[mayor];
            this.items[mayor] = temp;
            i = mayor;
        }
    }

    /**
     * Inserta un nuevo valor en el heap manteniendo la propiedad de Max-Heap.
     * @param {*} valor - El dato a insertar
     * @returns {boolean} true (siempre se inserta exitosamente)
     */
    insertar(valor) {
        this.items.push(valor);
        this._bubbleUp(this.items.length - 1);
        return true;
    }

    /**
     * Extrae y devuelve el valor máximo (la raíz) del heap.
     * @returns {*} El valor máximo, o null si el heap está vacío
     */
    extraerMaximo() {
        if (this.isEmpty()) return null;

        const maximo = this.items[0];
        const ultimo = this.items.pop();

        if (this.items.length > 0) {
            this.items[0] = ultimo;
            this._bubbleDown(0);
        }

        return maximo;
    }

    /**
     * Devuelve el valor máximo sin extraerlo.
     * @returns {*} El valor de la raíz, o null si está vacío
     */
    peek() {
        return this.isEmpty() ? null : this.items[0];
    }

    /**
     * Verifica si el heap está vacío.
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Devuelve la cantidad de elementos en el heap.
     * @returns {number}
     */
    size() {
        return this.items.length;
    }

    /**
     * Elimina todos los elementos del heap.
     */
    clear() {
        this.items = [];
    }

    /**
     * Devuelve una copia del arreglo interno de elementos.
     * @returns {Array}
     */
    getElements() {
        return [...this.items];
    }

    /**
     * Convierte el heap en una estructura de árbol para el renderizado visual.
     * Construye recursivamente usando los índices del arreglo.
     * @returns {Object|null} Estructura con valor, izquierda y derecha
     */
    getEstructura() {
        if (this.isEmpty()) return null;

        const construir = (i) => {
            if (i >= this.items.length) return null;
            return {
                valor: this.items[i],
                izquierda: construir(this._hijoIzq(i)),
                derecha: construir(this._hijoDer(i))
            };
        };

        return construir(0);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MaxHeap;
}
