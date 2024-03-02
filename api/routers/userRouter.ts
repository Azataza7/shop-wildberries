import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../models/UserModel';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { userResponse } from '../types';

const userRouter = Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const {username, password, displayName, phoneNumber} = req.body;

    const newUser: userResponse = {
      username: username,
      password: password,
      displayName: displayName,
      phoneNumber: phoneNumber
    };

    const user = new User(newUser);

    user.generateToken();

    await user.save();
    res.status(201).send({message: 'ok', user});

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const token = randomUUID();

    const user = await User.findOne({username: req.body.username});

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({error: 'Username or password is wrong'});
    }

    user.token = token;
    await user.save();

    return res.send({message: 'Success!', user});
  } catch (e) {
    next(e);
  }
});

export default userRouter;