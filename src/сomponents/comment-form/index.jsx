import { useForm } from 'react-hook-form';
import s from "./styles.module.css";

export function FormComment({postId, handleCreateComment })  {

    const { register, handleSubmit, formState: { errors}, reset } = useForm({ mode: "onBlur" })

    const cbSubmitForm = (dataForm) => {
        handleCreateComment(postId, dataForm);
        reset();

    }

    return (
        <form className={s.form} onSubmit={handleSubmit(cbSubmitForm)}>
            {/* handleSubmit  подставит данные в dataform, имеет доступ к стейту формы */}

            <h3>Создать комментарий к посту</h3>
            {errors?.title && <p className={s.errorMessage}>{errors?.title?.message}</p>}
            <textarea
                {...register('text', {
                    required: false,
                })}
                type="textarea"
                placeholder="Напишите комментарий"


            />
            <div className={s.buttons}>
            <button>Добавить комментарий</button>
            </div>

        </form>
    );
}

