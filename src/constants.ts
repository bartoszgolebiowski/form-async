import {
  FormValues,
  FormClearValues,
  User,
  OptionValue,
  Post,
  Comment,
} from "./types";

export const initialValues: FormValues = {
  user: null,
  post: null,
  comment: null,
};

export const CLEAR: FormClearValues = {
  user: { post: null, comment: null },
  post: { comment: null },
  comment: {},
};

export const URLS = {
  user: (id: number | null) => `https://jsonplaceholder.typicode.com/users`,
  post: (userId: number | null) =>
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  comment: (postId: number | null) =>
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
} as const;

export const SELECT = {
  user: (users: User[]): OptionValue[] =>
    users.map((user) => ({ id: user.id, name: user.name })),
  post: (posts: Post[]): OptionValue[] =>
    posts.map((post) => ({ id: post.id, name: post.title })),
  comment: (comments: Comment[]): OptionValue[] =>
    comments.map((comment) => ({ id: comment.id, name: comment.name })),
} as const;
