import { Google, GitHub, Telegram } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Box } from "@mui/system";
import s from "./style.module.css";


function Footer () {
  
    return (
        <Box >
            <BottomNavigation className={s.footer}>
                <BottomNavigationAction label="Recents" icon={<Telegram />} />
                <BottomNavigationAction label="Favorites" icon={<GitHub />} />
                <BottomNavigationAction label="Nearby" icon={<Google/>} />
            </BottomNavigation>
        </Box>
    )
  }

export default Footer;  