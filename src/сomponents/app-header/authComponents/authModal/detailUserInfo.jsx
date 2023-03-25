import { useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserInfo } from '../../../../utils/apiAuth';
import CardMedia from '@mui/material/CardMedia';
import { LocalStorageContext } from "../../../../App";

const DetailUserInfo = ({ open, onClose, onClick }) => {
    const { userInfData, setUserInfData } = useContext(LocalStorageContext)


    useEffect(() => {
        getUserInfo()
            .then((userData) => {
                setUserInfData(userData)
            })
            .catch(err => console.log(err))
    }, [setUserInfData])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Информация о пользователе</DialogTitle>
            <DialogContent>
                {userInfData !== '' ?
                    (<>
                        <DialogContentText>

                        </DialogContentText>
                        <CardMedia
                            component="img"
                            height="160"
                            image={userInfData.avatar}
                            alt="user avatar"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="ФИО"
                            type="emteail"
                            fullWidth
                            variant="standard"
                            defaultValue={userInfData.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Электронная почта"
                            type="email"
                            fullWidth
                            variant="standard"
                            defaultValue={userInfData.email}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </>) : (
                        <CircularProgress />)}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClick}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DetailUserInfo