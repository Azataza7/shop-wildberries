import { Router, Response, NextFunction, Request } from 'express';
import ItemModel from '../models/ItemModel';
import auth from '../middleware/auth';
import { imagesUpload } from '../multer';
import { item, itemResponse, RequestWithUser } from '../types';
import mongoose from 'mongoose';
import Item from '../models/ItemModel';

const itemRouter = Router();

itemRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results: item[] = await ItemModel.find()
      .populate('user')
      .populate('category', 'name');

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

itemRouter.get('/:category', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = req.params.category;

    const results: item[] = await ItemModel.find({ category: category })
      .populate('user')
      .populate('category', 'name');

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

itemRouter.get('/details/:id', async (req: Request, res: Response, next: NextFunction) => {
  const itemId = req.params.id;

  try {
    const results: item | null = await ItemModel.findById(itemId)
      .populate('user')
      .populate('category', 'name');

    if (!results) {
      return res.status(404).send({error: 'Item not found'});
    }

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

itemRouter.delete('/:id', auth, async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const itemId = req.params.id;

  try {
    const itemToDelete = await ItemModel.findById(itemId);

    if (!itemToDelete) {
      return res.status(404).send({error: 'Item not found or already deleted'});
    }

    if (itemToDelete.user.toString() !== req.user?._id.toString()) {
      return res.status(403).send({error: 'you have no permision to delete other item'});
    }

    await itemToDelete.deleteOne({});

    return res.status(200).send({message: 'Item deleted successfully'});

  } catch (e) {
    next(e);
  }
});

itemRouter.post('/', auth, imagesUpload.single('image'),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const {title, description, price, category} = req.body;
    const image = req.file?.filename;

    const itemData = <itemResponse>{
      title: title,
      description: description,
      price: price,
      image: image,
      category: category,
      user: req.user
    };

    try {
      const newItem = await new Item(itemData);
      await newItem.save();

      return res.status(201).send({message: 'OK', newItem});
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  });


export default itemRouter;