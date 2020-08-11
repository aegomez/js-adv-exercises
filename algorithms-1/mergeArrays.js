const mergeArrays = (largeArray, smallArray) => {
  let l0 = 0;
  let l1 = largeArray.length - smallArray.length;
  let s = 0;

  while (s < smallArray.length) {
    let nextSmall = smallArray[s++];

    // move all elements that are greater than the
    // new element, one position to the right
    for (l0 = l1++; nextSmall < largeArray[l0 - 1]; l0--) {
      largeArray[l0] = largeArray[l0 - 1];
    }

    // insert new element
    largeArray[l0] = nextSmall;
  }
};

module.exports = mergeArrays;
