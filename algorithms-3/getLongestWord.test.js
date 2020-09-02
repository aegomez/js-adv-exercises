const getLongestWord = require('./getLongestWord');

describe('createTree', () => {
  test('finds longest word 1', () => {
    const letters = 'catdog';
    const word = getLongestWord(letters);
    expect(word).toBe('coda');
  });

  test('finds longest word 2', () => {
    const letters = 'ESRATINDA';
    const word = getLongestWord(letters);
    expect(word).toBe('radiates');
  });

  test('finds longest word 3', () => {
    const letters = 'MSTUEHNDI';
    const word = getLongestWord(letters);
    expect(word).toBe('humidest');
  });
});
