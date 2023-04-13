import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import { ButtonAdd } from '../button';
import s from './styles.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logoSrc from './img/logo.png'
import { UserContext } from '../../contexts/current-user-context';
import { useContext } from 'react';


export const AppHeader = ({ user }) => {
  const currentUser = useContext(UserContext);
  console.log('currentUser',currentUser)
  return (
    <Box sx={{ flexGrow: 1 }} className={s.header} >
      <AppBar position="static"   >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Toolbar  sx={{ display: 'flex', justifyContent: 'space-between'}} >
                <Link to='/'>
                <img src={logoSrc} alt="" className={s.logo}/>
                </Link>
                  <div className={s.userData}>
                  <img className={s.userAvatar} src={user?.avatar} />
                  <span>{user?.name}: {user?.about}</span>
                  <ButtonAdd />
                </div>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  );
};
