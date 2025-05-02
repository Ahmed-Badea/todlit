export const getVerticalPlacement = (id: string) => {
  const dropdown = document.getElementById(id);
  const rect: any = dropdown?.getBoundingClientRect();

  const spaceTop = rect?.top;
  console.log('spaceTop :', spaceTop);
  const spaceBottom = window.innerHeight - rect?.bottom;
  console.log('spaceBottom :', spaceBottom);

  return spaceTop > spaceBottom ? 'top' : 'bottom';
};