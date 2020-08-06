const cancellableFetch = require('./cancellableFetch');

beforeEach(() => {
  global.fetch = jest.fn(
    url =>
      new Promise(res => {
        setTimeout(res, 5000, { text: 'fetch resolved', url });
      })
  );
});

describe('cancellableFetch', () => {
  test('fetch is resolved correctly', () => {
    const result = cancellableFetch('test/1');

    expect.assertions(4);

    return result
      .then(value => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenLastCalledWith('test/1');
        expect(value.text).toBe('fetch resolved');
        expect(value.url).toBe('test/1');
      })
      .catch(console.error);
  });

  test('fetch is cancelled before resolving', () => {
    const result = cancellableFetch('test/2');

    expect.assertions(3);

    result.cancel();

    return result.then(console.log).catch(reason => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenLastCalledWith('test/2');
      expect(reason).toBe('fetch was cancelled');
    });
  });
});
