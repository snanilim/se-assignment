export const isUndefined = (obj): obj is undefined =>
  typeof obj === 'undefined';

export const isFunction = (fn): boolean => typeof fn === 'function';

export const isString = (fn): fn is string => typeof fn === 'string';

export const isConstructor = (fn): boolean => fn === 'constructor';

export const isObject = (fn): fn is object =>
  !isNull(fn) && typeof fn === 'object';

export const isNull = (obj): boolean => isUndefined(obj) || obj === null;

export const isEmpty = (array): boolean => !(array && array.length > 0);

export const isSymbol = (fn): fn is symbol => typeof fn === 'symbol';

export const validatePath = path =>
  path.charAt(0) !== '/' ? '/' + path : path;
