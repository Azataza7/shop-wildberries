import { Request } from 'express';

export interface UserFields {
  _id: Object;
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface userResponse {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface category {
  _id: Object;
  name: string;
}

export interface item {
  _id: Object;
  title: string;
  description: string;
  price: number;
  image: string;
  category: category;
  user: UserFields;
}

export type itemResponse = Omit<item, '_id'>

export interface RequestWithUser extends Request {
  user?: UserFields;
}