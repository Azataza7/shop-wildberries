import mongoose, { Schema } from 'mongoose';

const CategoryModelSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
})

const Category = mongoose.model('Category', CategoryModelSchema);

export default Category