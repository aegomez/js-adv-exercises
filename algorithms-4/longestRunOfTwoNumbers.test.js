const longestRunOfTwoNumbers = require('./longestRunOfTwoNumbers');

describe('longestRunOfTwoNumbers', () => {
  test('non-string input returns undefined', () => {
    const input = 111;
    const longest = longestRunOfTwoNumbers(input);

    expect(longest).toBe(undefined);
  });

  test('finds longest run of one distinct number', () => {
    const input = '11111';
    const longest = longestRunOfTwoNumbers(input);

    expect(longest).toBe('11111');
  });

  test('finds longest run of two distinct numbers', () => {
    const input = '1212223311212223';
    const longest = longestRunOfTwoNumbers(input);

    expect(longest).toBe('1121222');
  });
});
