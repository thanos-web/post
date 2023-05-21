import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { PostsContext } from '../../contexts/posts-context';
import { useNavigate } from "react-router-dom";
import s from "./styles.module.css";

function EditPostForm(props) {
    const { handleEditPost: handleEditPost} = useContext(PostsContext)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ mode: "onBlur" })
    const navigate = useNavigate()

    if (Object.keys(props).length > 0) {
      setValue('image', props.image);
      setValue('title', props.title);
      setValue('text', props.text);
    }


    const cbSubmitForm = (dataForm) => {
        handleEditPost(props._id,dataForm).then(navigate(`/postPage/${props._id}`));
    }

    return (
        <div className={s.formWrapper}>
        <form className={s.form} onSubmit={handleSubmit(cbSubmitForm)}>
            {/* handleSubmit  подставит данные в dataform, имеет доступ к стейту формы */}

            <h3>Редактирование поста</h3>
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
            <textarea
                {...register('text', {
                    required: true,
                    message: 'Обязательное поле'
                })}
                type="text"
                placeholder="Напишите подробно о посте"

            />
            <div className={s.buttons}>
            <button>Сохранить</button>
            <button className={s.buttonClose}>Отменить</button>
            </div>

        </form>
        </div>
    );
}

export default EditPostForm;