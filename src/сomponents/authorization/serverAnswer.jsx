import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { LocalStorageContext } from "../app/index";
import { useContext } from "react";

const ServerAnswerForm = ({ openAnswer, onClose }) => {
    const { message } = useContext(LocalStorageContext)

    return (
        <>
            <Dialog open={openAnswer} onClose={onClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>Регистрация</DialogTitle>
                <DialogContent>
                    <Typography>{!message.message ? "Регистрация прошла успешно" : message.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Ок</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default ServerAnswerForm