
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { PostsContext } from '../../contexts/post-context';
import api from '../../utils/api';
import s from "./styles.module.css";

function NewPostForm() {

    const {handleAddPost:addNewPost} = useContext(PostsContext)

    const { register, handleSubmit, formState } = useForm()
    

    const cbSubmitForm = (dataForm) => {
        addNewPost(dataForm)

    }

    return (
        <form className={s.form} onSubmit={handleSubmit(cbSubmitForm)}>
            {/* handleSubmit  подставит данные в dataform, имеет доступ к стейту формы */}

            <h3>Создание нового поста</h3>
            <input
                {...register('image', {
                    required: true
                })}
                type="text"
                placeholder="Вставьте URL изображения"

            />
            <input
                {...register('title', {
                    required: true
                })}
                type="text"
                placeholder="Напишите заголовок поста"

            />
            <input
                {...register('text', {
                    required: true
                })}
                type="textarea"
                placeholder="Напишите подробно о посте"


            />
            <button>Добавить пост</button>

        </form>
    );
}

export default NewPostForm;