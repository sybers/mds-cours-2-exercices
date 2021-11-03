const fetch = require("node-fetch");

function fetchPostById(id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
    (response) => response.json()
  );
}

function fethCommentsByPostId(id) {
  return fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  ).then((response) => response.json());
}

function printPost(post) {
  const comments = post.comments
    .map((comment) => `${comment.email} - ${comment.body}`)
    .join("\n\t");
  console.log(`Title:\n${post.title}\n`);
  console.log(`Content:\n${post.body}\n`);
  console.log(`Comments:\n${comments}\n`);
}

const args = process.argv.slice(2);

const postId = parseInt(args[0], 10);
if (!Number.isInteger(postId)) {
  throw new Error(`Invalid post ID ${args[0]}`);
}

fetchPostById(postId)
  .then((post) => {
    return fethCommentsByPostId(post.id).then((comments) => {
      post.comments = comments;

      return post;
    });
  })
  .then(printPost);
