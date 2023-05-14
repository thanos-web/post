import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, InputAdornment, IconButton } from "@mui/material";
import { useState, useCallback, useContext } from "react";
import { getRegistrationUser } from "../../utils/apiPosts";
import ServerAnswerForm from "../authorization/serverAnswer";
import { LocalStorageContext } from "../app/index";
import { useForm } from "react-hook-form"; 
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {Email_Pattern, Password_Pattern, User_Agreement} from '../../constants/constants';

const RegistrationForm = ({ setRender }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(false);
    const [openAnswer, setOpenAnswer] = useState(false)
    const { setMessage, message } = useContext(LocalStorageContext);
    
    const onSubmit = useCallback(async (data) => {
      const answer = await getRegistrationUser({ ...data, group: "group-11" })
      setMessage(answer)
      setOpenAnswer(!openAnswer);
    }, [openAnswer, setMessage]);
    
    const handleClick = () => {
      setOpen(!open);
    };
    const handleOpenAnswerForm = () => {
      setOpenAnswer(!openAnswer);
      setRender(message.message && true)
    };
    const handleClickShowPassword = () => {
      setType(!type)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setType(!type)
    };
    return (
        <>
            <Button onClick={handleClick}>
                Регистрация
            </Button>
            <Dialog open={open} onClose={handleClick}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle sx={{ textAlign: 'center' }}>Регистрация</DialogTitle>
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
                            autoFocus
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
                        <Typography>{User_Agreement}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Подтвердить</Button>
                        <Button onClick={handleClick}>Отмена</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <ServerAnswerForm openAnswer={openAnswer} onClick={handleOpenAnswerForm} onClose={handleOpenAnswerForm} />
        </>
    );
}
export default RegistrationForm;