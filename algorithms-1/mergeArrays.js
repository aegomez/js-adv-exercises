const mergeArrays = (largeArray, smallArray) => {
  let s = smallArray.length - 1;
  let l1 = largeArray.length - 1;
  let l0 = l1 - s - 1;
  let insert = false;

  // merge all elements, starting from the largest
  while (s >= 0) {
    // if true, insert next element from smallArray,
    // else, move next element within largeArray
    insert = l0 < 0 || largeArray[l0] <= smallArray[s];

    largeArray[l1--] = insert ? smallArray[s--] : largeArray[l0--];
  }
};

module.exports = mergeArrays;
