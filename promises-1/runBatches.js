'use strict';

const runBatches = async (tasks, batch_size) => {
  try {
    if (!(tasks instanceof Array) || typeof batch_size !== 'number') {
      throw new Error('invalid arguments');
    }

    const results = [];
    const _batch_size = Math.min(batch_size, tasks.length);

    let nextTaskIndex = 0;
    let runningTasks = [];

    const runNextTask = async () => {
      while (nextTaskIndex < tasks.length) {
        let index = nextTaskIndex++;

        try {
          results[index] = { value: await tasks[index]() };
        } catch (error) {
          results[index] = { error };
        }
      }
    };

    while (nextTaskIndex < _batch_size) {
      runningTasks.push(runNextTask());
    }
    await Promise.all(runningTasks);

    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = runBatches;
