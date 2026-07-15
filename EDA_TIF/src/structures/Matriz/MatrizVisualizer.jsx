import { animate, createScope } from "animejs";
import { useEffect, useRef, useState } from "react";
import { CanvasShell, EmptyStructure } from "../../components/visualizers/CanvasShell";

export function MatrizVisualizer({ values, operation, onAnimationStart, onAnimationComplete }) {
  const root = useRef(null);
  const scope = useRef(null);
  const [visibleValues, setVisibleValues] = useState(values);
  const [pendingAnimation, setPendingAnimation] = useState(null);

  useEffect(() => {
    scope.current = createScope({ root });
    return () => scope.current?.revert();
  }, []);

  useEffect(() => {
    if (!operation) return;
    if (operation.type === "insert") {
      setVisibleValues(values);
      setPendingAnimation(operation);
    } else if (operation.type === "remove") {
      setPendingAnimation(operation);
    } else {
      setVisibleValues(values);
      setPendingAnimation(null);
      onAnimationComplete();
    }
  }, [operation, values, onAnimationComplete]);

  useEffect(() => {
    if (!pendingAnimation || !scope.current) return;
    const selector = pendingAnimation.type === "insert"
      ? ".matrix-cell:last-child"
      : `.matrix-cell[data-value="${pendingAnimation.value}"]`;
    const cell = root.current?.querySelector(selector);
    if (!cell) return;
    onAnimationStart();

    scope.current.add(() => {
      animate(cell, {
        opacity: pendingAnimation.type === "insert" ? [0, 1] : [1, 0],
        scale: pendingAnimation.type === "insert" ? [0.25, 1] : [1, 0.25],
        rotateX: pendingAnimation.type === "insert" ? [-80, 0] : [0, 80],
        y: pendingAnimation.type === "insert" ? [-45, 0] : [0, -45],
        duration: pendingAnimation.type === "insert" ? 720 : 520,
        ease: pendingAnimation.type === "insert" ? "outElastic(1, .75)" : "in(4)",
        onComplete: () => {
          if (pendingAnimation.type === "remove") setVisibleValues(values);
          setPendingAnimation(null);
          onAnimationComplete();
        },
      });
    });
  }, [pendingAnimation, values, onAnimationStart, onAnimationComplete]);

  return (
    <div ref={root} className="animated-structure-root">
      <CanvasShell type="matrix" view="2.5D MATRICIAL">
        {visibleValues.length === 0 ? (
          <EmptyStructure />
        ) : (
          <div className="matrix-perspective">
            <div className="matrix-grid">
              {visibleValues.map((value, index) => (
                <div className="matrix-cell" data-value={value} key={value}>
                  <small>[{Math.floor(index / 3)}][{index % 3}]</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </CanvasShell>
    </div>
  );
}
