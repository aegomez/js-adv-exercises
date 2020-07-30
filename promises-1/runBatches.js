'use strict';

const runBatches = (tasks, batch_size) => {
  const results = [];

  try {
    if (!(tasks instanceof Array) || typeof batch_size !== 'number') {
      throw new Error('invalid arguments');
    }

    return new Promise(resolve => {
      let nextTaskIndex = 0;
      let pendingTasks = tasks.length;

      const runNextTask = taskIndex => {
        if (taskIndex < tasks.length) {
          Promise.resolve(
            tasks[taskIndex]()
              .then(value => ({ value }))
              .catch(error => ({ error }))
          ).then(taskResult => {
            results[taskIndex] = taskResult;
            pendingTasks--;
            runNextTask(nextTaskIndex++);
          });
        } else if (pendingTasks === 0) {
          resolve(results);
        }
      };

      while (nextTaskIndex < batch_size) {
        runNextTask(nextTaskIndex++);
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = runBatches;
