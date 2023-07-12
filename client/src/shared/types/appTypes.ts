export type Post = {
  _id: string;
  title: string;
  description: string | TrustedHTML;
};

export type SubCategory = {
  _id: string;
  subCategory: string;
  posts: Post[];
};

export type Category = {
  _id: string;
  category: string;
  subCategories: SubCategory[];
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  _id: string;
};
