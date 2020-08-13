const reverseBlocks = (array, blockSize) => {
  if (blockSize < 2) return;
  if (blockSize > array.length) {
    blockSize = array.length;
  }

  let half = blockSize >> 1; // blockSize/2 (floor)
  let last; // last index of the current block
  let next; // remaining elements after current block
  let temp;

  for (let i = 0; i < array.length; i += blockSize) {
    next = array.length - i;
    if (next < blockSize) {
      blockSize = next;
      half = next >> 1;
    }

    last = i + blockSize - 1;

    for (let j = 0; j < half; j++) {
      // swap two elements inside a block
      temp = array[i + j];
      array[i + j] = array[last - j];
      array[last - j] = temp;
    }
  }
};

module.exports = reverseBlocks;
