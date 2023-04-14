import { AppBar,Box, Toolbar, Typography } from '@mui/material'
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import s from "./styles.module.css";
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import { ButtonAdd } from '../button/button';
import bikerArt from './image/bikerArt.jpg';

export const AppHeader = ({user}) => {
  return (
    <Box sx={{ flexGrow: 1 }} className={s.header} >
      <AppBar position="static"   >
        <Container  maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12}> 
              <Toolbar>
                <SpeakerNotesOutlinedIcon/>
                <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                  &nbsp;Posts
                </Typography>
                <ButtonAdd />
                <div className={s.userData}>
                  <img className={s.userAvatar} src={bikerArt} alt='avatar'/>
                  <span>{user?.name}: {user?.about}</span>
                </div>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  );
};