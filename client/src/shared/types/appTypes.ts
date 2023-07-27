export type Post = {
  _id: string;
  title: string;
  description: string | TrustedHTML;
  categoryId: string;
  subCategoryId: string;
  creatorId: string;
  createdAt: Date;
};

export type SubCategory = {
  _id: string;
  subCategory: string;
  categoryId: string;
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
