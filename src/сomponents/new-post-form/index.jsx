
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ModalFormContext } from '../../contexts/header-context';
import { PostsContext } from '../../contexts/posts-context';
import imgPost from './new-post.png';
import CardMedia from '@mui/material/CardMedia'; 
import s from "./styles.module.css";

function NewPostForm() {

    const { handleAddPost: addNewPost } = useContext(PostsContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" })
    const {ChangeModalFormStatus} = useContext(ModalFormContext)


    const handleCloseModal = () => {
        ChangeModalFormStatus(false)
    };


    const cbSubmitForm = (dataForm) => {
        addNewPost(dataForm)
        reset();
    }

    return (
        <form className={s.form} onSubmit={handleSubmit(cbSubmitForm)}>
            {/* handleSubmit  подставит данные в dataform, имеет доступ к стейту формы */}

            <h3>Создание нового поста</h3>
            <CardMedia sx={{
                        objectFit: 'contain',
                        height: '256px'
                    }}
                        component="img"
                        image={imgPost}
                        alt="user avatar"
                    />
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
                {...register('tags', {
                    required: false,
                    message: 'Поле для тега (по желанию)',
                    minLength: {
                        value: 0,
                        message: "Минимальная длина поля не обозначена"    
                    }
                })}
                type="text"
                placeholder="Напишите теги через запятую"
                />
            {errors?.tags && <p className={s.errorMessage}>{errors?.tags?.message}</p>}
            <textarea
                {...register('text', {
                    required: true,
                    message: 'Обязательное поле'
                })}
                type="text"
                placeholder="Напишите подробно о посте"


            />
            <div className={s.buttons}>
            <button>Добавить пост</button>
            <button className={s.buttonClose} onClick={handleCloseModal}>Отменить</button>
            </div>

        </form>
    );
}

export default NewPostForm;