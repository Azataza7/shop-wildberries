import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Grid, TextField, Input, MenuItem } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../Users/usersSlice';
import { Category, User, userItem } from '../../types';
import { selectCategories } from '../category/categorySlice';
import { getCategories } from '../category/categoryThunks';
import { createItem } from './productItemThunks';

const AddNewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: User = useAppSelector(selectUser);
  const categories: Category[] = useAppSelector(selectCategories);
  const [formData, setFormData] = useState<userItem>({
    title: '',
    description: '',
    image: null,
    token: user.token,
    category: '',
    price: 0,
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createItem(formData));
    navigate('/');
  };

  return (
    <form className="send-container" style={{marginBottom: '70px', marginTop: '30px'}} onSubmit={handleSubmit}>
      <input
        style={{display: 'none'}}
        type="file"
        name="image"
        ref={fileInputRef}
        onChange={handleFileChange}
        required
      />
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            name="title"
            label="Title"
            placeholder="Write title here"
            required
            fullWidth
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            name="description"
            label="Description"
            placeholder="Write description here"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={8}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            name="price"
            label="Price"
            type="number"
            placeholder="Enter price here"
            required
            fullWidth
            value={formData.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item
              sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
        >
          <Grid sx={{display: 'flex', alignItems: 'center'}}>
            <Button
              onClick={() => fileInputRef.current?.click()}
              cursor="pointer"
              color="primary"
            >
              <AttachFileIcon fontSize="large"/>
            </Button>
            {formData.image && formData.image.name && (
              <Input
                disabled
                style={{display: 'block'}}
                value={formData.image.name}
              />
            )}
          </Grid>
          <Button disabled={!formData.image && !formData.description}
                  type="submit" variant="contained" startIcon={<SendIcon/>}>
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewItem;
