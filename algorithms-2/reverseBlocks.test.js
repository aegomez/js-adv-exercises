const reverseBlocks = require('./reverseBlocks');

describe('reverseBlocks', () => {
  test('reverse odd sized blocks', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const blockSize = 3;
    const len = arr.length;

    reverseBlocks(arr, blockSize);

    expect(arr).toEqual([2, 1, 0, 5, 4, 3, 8, 7, 6, 9]);
    expect(arr.length).toBe(len);
  });

  test('reverse even sized blocks', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const blockSize = 4;
    const len = arr.length;

    reverseBlocks(arr, blockSize);

    expect(arr).toEqual([3, 2, 1, 0, 7, 6, 5, 4, 9, 8]);
    expect(arr.length).toBe(len);
  });

  test('block size is >= array length ', () => {
    const arr = [1, 10, 100, 110, 101, 11, 1];
    const blockSize = 10;
    const len = arr.length;

    reverseBlocks(arr, blockSize);

    expect(arr).toEqual([1, 11, 101, 110, 100, 10, 1]);
    expect(arr.length).toBe(len);
  });
});
