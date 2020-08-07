const mergeArrays = require('./mergeArrays');

describe('mergeArrays', () => {
  test('arrays are merged and sorted', () => {
    const largeArray = [1, 3, 5, 7, 9].concat(new Array(5));
    const smallArray = [0, 2, 4, 6, 8];
    const largeArraySize = largeArray.length;

    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(largeArraySize === largeArray.length).toBe(true);
  });

  test('arrays are merged and sorted', () => {
    const largeArray = [10, 20, 30, 40].concat(new Array(5));
    const smallArray = [25, 50, 75, 100, 125];
    const largeArraySize = largeArray.length;

    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([10, 20, 25, 30, 40, 50, 75, 100, 125]);
    expect(largeArraySize === largeArray.length).toBe(true);
  });
});
