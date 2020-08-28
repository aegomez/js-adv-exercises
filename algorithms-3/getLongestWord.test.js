const getLongestWord = require('./createTree');

describe('createTree', () => {
  test('finds longest word 1', () => {
    const letters = 'cat';
    const word = getLongestWord(letters);
    expect(word).toBe('act');
  });

  test('finds longest word 2', () => {
    const letters = 'ESRATINDA';
    const word = getLongestWord(letters);
    expect(word).toBe('randiest');
  });

  test('finds longest word 3', () => {
    const letters = 'MSTUEHNDI';
    const word = getLongestWord(letters);
    expect(word).toBe('mindset');
  });
});
