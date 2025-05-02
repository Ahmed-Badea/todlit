import { useEffect, RefObject } from "react";

type TScrollTarget = "window" | RefObject<HTMLElement>;

export const useScrollListener = (handler: () => void, target: TScrollTarget = "window") => {
  useEffect(() => {
    const element = target === "window" ? window : target?.current;

    if (!element) return;

    element.addEventListener("scroll", handler);

    return () => {
      element.removeEventListener("scroll", handler);
    };
  }, [handler, target]);
};