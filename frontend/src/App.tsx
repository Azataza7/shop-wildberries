import { Routes, Route } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import ProductItemList from './features/items/productItemList';
import AppToolbar from './Components/AppToolbar/AppToolbar';

const App = () => {

  return (
    <>
      <main>
        <header>
          <AppToolbar/>
        </header>
        <Container maxWidth="fixed">
          <Routes>
            <Route path="/" element={(<ProductItemList/>)}/>


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
        </Container>
      </main>
    </>
  );
};

export default App;
