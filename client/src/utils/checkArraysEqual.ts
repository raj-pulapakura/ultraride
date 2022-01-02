export const checkArraysEqual = (array1: any[], array2: any[]) => {
  array1.sort();
  array2.sort();

  return array1.reduce((acc, curr, idx) => {
    if (curr !== array2[idx]) {
      return acc && false;
    }
    return acc && true;
  }, true);
};
