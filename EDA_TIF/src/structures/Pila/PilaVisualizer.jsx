import { animate, createScope } from "animejs";
import { useEffect, useRef, useState } from "react";
import { CanvasShell, EmptyStructure } from "../../components/visualizers/CanvasShell";

export function PilaVisualizer({
  values,
  operation,
  onAnimationStart,
  onAnimationComplete,
}) {
  const root = useRef(null);
  const scope = useRef(null);
  const handledOperationId = useRef(operation?.id ?? null);
  const [visibleValues, setVisibleValues] = useState(values);
  const [pendingAnimation, setPendingAnimation] = useState(null);

  useEffect(() => {
    scope.current = createScope({ root });
    return () => scope.current?.revert();
  }, []);

  useEffect(() => {
    if (!operation || handledOperationId.current === operation.id) return;
    handledOperationId.current = operation.id;

    if (operation.type === "insert") {
      setVisibleValues(values);
      setPendingAnimation(operation);
      return;
    }

    if (operation.type === "remove") {
      setPendingAnimation(operation);
      return;
    }

    setVisibleValues(values);
    setPendingAnimation(null);
    onAnimationComplete();
  }, [operation, values, onAnimationComplete]);

  useEffect(() => {
    if (!pendingAnimation || !scope.current) return;

    const currentNode = root.current?.querySelector(".stack-node.current");
    if (!currentNode) {
      setVisibleValues(values);
      setPendingAnimation(null);
      onAnimationComplete();
      return;
    }

    onAnimationStart();

    if (pendingAnimation.type === "insert") {
      scope.current.add(() => {
        animate(currentNode, {
          y: [-125, 0],
          opacity: [0, 1],
          scale: [0.82, 1],
          rotate: [-4, 0],
          duration: 720,
          ease: "out(4)",
          onComplete: () => {
            setPendingAnimation(null);
            onAnimationComplete();
          },
        });
      });
      return;
    }

    scope.current.add(() => {
      animate(currentNode, {
        y: [0, -105],
        opacity: [1, 0],
        scale: [1, 0.86],
        rotate: [0, 4],
        duration: 480,
        ease: "in(3)",
        onComplete: () => {
          setVisibleValues(values);
          setPendingAnimation(null);
          onAnimationComplete();
        },
      });
    });
  }, [pendingAnimation, values, onAnimationStart, onAnimationComplete]);

  return (
    <div ref={root} className="animated-structure-root">
      <CanvasShell type="stack">
        {visibleValues.length === 0 ? (
          <EmptyStructure />
        ) : (
          <div className="stack-stage">
            <span className="stage-caption">CIMA</span>
            <div className="stack-values">
              {[...visibleValues].reverse().map((value, index) => (
                <div
                  className={`data-node stack-node ${index === 0 ? "current" : ""}`}
                  data-stack-position={index}
                  key={`${value}-${visibleValues.length - index}`}
                >
                  <span>{value}</span>
                  {index === 0 && <small>top</small>}
                </div>
              ))}
            </div>
            <div className="stack-base" />
          </div>
        )}
      </CanvasShell>
    </div>
  );
}
