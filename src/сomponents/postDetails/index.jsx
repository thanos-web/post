import s from './styles.module.css';


function PostDetails( {name,pictures,currentUser={}}) {
    return(
        <>
       
        <div className={s.header}>
        <a href='#' className='button-back'>Назад</a>
        <h1 className={s.postTitle}>Пост</h1>
        
        </div>
        <div className={s.PostDetails}>
            
                <img src={pictures} alt ={`Изображение ${name}`}/>
               
               
            </div>

        
  
                
        </>
    )
}



export default PostDetails;


                