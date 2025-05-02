export const arraySorter = (sortType: 'asc' | 'desc', array: any[]) => {
  const sortedArr = array.sort((a, b) => sortType === 'asc' ? a - b : b - a);

  return sortedArr;
};