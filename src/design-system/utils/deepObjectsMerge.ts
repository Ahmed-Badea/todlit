export const deepObjectsMerge = (...sources: any) => {
  const result: any = {};
  for (const source of sources) {
    for (const key in source) {
      if (Array.isArray(source[key])) {
        result[key] = [...source[key]];
      } else if (typeof source[key] === 'function') {
        result[key] = source[key];
      } else if (source[key] instanceof Object && result[key] instanceof Object) {
        result[key] = deepObjectsMerge(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
};