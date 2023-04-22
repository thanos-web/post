import { NotFound } from '../../сomponents/not-found'
import s from "./styles.module.css";

export function NotFoundPage() {
    return (
        <div className={s. NotFoundPage}>
        <NotFound title="Страница не найдена" buttonText="На главную" />
        </div>
    )

}
