import { useState, useContext } from 'react';
import {Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography} from '@mui/material';
import { LocalStorageContext } from '../app/index';
import UserInfoDetail from '../authorization/userNameDetail';
import { PostAddForm } from '../postAddForm/postAddForm';
import SearchInput from '../search/search';
import { useNavigate } from 'react-router-dom';

function UserMenu(props) {
  const {setToken, userInfoData, setPage, setSearchQuery} = useContext(LocalStorageContext)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [isOpenAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate()

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
        navigate('/')
  }

  return (
      <>
        <Box>
             <Box sx={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center'
                  }}>
                    <SearchInput/>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt="avatar"
                                    src={userInfoData?.avatar}
                                    sx={{width: 60, height: 60}}/>
                        </IconButton>
                    </Tooltip>
             </Box>
                <Menu
                    sx={{mt: '45px'}}
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

                    <MenuItem key={'Профиль'} onClick={handleCloseDialog}>
                        <Typography textAlign="center">{'Профиль'}</Typography>
                    </MenuItem>
                    <MenuItem key={'Добавить пост'} onClick={handleClickAdd}>
                        <Typography textAlign="center">{'Добавить пост'}</Typography>
                    </MenuItem>
                    <MenuItem key={'Выйти'} onClick={handleLogOut}>
                        <Typography textAlign="center">{'Выйти'}</Typography>
                    </MenuItem>
                </Menu>
                <UserInfoDetail open={isOpen} onClose={handleCloseDialog} onClick={handleCloseDialog}/>
                <PostAddForm openDialog={isOpenAdd} onClose={handleClickAdd} onClick={handleClickAdd}/>
            </Box>
        </>
    );
}

export default UserMenu;