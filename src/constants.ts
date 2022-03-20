export type RawResponse<T> = T extends "user"
  ? User[]
  : T extends "post"
  ? Post[]
  : T extends "comment"
  ? Comment[]
  : never;

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type FormValues = {
  user: number | null;
  post: number | null;
  comment: number | null;
};

export const initialValues: FormValues = {
  user: null,
  post: null,
  comment: null,
};

export type FormClearValues = {
  user: Partial<FormValues>;
  post: Partial<FormValues>;
  comment: Partial<FormValues>;
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
  user: (users: User[]) =>
    users.map((user) => ({ id: user.id, name: user.name })),
  post: (posts: Post[]) =>
    posts.map((post) => ({ id: post.id, name: post.title })),
  comment: (comments: Comment[]) =>
    comments.map((comment) => ({ id: comment.id, name: comment.name })),
} as const;

export type SelectValues = {
  isLoading: boolean;
  isError: boolean;
  values: OptionValue[] | null;
};

export type OptionValue = {
  id: number;
  name: string;
};
