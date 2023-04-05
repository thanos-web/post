import s from './styles.module.css';



export const About = () => {
    return (
        <>
            <h1>Блог</h1>
            <div className={s.about}>
                <div className={s.imageAbout}></div>
                <div className={s.textAbout}>
                    <h2>Мега интересный блог про всякую интересную фигню</h2>
                    <p> Тут ты можешь постить свою любимую фигню, читать фигню единомышленников и ставить лайки</p>
                </div>

            </div>
        </>

    )
}