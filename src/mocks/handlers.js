import { rest } from "msw";
import { comments, posts1, posts2, users } from "./responses";

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
  rest.get(
    "https://jsonplaceholder.typicode.com/users/1/posts",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(posts1));
    }
  ),
  rest.get(
    "https://jsonplaceholder.typicode.com/users/2/posts",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(posts2));
    }
  ),
  rest.get(
    "https://jsonplaceholder.typicode.com/posts/2/comments",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(comments));
    }
  ),
];
