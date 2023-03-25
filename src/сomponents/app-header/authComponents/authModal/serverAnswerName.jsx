import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { LocalStorageContext } from "../../../../App";
import { useContext } from "react";

const ServerAnswerForm = ({ openAnswer, onClose }) => {
    const { message } = useContext(LocalStorageContext)

    return (
        <>
            <Dialog open={openAnswer} onClose={onClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>Регистрация</DialogTitle>
                <DialogContent>
                    <Typography>{!message.message ? "Регистрация завершена успешно" : message.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Ок</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default ServerAnswerForm