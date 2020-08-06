const cancellableFetch = url => {
  let _reject;

  const promise = new Promise((res, rej) => {
    _reject = rej;
    fetch(url).then(res).catch(rej);
  });

  promise.cancel = () => {
    _reject('fetch was cancelled');
  };

  return promise;
};

module.exports = cancellableFetch;
