const mergeArrays = (largeArray, smallArray) => {
  const copy = largeArray.slice(0, largeArray.length - smallArray.length);
  let c = 0;
  let l = 0;
  let s = 0;

  // merge elements in order
  while (c < copy.length && s < smallArray.length) {
    largeArray[l++] = copy[c] < smallArray[s] ? copy[c++] : smallArray[s++];
  }

  // copy the rest of the elements
  while (c < copy.length) {
    largeArray[l++] = copy[c++];
  }
  while (s < smallArray.length) {
    largeArray[l++] = smallArray[s++];
  }
};

module.exports = mergeArrays;
