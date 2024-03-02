import React, { JSX, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories, selectLoadingCategories } from './categorySlice';
import { Category } from '../../types';
import { getCategories } from './categoryThunks';
import { Link } from 'react-router-dom';
import { getItems, getItemsByCategory } from '../items/productItemThunks';


const Category = () => {
  const dispatch = useAppDispatch();

  const categories: Category[] = useAppSelector(selectCategories);
  const onLoading: boolean = useAppSelector(selectLoadingCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);


  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId);

    dispatch(getItemsByCategory(categoryId));
  };

  const handleGetAllItems = () => {
    setActiveCategory(null);
    dispatch(getItems());
  };

  if (onLoading || !categories) {
    return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}} size={60} color="warning"/>;
  }

  const categoriesContainer: JSX.Element[] = categories.map((category) => (
    <AccordionDetails key={category._id} sx={{
      bgcolor: category._id === activeCategory ? '#d37af1' : 'transparent', borderRadius: '10px'
    }}>
      <Link to={'/' + category._id}
            style={{textDecoration: 'none', fontSize: '18px', color: '#000'}}
            onClick={() => handleCategoryClick(category._id)}
      >
        {category.name}
      </Link>
    </AccordionDetails>
  ));


  return (
    <>
      <Accordion sx={{padding: 1}} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{fontWeight: 600}}
        >
          Categories
        </AccordionSummary>
        <AccordionDetails sx={{bgcolor: !activeCategory ? '#d37af1' : 'transparent', borderRadius: '10px'}}>
          <Link to="/" style={{textDecoration: 'none', fontSize: '18px', color: '#000'}} onClick={handleGetAllItems}>
            All Items
          </Link>
        </AccordionDetails>
        {categoriesContainer}
      </Accordion>
    </>
  );
};

export default Category;