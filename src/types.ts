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

export type AllResponses = User[] | Post[] | Comment[];

export type FormValues = {
  user: number | null;
  post: number | null;
  comment: number | null;
};

export type AllKeys = keyof FormValues;

export type FormClearValues = Record<AllKeys, Partial<FormValues>>;

export type SelectValues = {
  isLoading: boolean;
  isError: boolean;
  values: OptionValue[] | null;
};

export type OptionValue = {
  id: number;
  name: string;
};
