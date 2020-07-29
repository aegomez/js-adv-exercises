'use strict';

const runBatches = (tasks, batch_size) => {
  const batches = [];
  const results = [];

  try {
    if (!(tasks instanceof Array) || typeof batch_size !== 'number') {
      throw new Error('invalid arguments');
    }

    // divide all tasks into batches
    for (let i = 0, len = tasks.length; i < len; i += batch_size) {
      batches.push(tasks.slice(i, i + batch_size));
    }

    return new Promise(resolve => {
      // run batches recursively, one batch a time
      let nextBatchIndex = 0;

      const runNextBatch = () => {
        if (nextBatchIndex < batches.length) {
          Promise.all(
            batches[nextBatchIndex++].map(task =>
              task()
                .then(value => ({ value }))
                .catch(error => ({ error }))
            )
          ).then(batchResults => {
            results.push(...batchResults);
            runNextBatch();
          });
        } else {
          resolve(results);
        }
      };

      runNextBatch();
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = runBatches;
