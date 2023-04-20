import { useState } from 'react';
import s from "./styles.module.css";

function postCreateForm({ handleForm }) {
  
    

   

    const handleSubmit = (evt) => {
        evt.preventDefault();
        
        }
    

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <h3>Создать пост</h3>
            <input
                type="text"
                name="name"
                placeholder="Имя"
               
            />
            <input
                type="Image"
                name="image"
                placeholder="картинка"
               
            />
            <input
                type="text"
                name="text"
                placeholder="текст"
               
            />

            <button>Редактировать</button>
        </form>
    );
}

export default postCreateForm;



// import { useEffect, useState } from 'react';
// import s from "./styles.module.css";
// import { useForm } from 'react-hook-form';

// function RegisterForm({ handleForm }) {
  
    

//    const {register,handleSubmit,formState:{errors}}
//  = useForm()
 
//     const cbSubmitForm= (dataForm) => {
//         console.log(errors)
//         console.log(dataForm)
       
//         }
    
//     return (
//         <form className={s.form} onSubmit={handleSubmit( cbSubmitForm)}>
//             <h3>Регистрация</h3>
//             <input
//                 {...register('name',{
//                     required: {
//                         value: true,
//                         message: 'Обязательное поле'
//                     },
//                     minLength: {
//                         value:3,
//                         message:'Минимальная длина имени 3 символа'
//                     }
//                 })}
//                 type="text"
//                 placeholder="Введите имя"
                
//             />
//             {errors?.name && <p className={s.errorMessage}>{errors?.name?.message}</p>}
//             <input
//              {...register('email',{
//                 required: true
//             })}
//                 type="email"
//                 placeholder="Введите email"
//                 autoComplete='off'
               
//             />
//             <input
//              {...register('password',{
//                 required: true,
//                 pattern: {
//                     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//                     message:'Пароль должен содержать минимум восемь символов,одну букву латинского алфавита и одну цифру'
//                 }
//             })}
//                 type="password"
//                 placeholder="Введите пароль"
//                 autoComplete='off'
               
//             />

//             <button>Зарегистрироваться</button>
//         </form>
//     );
// }

// export default RegisterForm;