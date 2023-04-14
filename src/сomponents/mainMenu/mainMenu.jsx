import { useContext, useState } from 'react';
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { LocalStorageContext } from "../../../../App";
import DetailUserInfo from '../AuthModal/detailUserName';
import { PostAddForm } from '../../../MainList/MainHead/PostAddForm/postAddForm';
import SearchInput from '/search';



function UserMenu(props) {

    const { setToken, userInfData, setPage, setSearchQuery } = useContext(LocalStorageContext)
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [isOpenAdd, setOpenAdd] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseDialog = () => {
        setOpen(!isOpen);
    };

    const handleClickAdd = () => {
        setOpenAdd(!isOpenAdd);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogOut = () => {
        localStorage.clear()
        setToken('')
        setSearchQuery('')
        setPage(1)
    }


    return (
        <>
            <Box>
                <Box sx={{
                    display: 'flex',
                    gap: '15px'
                }}>
                    <SearchInput />
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp"
                                src={userInfData?.avatar} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(!!anchorElUser)}
                    onClose={handleCloseUserMenu}
                >

                    <MenuItem key={'Профиль'} onClick={handleCloseDialog} >
                        <Typography textAlign="center">{'Профиль'}</Typography>
                    </MenuItem>
                    <MenuItem key={'Добавить пост'} onClick={handleClickAdd}>
                        <Typography textAlign="center">{'Добавить пост'}</Typography>
                    </MenuItem>
                    <MenuItem key={'Выйти'} onClick={handleLogOut}>
                        <Typography textAlign="center">{'Выйти'}</Typography>
                    </MenuItem>
                </Menu>
                <DetailUserInfo open={isOpen} onClose={handleCloseDialog} onClick={handleCloseDialog} />
                <PostAddForm openDialog={isOpenAdd} onClose={handleClickAdd} onClick={handleClickAdd} />
            </Box>
        </>
    );
}

export default UserMenu;