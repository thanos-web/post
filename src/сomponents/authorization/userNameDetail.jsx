import { useContext, useState } from 'react';
import { Button, CircularProgress, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LocalStorageContext } from '../app/index';
import { User_Pattern } from '../../constants/constants';
import { getUserInfo, changeUserInfo, changeUserAvatar } from '../../utils/apiPosts';
import UpdateUserInfo from '../authorization/updateUserInfo';

const UserInfoDetail = ({ open, onClose, onClick }) => {
  const { setUserInfoData, handleFirstRender } = useContext(LocalStorageContext)
  const { register, handleSubmit, reset, formState: { isLoading, errors, defaultValues }, getValues } = useForm({
      defaultValues: async () => {
          const userDefaultValues = await getUserInfo()
          setUserInfoData(userDefaultValues)
          return userDefaultValues
    }
  });
  const [openForm, setOpenForm] = useState(false)
  const [needUpdate, setNeedUpdate] = useState(false)
  const avatar = getValues('avatar')

  const onSubmit = (data) => {
      const { about, name, avatar } = data
      if (defaultValues.avatar !== data.avatar) {
          changeUserAvatar({ avatar })
          reset(data)
      }
      if (defaultValues.about !== data.about || defaultValues.name !== data.name) {
          changeUserInfo({ about, name })
          reset(data)
      }
      setOpenForm(!openForm)
      setUserInfoData(data)
      setNeedUpdate(JSON.stringify(defaultValues) === JSON.stringify(getValues()))
      handleFirstRender()
  }
  
  return (
      <>
          <Dialog open={open} onClose={onClose}>
              <DialogTitle sx={{ textAlign: 'center' }}>Информация о пользователе</DialogTitle>
              <DialogContent>
                  {!isLoading ? 
                    (<>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <CardMedia
                              id='avatar'
                              component="img"
                              height="300"
                              image={avatar}
                              alt="user avatar"
                          />
                          <TextField
                              margin="dense"
                              id="email"
                              label="Электронная почта"
                              type="email"
                              fullWidth
                              variant="standard"
                              InputProps={{
                                  readOnly: true,
                              }}
                              {...register('email')}
                          />
                          <TextField
                              margin="dense"
                              id="name"
                              label="ФИО"
                              type="text"
                              fullWidth
                              error={!!errors.name}
                              helperText={errors?.name?.message}
                              {...register('name', User_Pattern)}
                          />
                          <TextField
                              id="about"
                              margin="dense"
                              label="Информация о вас"
                              multiline
                              fullWidth
                              rows={4}
                              error={!!errors.about}
                              helperText={errors?.about?.message}
                              {...register('about', User_Pattern)}
                          />
                          <TextField
                              margin="dense"
                              id="avatarLink"
                              label="Ссылка на аватар"
                              type="text"
                              multiline
                              fullWidth
                              rows={3}
                              error={!!errors.avatar}
                              helperText={errors?.avatar?.message}
                              {...register('avatar', User_Pattern)}
                          />
                          <DialogActions>
                              <Button type='submit'>Изменить</Button>
                              <Button onClick={onClick}>Закрыть</Button>
                          </DialogActions>  
                        </form>
                    </>) : (
                      <CircularProgress />)} 
              </DialogContent>
            </Dialog>
            <UpdateUserInfo
                openForm={openForm}
                setOpenForm={setOpenForm}
                needUpdate={needUpdate}
            />
         </>       
  );
}

export default UserInfoDetail