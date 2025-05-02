export const getDir = () => {
  const htmlElement = document.documentElement;
  const htmlElementDir = htmlElement?.getAttribute("dir") || 'ltr';

  return htmlElementDir as "ltr" | "rtl";
};

const getRect = (ref: React.RefObject<HTMLElement>) => {
  const element: HTMLElement | null = ref.current;

  const rect = element?.getBoundingClientRect();
  return rect;
};

export const getHorizontalPlacement = (ref: React.RefObject<HTMLElement>, dir: 'ltr' | 'rtl' = getDir()) => {
  const rect = getRect(ref);
  if (!rect) return 'start';

  const spaceStart = dir === 'ltr' ? rect.left : rect.right;
  const spaceEnd = window.innerWidth - (dir === 'ltr' ? rect.right : rect.left);

  return spaceStart > spaceEnd ? (dir === 'ltr' ? 'end' : 'start') : (dir === 'ltr' ? 'start' : 'end');
};

export const getVerticalPlacement = (ref: React.RefObject<HTMLElement>) => {
  const rect = getRect(ref);

  if (!rect) return 'bottom';

  const spaceTop = rect.top;
  const spaceBottom = window.innerHeight - rect.bottom;

  return spaceTop > spaceBottom ? 'top' : 'bottom';
};