import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import { ButtonAdd } from '../button';
import s from './styles.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logoSrc from './img/logo.png'
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';

export const AppHeader = ({children, onOpen}) => {

const {currentUser} = useContext(UserContext)

const handleOpenModal = () => {
  onOpen()
}

  return (
    <Box sx={{ flexGrow: 1 }} className={s.header} >
      <AppBar position="static"   >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Link to='/'>
                  <img src={logoSrc} alt="" className={s.logo} />
                </Link>
                <div className={s.userData}>
                  <img className={s.userAvatar} src={currentUser?.avatar} />
                  <span>{currentUser?.name}: {currentUser?.about}</span>
                  <ButtonAdd  onClick={handleOpenModal}/>
                </div>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  );
};