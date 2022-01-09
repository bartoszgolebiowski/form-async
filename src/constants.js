export const initialValues = {
  user: null,
  post: null,
  comment: null,
};

export const CLEAR = {
  user: { post: null, comment: null },
  post: { comment: null },
  comment: {},
};

export const URLS = {
  user: (id) => `https://jsonplaceholder.typicode.com/users`,
  post: (userId) =>
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  comment: (postId) =>
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
};

export const SELECT = {
  user: (users) => users.map((user) => ({ id: user.id, name: user.name })),
  post: (posts) => posts.map((post) => ({ id: post.id, name: post.title })),
  comment: (comments) =>
    comments.map((comment) => ({ id: comment.id, name: comment.name })),
};
