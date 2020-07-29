const runBatches = require('./runBatches');

const taskFactorySample = (delay, resolve, val) => () =>
  new Promise((res, rej) => setTimeout(resolve ? res : rej, delay, val));

describe('runBatches', () => {
  describe('called with no arguments', () => {
    test('returns a rejected promise', () => {
      expect.assertions(1);
      return expect(runBatches()).rejects.toThrow('invalid arguments');
    });
  });

  describe('called with wrong arguments', () => {
    test('returns a rejected promise', () => {
      expect.assertions(1);
      return expect(runBatches([() => {}], 1)).rejects.toThrow();
    });
  });

  describe('given a list of 6 mixed tasks', () => {
    const tasks = [
      taskFactorySample(50, true, 1),
      taskFactorySample(100, true, 2),
      taskFactorySample(500, false, 'error3'),
      taskFactorySample(200, true, 4),
      taskFactorySample(100, false, 'error5'),
      taskFactorySample(100, false, 'error6'),
    ];

    const batch_size = 2;

    test('the result is an array equal to tasks.length', () => {
      expect.assertions(1);
      return runBatches(tasks, batch_size).then(data => {
        expect(data.length).toBe(6);
      });
    });

    test('a fulfilled task returns a value', () => {
      expect.assertions(3);
      return runBatches(tasks, batch_size).then(data => {
        expect(data[0]).toStrictEqual({ value: 1 });
        expect(data[1]).toStrictEqual({ value: 2 });
        expect(data[3]).toStrictEqual({ value: 4 });
      });
    });

    test('a rejected task returns an error', () => {
      expect.assertions(1);
      return runBatches(tasks, batch_size).then(data =>
        expect(data[2]).toStrictEqual({ error: 'error3' })
      );
    });
  });
});
