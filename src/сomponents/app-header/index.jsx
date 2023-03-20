import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Button,Box, Toolbar, Typography } from '@mui/material'
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";


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
                <Button color="inherit">Login</Button>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
);
};
