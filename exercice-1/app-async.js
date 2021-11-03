const {
  addAsync,
  subtractAsync,
  multiplyAsync,
  divideAsync,
} = require("./operators");

const logResult = (result) => console.log(`Result is ${result}`);

async function main() {
  let result = null;

  result = await addAsync(2, 2);
  result = await multiplyAsync(result, 4);
  result = await divideAsync(result, 8);
  result = await subtractAsync(result, 2);
  logResult(result);

  // test 2 ((12-8) * 2 - 0.5) * 2 = 15
  result = await subtractAsync(12, 8);
  result = await multiplyAsync(result, 2);
  result = await subtractAsync(result, 0.5);
  result = await multiplyAsync(result, 2);
  logResult(result);
}
main();
