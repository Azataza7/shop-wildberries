import { Routes, Route, useLocation } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import ProductItemList from './features/items/productItemList';
import AppToolbar from './Components/AppToolbar/AppToolbar';
import Category from './features/category/category';
import ProductItemDetails from './features/items/productItemDetails';

const App = () => {
  const location = useLocation();
  const hideCategory = location.pathname.includes('/details');

  return (
    <>
      <main>
        <header>
          <AppToolbar/>
        </header>
        <Grid component="div" className="main-container" sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Grid component="div" sx={{flexBasis: !hideCategory ? '70%' : '100%', position: 'relative'}}>
            <Routes>
              <Route path="/" element={(<ProductItemList/>)}/>
              <Route path="/:category" element={(<ProductItemList/>)}/>
              <Route path="/details/:id" element={(<ProductItemDetails/>)}/>
              <Route path="*" element={(
                <Grid component="div"
                      sx={{position: 'absolute', top: '40%', left: '33%', border: '3px solid #ed6c02', padding: 3}}
                >
                  <Typography variant="h3" sx={{color: '#ed6c02'}}>
                    {<DoNotDisturbAltIcon fontSize="15" color="warning"/>} Not Found
                  </Typography>
                </Grid>
              )}/>
            </Routes>
          </Grid>
          {!hideCategory && (
            <aside style={{flexBasis: '30%'}}>
              <Category/>
            </aside>
          )}
        </Grid>
      </main>
    </>
  );
};

export default App;
