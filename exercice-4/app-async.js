const fetch = require("node-fetch");

async function fetchPostById(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const contents = await response.json();
  return contents;
}

async function fetchCommentsByPostId(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  const contents = await response.json();
  return contents;
}

function printPost(post) {
  const comments = post.comments
    .map((comment) => `${comment.email} - ${comment.body}`)
    .join("\n\t");

  console.log(`Title:\n${post.title}\n`);
  console.log(`Content:\n${post.body}\n`);
  console.log(`Comments:\n${comments}\n`);
}

async function main() {
  const args = process.argv.slice(2);

  const postId = parseInt(args[0], 10);
  if (!Number.isInteger(postId)) {
    throw new Error(`Invalid post ID ${args[0]}`);
  }

  const post = await fetchPostById(postId);
  const comments = await fetchCommentsByPostId(postId);
  post.comments = comments;
  printPost(post);
}
main();
