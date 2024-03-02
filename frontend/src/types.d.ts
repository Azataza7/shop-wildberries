
export interface Category {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  user: User;
}