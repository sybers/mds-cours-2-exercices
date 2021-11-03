const fs = require("fs/promises");
const path = require("path");
const fetch = require("node-fetch");

async function readUserIdsFromFile(filePath) {
  const fileContents = await fs.readFile(filePath, "utf-8");

  return fileContents
    .split(",")
    .map((id) => parseInt(id, 10))
    .filter((id) => Number.isInteger(id));
}

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
  const userIds = await readUserIdsFromFile(path.join(__dirname, "users.txt"));

  const ids = await Promise.all(
    userIds.map((id) =>
      fetchContactInfos(id).then(({ id, data }) => saveContactInfos(id, data))
    )
  );

  console.log(`Saved contact infos for ids : ${JSON.stringify(ids)}`);
}
main();
