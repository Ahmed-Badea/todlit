import { useEffect, useLayoutEffect } from 'react';

export const useClickOutside = (
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  handleOnClickOutside: (event: MouseEvent | TouchEvent, ...rest: any) => void,
  isOpen: boolean = false,
  ...rest: any
) => {

  useEffect(() => {
    const refsArray = Array.isArray(refs) ? refs : [refs];
    const areAllRefsDefined = refsArray.every(ref => ref?.current !== undefined && ref?.current !== null);

    const listener = (event: MouseEvent | TouchEvent) => {
      const isInsideAnyRef = refsArray.some(ref => ref.current?.contains(event.target as Node));
      if (isInsideAnyRef) return;
      handleOnClickOutside(event, ...rest);
    };

    if (isOpen && areAllRefsDefined) {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    }

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handleOnClickOutside, isOpen]);
};