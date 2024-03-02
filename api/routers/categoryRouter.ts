import { Router } from 'express';
import Category from '../models/CategoryModel';
import { category } from '../types';

const categoryRouter = Router();

categoryRouter.get('/', async (req, res) => {
  const results: category[] = await Category.find();

  return res.send(results);
});


export default categoryRouter;
