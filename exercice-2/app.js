const fs = require("fs/promises");
const path = require("path");
const fetch = require("node-fetch");

function fetchContactInfos(id) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => response.text())
    .then((data) => ({ id, data }));
}

function saveContactInfos(id, data) {
  return fs
    .writeFile(path.resolve(__dirname, "users", `user-${id}.json`), data)
    .then(() => id);
}

function readContactIdFromFile(fileName) {
  return fs.readFile(fileName, "utf-8").then((fileContents) => {
    const userId = parseInt(fileContents.trim(), 10);

    if (!Number.isInteger(userId)) {
      throw new Error(`Invalid user id: ${userId}`);
    }

    return userId;
  });
}

readContactIdFromFile(path.resolve(__dirname, "users.txt"))
  .then((userId) => fetchContactInfos(userId))
  .then(({ id, data }) => saveContactInfos(id, data))
  .then((userId) => console.log(`Saved user infos data with id : ${userId}`))
  .catch((err) => console.error(err));
