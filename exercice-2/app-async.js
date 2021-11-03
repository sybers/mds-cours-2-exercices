const fs = require("fs/promises");
const path = require("path");
const fetch = require("node-fetch");

async function fetchContactInfos(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const data = await response.text();
  return { id, data };
}

async function saveContactInfos(id, data) {
  await fs.writeFile(path.resolve(__dirname, "users", `user-${id}.json`), data);
  return id;
}

async function main() {
  const fileContents = await fs.readFile(
    path.resolve(__dirname, "users.txt"),
    "utf-8"
  );
  const userId = parseInt(fileContents.trim(), 10);

  if (!Number.isInteger(userId)) {
    throw new Error(`Invalid user id: ${userId}`);
  }

  const { id, data } = await fetchContactInfos(userId);
  await saveContactInfos(id, data);

  console.log(`Saved user infos data with id : ${userId}`);
}
main();
