const longestRunOfTwoNumbers = input => {
  if (typeof input !== 'string') {
    return;
  }
  if (input.length < 3) {
    return input;
  }

  let secondNumberInRun = input[0];
  let sameNumberStart = 0;
  let currentRunStart = 0;

  let longestRunStart = 0;
  let longestRunEnd = 0;

  for (let i = 1; i < input.length; i++) {
    if (input[i] !== input[i - 1]) {
      if (input[i] !== secondNumberInRun) {
        currentRunStart = sameNumberStart;
      }
      secondNumberInRun = input[i - 1];
      sameNumberStart = i;
    }
    if (i - currentRunStart > longestRunEnd - longestRunStart) {
      longestRunEnd = i;
      longestRunStart = currentRunStart;
    }
  }

  return input.slice(longestRunStart, longestRunEnd + 1);
};

module.exports = longestRunOfTwoNumbers;
