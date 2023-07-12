export type Post = {
  _id: string;
  title: string;
  description: string | TrustedHTML;
};

export type SubCategory = {
  subCategory: string;
  posts: Post[];
};

export type Category = {
  category: string;
  subCategories: SubCategory[];
};

export type User = {
  firstName: string;
  lastName: string;
  role: string;
};
