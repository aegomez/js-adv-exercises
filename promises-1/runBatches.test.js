const runBatches = require('./runBatches');

const taskFactorySample = (delay, resolve, val) => () =>
  new Promise((res, rej) => setTimeout(resolve ? res : rej, delay, val));

describe('runBatches', () => {
  describe('* called with no arguments', () => {
    test('returns a rejected promise', async () => {
      expect.assertions(1);
      await expect(runBatches()).rejects.toThrow('invalid arguments');
    });
  });

  describe('* called with wrong arguments', () => {
    test('returns a rejected promise', async () => {
      expect.assertions(1);
      await expect(runBatches([() => {}])).rejects.toThrow();
    });
  });

  describe('* given a list of 6 mixed tasks', () => {
    const tasks = [
      taskFactorySample(100, true, 1),
      taskFactorySample(200, true, 2),
      taskFactorySample(100, false, 'error3'),
      taskFactorySample(300, true, 4),
      taskFactorySample(100, false, 'error5'),
      taskFactorySample(200, false, 'error6'),
    ];

    let batch_size = 2;

    test('the result is an array equal to tasks.length', async () => {
      expect.assertions(1);
      const data = await runBatches(tasks, batch_size);
      expect(data.length).toBe(6);
    });

    test('a fulfilled task returns a value', async () => {
      expect.assertions(3);
      const data = await runBatches(tasks, batch_size);
      expect(data[0]).toStrictEqual({ value: 1 });
      expect(data[1]).toStrictEqual({ value: 2 });
      expect(data[3]).toStrictEqual({ value: 4 });
    });

    test('a rejected task returns an error', async () => {
      expect.assertions(1);
      const data = await runBatches(tasks, batch_size);
      expect(data[2]).toStrictEqual({ error: 'error3' });
    });

    test('with batch_size = 2, execution time is ~500 ms', async () => {
      expect.assertions(1);
      const expectedTime = 500;
      const start = performance.now();
      await runBatches(tasks, batch_size);
      const end = performance.now();
      const time = end - start;
      const error = 1 - expectedTime / time;
      expect(error).toBeLessThan(0.06);
    });

    test('with batch_size = 3, execution time is ~400 ms', async () => {
      expect.assertions(1);
      const expectedTime = 400;
      batch_size = 3;
      const start = performance.now();
      await runBatches(tasks, batch_size);
      const end = performance.now();
      const time = end - start;
      const error = 1 - expectedTime / time;
      expect(error).toBeLessThan(0.06);
    });
  });
});
