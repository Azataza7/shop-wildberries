import mongoose from 'mongoose';
import config from './config';
import User from './models/UserModel';
import Item from './models/ItemModel';
import Category from './models/CategoryModel';

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('items');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop');
  }

  const [user1, user2, user3, user4] = await User.create(
    {
      username: 'admin',
      password: 'admin123',
      phoneNumber: '+996555880301',
      displayName: 'Petrov Ivan',
      token: 'admin'
    },
    {
      username: 'admin1',
      password: 'admin123',
      phoneNumber: '+993884883888',
      displayName: 'Kulbaev Azat',
      token: 'admin1'
    },
    {
      username: 'admin2',
      password: 'admin123',
      phoneNumber: '+996709809802',
      displayName: 'Valeriya IP',
      token: 'admin2'
    },
    {
      username: 'admin3',
      password: 'admin123',
      phoneNumber: '+996909999090',
      displayName: 'John Doe',
      token: 'admin3'
    }
  );

  const [category1, category2, category3, category4] = await Category.create(
    {name: 'clothes'}, {name: 'cars'},
    {name: 'other'}, {name: 'animals'}
  );

  const [item1, item2, item3] = await Item.create(
    {
      title: 'Shirt Gucci',
      description: 'Big price for brainless people',
      price: 12000,
      image: 'fixtures/gucci-shirt.jpeg',
      category: category1,
      user: user1
    },
    {
      title: 'Toyota Highlander',
      description: 'Big car for big people',
      price: 42000,
      image: 'fixtures/highlander.webp',
      category: category2,
      user: user2
    },
    {
      title: 'Book three guys',
      description: 'Good book for good people',
      price: 500,
      image: 'fixtures/book.jpeg',
      category: category3,
      user: user3
    },
    {
      title: 'American Bully',
      description: 'Smart dog for smart people',
      price: 500,
      image: 'fixtures/american-bully.jpeg',
      category: category4,
      user: user4
    },
  );
};

void run();