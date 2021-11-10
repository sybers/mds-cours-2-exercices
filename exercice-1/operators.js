function addAsync(lhs, rhs) {
  return new Promise((resolve) => resolve(lhs + rhs));
}

function subtractAsync(lhs, rhs) {
  return new Promise((resolve) => resolve(lhs - rhs));
}

function multiplyAsync(lhs, rhs) {
  return new Promise((resolve) => resolve(lhs * rhs));
}

function divideAsync(lhs, rhs) {
  return new Promise((resolve, reject) => {
    if (rhs === 0) reject(new Error("Attention division par zero"));
    else resolve(lhs / rhs);
  });
}

module.exports = {
  addAsync,
  subtractAsync,
  multiplyAsync,
  divideAsync,
};
