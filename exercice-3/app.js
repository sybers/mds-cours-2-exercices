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

fs.readFile("./users.txt", "utf-8")
  .then((fileContents) => {
    const contactIDS = fileContents
      .split(",")
      .map((id) => parseInt(id, 10))
      .filter((id) => Number.isInteger(id));

    return Promise.all(
      contactIDS.map((id) =>
        fetchContactInfos(id).then(({ id, data }) => saveContactInfos(id, data))
      )
    );
  })
  .then((ids) => {
    console.log(`Saved contact infos for ids : ${JSON.stringify(ids)}`);
  });
