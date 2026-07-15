import { useCallback, useState } from "react";

function buildSearchTree(values) {
  let root = null;
  values.forEach((value) => {
    const node = { value, left: null, right: null };
    if (!root) {
      root = node;
      return;
    }
    let current = root;
    while (current) {
      const direction = value < current.value ? "left" : "right";
      if (!current[direction]) {
        current[direction] = node;
        break;
      }
      current = current[direction];
    }
  });
  return root;
}

function deleteTreeNode(node, value) {
  if (!node) return null;
  if (value < node.value) {
    node.left = deleteTreeNode(node.left, value);
    return node;
  }
  if (value > node.value) {
    node.right = deleteTreeNode(node.right, value);
    return node;
  }
  if (!node.left) return node.right;
  if (!node.right) return node.left;

  let successor = node.right;
  while (successor.left) successor = successor.left;
  node.value = successor.value;
  node.right = deleteTreeNode(node.right, successor.value);
  return node;
}

function treeToInsertionOrder(node, result = []) {
  if (!node) return result;
  result.push(node.value);
  treeToInsertionOrder(node.left, result);
  treeToInsertionOrder(node.right, result);
  return result;
}

export function useStructureSimulator(structure) {
  const [values, setValues] = useState(() => [...structure.initialValues]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState({ type: "idle", text: "" });
  const [history, setHistory] = useState([]);
  const [lastOperation, setLastOperation] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const startAnimation = useCallback(() => setIsAnimating(true), []);
  const completeAnimation = useCallback(() => setIsAnimating(false), []);

  const registerAction = (text) => {
    setHistory((current) => [
      { id: Date.now(), text },
      ...current,
    ].slice(0, 4));
  };

  const parseValue = () => {
    if (inputValue.trim() === "") return null;
    const parsed = Number(inputValue);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const insert = () => {
    const value = parseValue();
    if (value === null) {
      setMessage({ type: "error", text: "Ingresa un número válido." });
      return;
    }
    if (structure.uniqueValues && values.includes(value)) {
      setMessage({ type: "error", text: "Esta visualización no admite valores repetidos." });
      return;
    }
    if (structure.maxItems && values.length >= structure.maxItems) {
      setMessage({ type: "error", text: `La demostración admite hasta ${structure.maxItems} elementos.` });
      return;
    }

    setValues((current) => [...current, value]);
    setInputValue("");
    setMessage({ type: "success", text: `${value} fue insertado correctamente.` });
    registerAction(`${structure.insertAction}: ${value}`);
    setLastOperation({ id: Date.now(), type: "insert", value });
  };

  const remove = () => {
    if (values.length === 0) {
      setMessage({ type: "error", text: "La estructura está vacía." });
      return;
    }

    let removedValue;
    let nextValues;

    if (structure.id === "stack") {
      removedValue = values.at(-1);
      nextValues = values.slice(0, -1);
    } else if (structure.id === "queue") {
      removedValue = values[0];
      nextValues = values.slice(1);
    } else {
      const requestedValue = parseValue();
      if (requestedValue === null) {
        setMessage({ type: "error", text: "Indica qué valor deseas eliminar." });
        return;
      }
      if (!values.includes(requestedValue)) {
        setMessage({ type: "error", text: `${requestedValue} no se encuentra.` });
        return;
      }
      removedValue = requestedValue;
      if (structure.id === "tree") {
        nextValues = treeToInsertionOrder(
          deleteTreeNode(buildSearchTree(values), requestedValue),
        );
      } else {
        const position = values.indexOf(requestedValue);
        nextValues = values.filter((_, index) => index !== position);
      }
    }

    setValues(nextValues);
    setInputValue("");
    setMessage({ type: "success", text: `${removedValue} fue eliminado.` });
    registerAction(`${structure.deleteAction}: ${removedValue}`);
    setLastOperation({ id: Date.now(), type: "remove", value: removedValue });
  };

  const reset = () => {
    setValues([...structure.initialValues]);
    setInputValue("");
    setMessage({ type: "idle", text: "La demostración volvió al estado inicial." });
    registerAction("Reinicio de la demostración");
    setLastOperation({ id: Date.now(), type: "reset" });
  };

  return {
    values,
    inputValue,
    setInputValue,
    insert,
    remove,
    reset,
    message,
    history,
    lastOperation,
    isAnimating,
    startAnimation,
    completeAnimation,
  };
}
