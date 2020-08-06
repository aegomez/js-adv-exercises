const timeout = require('./timeout');

const queryRetry = async (query, maxRetries, delay, delayIncrement = 1000) => {
  let delayTime = delayIncrement;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const data = await query();
      return data;
    } catch (err) {
      if (attempt < maxRetries) {
        await timeout(delayTime);
        if (delay) {
          delayTime += delayIncrement;
        }
      }
    }
  }

  throw new Error('MaxRetriesExceeded');
};

module.exports = queryRetry;
