
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { PostsContext } from '../../contexts/post-context';
import api from '../../utils/api';
import s from "./styles.module.css";

function NewPostForm() {

    const { handleAddPost: addNewPost } = useContext(PostsContext)

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })


    const cbSubmitForm = (dataForm) => {
        addNewPost(dataForm)

    }

    return (
        <form className={s.form} onSubmit={handleSubmit(cbSubmitForm)}>
            {/* handleSubmit  подставит данные в dataform, имеет доступ к стейту формы */}

            <h3>Создание нового поста</h3>
            <input
                {...register('image', {
                    required: true,
                    message: 'Обязательное поле',
                    pattern: {
                        value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                        message:  "Поле \"image\" должно быть валидным url-адресом"
                    }
                })}
                type="text"
                placeholder="Вставьте ссылку на изображение"            
            />
            {errors?.image && <p className={s.errorMessage}>{errors?.image?.message}</p>}
            <input
                {...register('title', {
                    required: true,
                    message: 'Обязательное поле',
                    minLength: {
                        value: 2,
                        message: "Минимальная длина поля \"title\" - 2 символа"
                    }  
                })}
                type="text"
                placeholder="Напишите заголовок поста"
            />
            {errors?.title && <p className={s.errorMessage}>{errors?.title?.message}</p>}
            <input
                {...register('text', {
                    required: true,
                    message: 'Обязательное поле'
                })}
                type="textarea"
                placeholder="Напишите подробно о посте"


            />
            <button>Добавить пост</button>
        </form>
    );
}

export default NewPostForm;