const addAsync = (lhs, rhs) => {
  return new Promise((resolve) => resolve(lhs + rhs));
};

const subtractAsync = (lhs, rhs) => {
  return new Promise((resolve) => resolve(lhs - rhs));
};

const multiplyAsync = (lhs, rhs) => {
  return new Promise((resolve) => resolve(lhs * rhs));
};

const divideAsync = (lhs, rhs) => {
  return new Promise((resolve) => resolve(lhs / rhs));
};

module.exports = {
  addAsync,
  subtractAsync,
  multiplyAsync,
  divideAsync,
};
