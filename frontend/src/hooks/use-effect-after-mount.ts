import { useEffect, useRef, type EffectCallback, type DependencyList } from "react";

export const useEffectAfterMount = (effect: EffectCallback, deps?: DependencyList) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      return effect();
    } else {
      didMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
