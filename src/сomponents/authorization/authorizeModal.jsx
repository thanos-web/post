import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useState, useCallback } from "react";
import { setAuthData } from "../../utils/apiPosts";
import { LocalStorageContext } from "../app/index";
import RegistrationForm from '../registration/registrModal';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from 'react-hook-form';
import { Email_Pattern, Password_Pattern } from "../../constants/constants";

const AuthorizeForm = () => {
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
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        {...register('email', Email_Pattern)}
                    />
                    <TextField
                        margin="dense"
                        id="pass"
                        label="Пароль"
                        type={type ? "text" : "password"}
                        fullWidth
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        {...register('password', Password_Pattern)}
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
export default AuthorizeForm;