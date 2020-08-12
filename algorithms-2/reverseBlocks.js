const reverseBlocks = (array, blockSize) => {
  if (blockSize < 2) return;
  if (blockSize > array.length) {
    blockSize = array.length;
  }

  let next = blockSize - 1;
  let rest;

  for (let i = 0; i < array.length; i++) {
    if (next > 0) {
      // swap two elements inside a block
      [array[i], array[i + next]] = [array[i + next], array[i]];
      next -= 2;
    } else {
      // increase by blockSize/2, rounded down
      i += (blockSize - 1) >> 1;
      rest = array.length - i - 1;
      next = rest < blockSize ? rest - 1 : blockSize - 1;
    }
  }
};

module.exports = reverseBlocks;
