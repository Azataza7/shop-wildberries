import { NextFunction, Response } from 'express';
import User from '../models/UserModel';
import { RequestWithUser, UserFields } from '../types';

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(401).send({error: 'Token not provided!'});
    }

    const user: UserFields | null = await User.findOne({token: token});

    if (!user) {
      return res.status(401).send({error: 'User not found!'});
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export default auth;