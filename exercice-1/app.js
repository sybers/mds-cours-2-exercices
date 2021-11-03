const {
  addAsync,
  subtractAsync,
  multiplyAsync,
  divideAsync,
} = require("./operators");

const logResult = (result) => console.log(`Result is ${result}`);

// test 1 ((2+2) * 4 / 8) - 2 = 0
addAsync(2, 2)
  .then((result) => multiplyAsync(result, 4))
  .then((result) => divideAsync(result, 8))
  .then((result) => subtractAsync(result, 2))
  .then(logResult);

// test 2 ((12-8) * 2 - 0.5) * 2 = 15
subtractAsync(12, 8)
  .then((result) => multiplyAsync(result, 2))
  .then((result) => subtractAsync(result, 0.5))
  .then((result) => multiplyAsync(result, 2))
  .then(logResult);
