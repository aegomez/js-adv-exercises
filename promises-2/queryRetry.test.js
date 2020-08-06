const queryRetry = require('./queryRetry');

const mockQuery = jest.fn((url, callback) => () => {
  callback(url);
  return Promise.reject('API failure');
});

let maxRetries = 3;
let delayIncrement = 1000;

describe('queryRetry', () => {
  describe('* first query is successful', () => {
    test('the data is handled correctly', async () => {
      const mockQuerySuccess = jest.fn((url, callback) => () => {
        callback(url);
        return Promise.resolve({ name: 'Fooly' });
      });
      const callback = jest.fn();

      expect.assertions(3);

      try {
        const data = await queryRetry(
          mockQuerySuccess('api/one', callback),
          maxRetries
        );
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith('api/one');
        expect(data).toStrictEqual({ name: 'Fooly' });
      } catch (err) {
        console.error(err);
      }
    });
  });

  describe('* first query fails', () => {
    test('the query is tried up to 3 times', async () => {
      const callback = jest.fn();

      expect.assertions(3);

      try {
        await queryRetry(mockQuery('api/three', callback), maxRetries);
      } catch (err) {
        expect(err.message).toBe('MaxRetriesExceeded');
        expect(callback).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenLastCalledWith('api/three');
      }
    });

    test('the query is tried up to 5 times', async () => {
      const callback = jest.fn();
      const maxRetries = 5;

      expect.assertions(3);

      try {
        await queryRetry(mockQuery('api/five', callback), maxRetries);
      } catch (err) {
        expect(err.message).toBe('MaxRetriesExceeded');
        expect(callback).toHaveBeenCalledTimes(5);
        expect(callback).toHaveBeenLastCalledWith('api/five');
      }
    }, 10000);

    test('the delay time is not increased', async () => {
      const callback = jest.fn();
      const delay = false;
      const maxRetries = 4;

      expect.assertions(2);

      const t0 = performance.now();
      try {
        await queryRetry(
          mockQuery('api/four', callback),
          maxRetries,
          delay,
          delayIncrement
        );
      } catch (err) {
        const t1 = performance.now();
        const time = t1 - t0;

        expect(time).toBeGreaterThan(4000);
        expect(time).toBeLessThan(4100);
      }
    }, 10000);

    test('the delay time is increased after each retry', async () => {
      const callback = jest.fn();
      const delay = true;
      const maxRetries = 4;

      expect.assertions(2);

      const t0 = performance.now();
      try {
        await queryRetry(
          mockQuery('api/four', callback),
          maxRetries,
          delay,
          delayIncrement
        );
      } catch (err) {
        const t1 = performance.now();
        const time = t1 - t0;

        expect(time).toBeGreaterThan(10000);
        expect(time).toBeLessThan(10100);
      }
    }, 15000);
  });
});
