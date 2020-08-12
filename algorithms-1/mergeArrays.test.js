const mergeArrays = require('./mergeArrays');

describe('mergeArrays', () => {
  test('merges arrays of the same size', () => {
    const largeArray = [1, 3, 5, 7, 9].concat(new Array(5));
    const smallArray = [0, 2, 4, 6, 8];
    const largeArraySize = largeArray.length;

    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(largeArraySize === largeArray.length).toBe(true);
  });

  test('merges arrays of different size', () => {
    const largeArray = [10, 20, 30, 40].concat(new Array(6));
    const smallArray = [0, 25, 50, 75, 100, 125];
    const largeArraySize = largeArray.length;

    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([0, 10, 20, 25, 30, 40, 50, 75, 100, 125]);
    expect(largeArraySize === largeArray.length).toBe(true);
  });

  test('smallArray elements are inserted at the end of the array', () => {
    const largeArray = [11, 22, 33, 44].concat(new Array(4));
    const smallArray = [55, 66, 77, 88];
    const largeArraySize = largeArray.length;

    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([11, 22, 33, 44, 55, 66, 77, 88]);
    expect(largeArraySize === largeArray.length).toBe(true);
  });

  test('smallArray elements are inserted at the start of the array', () => {
    const largeArray = [60, 70, 80, 90].concat(new Array(4));
    const smallArray = [10, 20, 30, 40];
    const largeArraySize = largeArray.length;

    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([10, 20, 30, 40, 60, 70, 80, 90]);
    expect(largeArraySize === largeArray.length).toBe(true);
  });
});
