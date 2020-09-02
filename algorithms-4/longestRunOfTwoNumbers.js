const longestRunOfTwoNumbers = input => {
  if (typeof input !== 'string') {
    return;
  }
  if (input.length < 3) {
    return input;
  }

  let second = input[0]; // second number in the current run
  let iOne = 0; // start of current 1-number run
  let iTwo = 0; // start of current 2-numbers run
  let i0Longest = 0; // start of longest run
  let i1Longest = 0; // end of longest run

  for (let i = 1; i < input.length; i++) {
    if (input[i] !== input[i - 1]) {
      if (input[i] !== second) {
        iTwo = iOne;
      }
      second = input[i - 1];
      iOne = i;
    }
    if (i - iTwo > i1Longest - i0Longest) {
      i1Longest = i;
      i0Longest = iTwo;
    }
  }

  return input.slice(i0Longest, i1Longest + 1);
};

module.exports = longestRunOfTwoNumbers;
