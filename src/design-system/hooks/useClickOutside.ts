import { useEffect } from 'react';

export const useClickOutside = (
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void,
  isOpen: boolean = false
) => {

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const refsArray = Array.isArray(refs) ? refs : [refs];

      const isInsideAnyRef = refsArray.some(ref => ref.current?.contains(event.target as Node));
      if (isInsideAnyRef) {
        return;
      }
      handleOnClickOutside(event);
    };

    if (isOpen) {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    }

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handleOnClickOutside, isOpen]);
};