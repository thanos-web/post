import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useState, useCallback } from "react";
import { setAuthData } from '../../../../utils/apiAuth';
import { LocalStorageContext } from "../../../../App";
import RegistrationForm from './regModal';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment, IconButton, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import s from './auth.module.css'
import { emailPattern, passwordPattern } from '../../../../constants/constants';

const FormDialog = () => {
    const [open, setOpen] = useState(false);
    const [render, setRender] = useState(true)
    const [type, setType] = useState(false);
    const [serverAnswer, setServerAnswer] = useState('')
    const { setToken, handleFirstRender } = useContext(LocalStorageContext)
    const { register, handleSubmit, resetField, formState: { errors } } = useForm();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetField('email')
        resetField('password')
        setServerAnswer('')
    };

    const handleEntry = useCallback(async (data) => {
        const answer = await setAuthData(data)
        setServerAnswer(answer)
        const token = answer?.token
        setToken(token)
        handleFirstRender()
    }, [setToken, setServerAnswer, handleFirstRender]);

    const handleClickShowPassword = () => {
        setType(!type)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setType(!type)
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Авторизация
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(handleEntry)}>
                    <DialogTitle sx={{ textAlign: 'center' }}>Авторизация</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="mail"
                            label="Почта"
                            type="email"
                            fullWidth
                            variant="outlined"
                            {...register('email', emailPattern)}
                        />
                        {errors?.email && <span className={s.warningLable} >{errors.email?.message}</span>}
                        <TextField
                            margin="dense"
                            id="pass"
                            label="Пароль"
                            type={type ? "text" : "password"}
                            fullWidth
                            variant="outlined"
                            {...register('password', passwordPattern)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {type ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {errors?.password && <span className={s.warningLable} >{errors.password?.message}</span>}
                        {serverAnswer?.message && <Typography sx={{
                            color: 'red',
                            fontFamily: 'Times',
                            fontSize: '20px',
                            mt: "10px"
                        }} > {serverAnswer?.message}</Typography>}
                    </DialogContent>
                    <DialogActions>
                        {render && <RegistrationForm setRender={setRender} />}
                        <Button type="submit">Подтвердить</Button>
                        <Button onClick={handleClose}>Отмена</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
export default FormDialog;