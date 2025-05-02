export const detectScrollEnd = (elementRef: any) => {
  if (elementRef?.current) {
    const { scrollTop, scrollHeight, clientHeight } = elementRef.current;
    return (scrollTop + clientHeight >= scrollHeight);
  }
  return false;
};

export const hasScrollBar = (elementRef: any) => {
  if (elementRef?.current) {
    const hasScrollbar = elementRef.current.scrollHeight > elementRef.current.clientHeight;
    return hasScrollbar;
  }
  return false;
};