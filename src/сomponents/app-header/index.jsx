import { Menu } from '@mui/icons-material'; 
import { AppBar,Box,IconButton, Toolbar, Typography } from '@mui/material'
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import { ButtonAdd } from '../button';

import s from "./style.module.css";

export const AppHeader = () => {
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
                <ButtonAdd/>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
);
};
