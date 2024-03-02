
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

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface deleteItemData {
  token: string;
  id: string
}