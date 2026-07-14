/**
 * Clase que representa un nodo individual del árbol binario.
 * Cada nodo almacena un valor y referencias a sus hijos izquierdo y derecho.
 */
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
    }
}

/**
 * Clase que representa un Árbol Binario de Búsqueda (BST).
 * Permite insertar, eliminar y buscar valores de forma ordenada.
 * Los valores menores van a la izquierda y los mayores a la derecha.
 */
class ArbolBinario {
    constructor() {
        this.raiz = null;
        this._size = 0;
    }

    /**
     * Inserta un nuevo valor en el árbol manteniendo el orden BST.
     * @param {*} valor - El dato a insertar
     * @returns {boolean} true si se insertó, false si el valor ya existe
     */
    insertar(valor) {
        const nodo = new Nodo(valor);
        if (this.raiz === null) {
            this.raiz = nodo;
            this._size++;
            return true;
        }
        let actual = this.raiz;
        while (true) {
            if (valor === actual.valor) return false;
            if (valor < actual.valor) {
                if (actual.izquierda === null) {
                    actual.izquierda = nodo;
                    this._size++;
                    return true;
                }
                actual = actual.izquierda;
            } else {
                if (actual.derecha === null) {
                    actual.derecha = nodo;
                    this._size++;
                    return true;
                }
                actual = actual.derecha;
            }
        }
    }

    /**
     * Busca un nodo por su valor (método interno recursivo).
     * @param {*} valor - El dato a buscar
     * @returns {Nodo|null} El nodo encontrado o null si no existe
     */
    _buscar(valor) {
        let actual = this.raiz;
        while (actual !== null) {
            if (valor === actual.valor) return actual;
            actual = valor < actual.valor ? actual.izquierda : actual.derecha;
        }
        return null;
    }

    /**
     * Verifica si un valor existe en el árbol.
     * @param {*} valor - El dato a buscar
     * @returns {boolean} true si existe, false si no
     */
    buscar(valor) {
        return this._buscar(valor) !== null;
    }

    /**
     * Encuentra el nodo con el valor más pequeño dentro de un subárbol.
     * Se utiliza para reemplazar nodos eliminados con dos hijos.
     * @param {Nodo} nodo - Nodo raíz del subárbol a evaluar
     * @returns {Nodo} El nodo con el valor mínimo
     */
    _minimo(nodo) {
        while (nodo.izquierda !== null) nodo = nodo.izquierda;
        return nodo;
    }

    /**
     * Elimina un nodo del árbol de forma recursiva.
     * Maneja tres casos: nodo hoja, un solo hijo y dos hijos.
     * @param {Nodo} nodo - Nodo actual en la recursión
     * @param {*} valor - El dato a eliminar
     * @returns {Nodo|null} El nodo actualizado después de la eliminación
     */
    _eliminar(nodo, valor) {
        if (nodo === null) return null;
        if (valor < nodo.valor) {
            nodo.izquierda = this._eliminar(nodo.izquierda, valor);
        } else if (valor > nodo.valor) {
            nodo.derecha = this._eliminar(nodo.derecha, valor);
        } else {
            if (nodo.izquierda === null && nodo.derecha === null) return null;
            if (nodo.izquierda === null) return nodo.derecha;
            if (nodo.derecha === null) return nodo.izquierda;
            const sucesor = this._minimo(nodo.derecha);
            nodo.valor = sucesor.valor;
            nodo.derecha = this._eliminar(nodo.derecha, sucesor.valor);
        }
        return nodo;
    }

    /**
     * Elimina un valor del árbol si existe.
     * @param {*} valor - El dato a eliminar
     * @returns {boolean} true si se eliminó, false si no se encontró
     */
    eliminar(valor) {
        if (this.buscar(valor)) {
            this.raiz = this._eliminar(this.raiz, valor);
            this._size--;
            return true;
        }
        return false;
    }

    /**
     * Recorrido In-Order: Izquierda → Raíz → Derecha.
     * Devuelve los valores ordenados de menor a mayor.
     * @returns {Array} Array con los valores en orden ascendente
     */
    inOrder() {
        const resultado = [];
        (function recorrer(nodo) {
            if (nodo === null) return;
            recorrer(nodo.izquierda);
            resultado.push(nodo.valor);
            recorrer(nodo.derecha);
        })(this.raiz);
        return resultado;
    }

    /**
     * Recorrido Pre-Order: Raíz → Izquierda → Derecha.
     * Útil para copiar o serializar la estructura del árbol.
     * @returns {Array} Array con los valores en pre-orden
     */
    preOrder() {
        const resultado = [];
        (function recorrer(nodo) {
            if (nodo === null) return;
            resultado.push(nodo.valor);
            recorrer(nodo.izquierda);
            recorrer(nodo.derecha);
        })(this.raiz);
        return resultado;
    }

    /**
     * Recorrido Post-Order: Izquierda → Derecha → Raíz.
     * Útil para eliminar el árbol o evaluar expresiones.
     * @returns {Array} Array con los valores en post-orden
     */
    postOrder() {
        const resultado = [];
        (function recorrer(nodo) {
            if (nodo === null) return;
            recorrer(nodo.izquierda);
            recorrer(nodo.derecha);
            resultado.push(nodo.valor);
        })(this.raiz);
        return resultado;
    }

    /**
     * Elimina todos los nodos del árbol.
     */
    vaciar() {
        this.raiz = null;
        this._size = 0;
    }

    /**
     * Devuelve la cantidad total de nodos del árbol.
     * @returns {number}
     */
    size() {
        return this._size;
    }

    /**
     * Verifica si el árbol está vacío.
     * @returns {boolean}
     */
    isEmpty() {
        return this._size === 0;
    }

    /**
     * Calcula la altura máxima del árbol (profundidad del nivel más bajo).
     * @returns {number} La altura del árbol
     */
    altura() {
        const calc = (nodo) => {
            if (nodo === null) return 0;
            return 1 + Math.max(calc(nodo.izquierda), calc(nodo.derecha));
        };
        return calc(this.raiz);
    }

    /**
     * Convierte el árbol en un objeto plano para el renderizado visual.
     * @returns {Object|null} Estructura con valor, izquierda y derecha
     */
    getEstructura() {
        if (this.raiz === null) return null;
        const construir = (nodo) => {
            if (nodo === null) return null;
            return {
                valor: nodo.valor,
                izquierda: construir(nodo.izquierda),
                derecha: construir(nodo.derecha)
            };
        };
        return construir(this.raiz);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ArbolBinario, Nodo };
}
