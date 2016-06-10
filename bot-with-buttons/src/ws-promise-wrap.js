/*global module */
module.exports = function promiseWrap (wsCall) {
  return function () {
    var callArgs = Array.prototype.slice.call(arguments);
    return new Promise((resolve, reject) => {
      var cbHandler = (result, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };
      callArgs.push(cbHandler);
      wsCall.apply(this, callArgs);
    });
  };
};
