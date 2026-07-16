/**
 * MONTÍCULO BINARIO (HEAP)
 *
 * Implementación de un Heap mediante un arreglo.
 * Puede funcionar como:
 *  • Max-Heap: el mayor elemento se encuentra en la raíz.
 *  • Min-Heap: el menor elemento se encuentra en la raíz.
 *
 * Relaciones entre nodos:
 *  Padre(i)           = Math.floor((i - 1) / 2)
 *  Hijo izquierdo(i)  = 2 * i + 1
 *  Hijo derecho(i)    = 2 * i + 2
 */

class Heap {

    /**
     * Crea un nuevo Heap.
     * @param {"max"|"min"} tipo Tipo de montículo.
     */
    constructor(tipo = "max") {
        this.items = [];
        this.tipo = tipo;
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
     * Determina si dos nodos deben intercambiarse
     * según el tipo de Heap.
     */
    _debeIntercambiar(hijo, padre) {

        if (this.tipo === "max") {
            return this.items[hijo] > this.items[padre];
        }

        return this.items[hijo] < this.items[padre];
    }

    /**
     * Restaura la propiedad del Heap hacia arriba (Bubble Up).
     * El nodo se intercambia con su padre mientras no cumpla
     * la propiedad del tipo de heap (Max o Min).
     *
     * @param {number} i Índice del nodo.
     */
    _bubbleUp(i) {

        while (
            i > 0 &&
            this._debeIntercambiar(i, this._padre(i))
        ) {

            const temp = this.items[i];
            this.items[i] = this.items[this._padre(i)];
            this.items[this._padre(i)] = temp;

            i = this._padre(i);
        }
    }

    /**
     * Restaura la propiedad del Heap hacia abajo (Bubble Down).
     * Intercambia el nodo con el hijo que corresponda
     * según el tipo de heap.
     *
     * @param {number} i Índice del nodo.
     */
    _bubbleDown(i) {

        const n = this.items.length;

        while (true) {

            let objetivo = i;

            const izq = this._hijoIzq(i);
            const der = this._hijoDer(i);

            if (
                izq < n &&
                this._debeIntercambiar(izq, objetivo)
            ) {
                objetivo = izq;
            }

            if (
                der < n &&
                this._debeIntercambiar(der, objetivo)
            ) {
                objetivo = der;
            }

            if (objetivo === i) break;

            const temp = this.items[i];
            this.items[i] = this.items[objetivo];
            this.items[objetivo] = temp;

            i = objetivo;
        }
    }

    /**
     * Inserta un nuevo valor en el Heap manteniendo
     * la propiedad del tipo actual (Max o Min).
     *
     * @param {number} valor
     * @returns {boolean}
     */

    insertar(valor) {
        this.items.push(valor);
        this._bubbleUp(this.items.length - 1);
        return true;
    }
    
    /**
     * Extrae y devuelve el elemento de la raíz del Heap.
     * En un Max-Heap devuelve el máximo.
     * En un Min-Heap devuelve el mínimo.
     *
     * @returns {*} Elemento extraído o null si el heap está vacío.
     */
    extraer() {

        if (this.isEmpty()) return null;

        const raiz = this.items[0];
        const ultimo = this.items.pop();

        if (this.items.length > 0) {
            this.items[0] = ultimo;
            this._bubbleDown(0);
        }

        return raiz;
    }

    /**
     * Devuelve el elemento de la raíz sin extraerlo.
     * @returns {*} Valor de la raíz o null si el heap está vacío.
     */
    peek() {
        return this.isEmpty() ? null : this.items[0];
    }

    /**
     * Devuelve el tipo actual del Heap.
     * @returns {"max"|"min"}
     */
    getTipo() {
        return this.tipo;
    }

    /**
     * Cambia el tipo del Heap y reconstruye su estructura.
     *
     * @param {"max"|"min"} tipo
     */
    
    cambiarTipo(tipo) {

        if (tipo !== "max" && tipo !== "min") return;

        if (this.tipo === tipo) return;

        this.tipo = tipo;

        const elementos = [...this.items];

        this.clear();

        elementos.forEach(valor => this.insertar(valor));
    }


    /**
     * Verifica si el Heap está vacío.
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Devuelve la cantidad de elementos almacenados.
     * @returns {number}
     */
    size() {
        return this.items.length;
    }

    /**
     * Elimina todos los elementos del Heap.
     */
    clear() {
        this.items = [];
    }

    /**
     * Devuelve una copia del arreglo interno.
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

    getNombre() {

        return this.tipo === "max"
            ? "Max-Heap"
            : "Min-Heap";

    }

    esMaxHeap(){
        return this.tipo === "max";
    }

    esMinHeap(){
        return this.tipo === "min";
    }


    }

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Heap;
}
