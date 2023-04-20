import { useEffect, useState } from 'react';
import s from "./styles.module.css";
import { useForm } from 'react-hook-form';
import { Modal } from '@mui/material';
import api from '../../../utils/api';

function RegisterForm({ handleForm }) {
  
    

   const {register,handleSubmit,formState:{errors}}
 = useForm({ mode: "onBlur" })
 
    const cbSubmitForm= (dataForm) => {
      api.addPost(dataForm)
      
        console.log(errors)
        console.log(dataForm)
       
        }
        
    return (
    
   
       
        <form className={s.form} onSubmit={handleSubmit( cbSubmitForm)}>
            <h3>Новый пост</h3>
            <input
                 {...register("text", {
                    required: true,
                 })}
                type="text"
                placeholder="Заголовок поста"
                
            />
          
            <input
            {...register("image", {
                required: true,
                pattern: {
                  value:
                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                    
                },
              })}
             
              id="url"
              type="text"
              placeholder="картинка"
              
            />
             {errors?.image && <p className={s.errorMessage}>{errors.image.message}</p>}
              
            <input
             {...register("title", { required: true })}
             
             id="title"
             type="text"
             placeholder="текст поста"
                
            />
            <button>Редактировать</button>
            <button className={s.btn}>Создать</button>
            
        </form>
        
    );
}

export default RegisterForm;