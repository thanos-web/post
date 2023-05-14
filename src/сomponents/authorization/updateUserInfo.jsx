import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { RiseLoader } from "react-spinners";
import s from '../authorization/authorize.module.css';

const UpdateUserInfo = ({ openForm, needUpdate, setOpenForm }) => {
  const handleClose = () => {
    setOpenForm(!openForm)
  }
  return (
    <>
        <Dialog open={openForm} onClose={handleClose}>
          <DialogTitle sx={{ textAlign: 'center' }}>Обновление данных пользователя</DialogTitle>
          <DialogContent>
            <Typography sx={{ textAlign: 'center' }}>{ needUpdate ? 'Нет данных для обновления!' : 'Данные успешно обновлены!'}</Typography>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose}>Отлично!</Button>
          </DialogActions>
          {(!needUpdate && openForm) && <RiseLoader className={s.RiseLoaderWrapperStyled} color="#007ab8" width={250} height={250}/>}
        </Dialog>
    </>
  )
}

export default UpdateUserInfo

