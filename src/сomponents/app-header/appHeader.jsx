import * as React from 'react';
import { AppBar,Box, Toolbar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import Logo from './image/logo.png';
import { Link } from 'react-router-dom';
import { ButtonAdd } from '../button/button';
import RenderUserMenu from './conditionRender/renderUserMenu';
import LocalStorageContext from '../app/index';
import { useState, useContext } from 'react';

function AppHeader ({onOpen}) {
const [openDialog, setOpenDialog] = useState(false);
const handleOpenMenu = () => {
  setOpenDialog(!openDialog);
};

  return (
      <AppBar position="static" sx = {{backgroundColor: '#3c3f43', color: '#fff'}}>
        <Container  maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12}> 
             
              <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{display: 'flex'}}>
                  {/*Логотип*/}
                  <Link to='/'> <img src={Logo} style={{width: '150px'}} alt="postLogo"/> </Link>
                  {/*Название*/}
                <Typography variant="h6" component="a" href="/" text-decotation="none" color="#fff" align="left" sx={{ flexGrow: 1 }}>
                Posts
                </Typography>
                <ButtonAdd/>
                 </Box>
                 {/*// Аватар; меню пользователя и форма регистрации/авторизации*/} 
                 <Box sx={{ display: 'flex' }}>
                  <RenderUserMenu openDialog={openDialog} onClose={handleOpenMenu} onClick={handleOpenMenu}/>
                </Box>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
  )
}

export default AppHeader;