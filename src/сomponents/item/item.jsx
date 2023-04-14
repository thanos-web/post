import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import "../item/styles.module.css";

export const Item = () => {
  const  [itemPost, setItemPost] = useState(null);
  const  [comments, setComments] = useState(null);
  const params = useParams();
  useEffect(()=>{
    api.getPosts(params.postId)
    .then(data=>setItemPost(data))
    .catch((err)=>(err))
    },[])

    useEffect(()=>{
      api.getComments(params.postId)
      .then(data=>setComments(data))
      .catch((err)=>(err))
      },[])


  return (
  <>
  {itemPost &&
    <div className='postCard'>
      <div className='topBlock'>
        <div>
        <div className='topBlock__left'>
          <div>Имя автора: <br />
            <h1>{itemPost.author.name}</h1>
          </div>
          <div>
            <img src={itemPost.image} style={{ bottom: 500, height: 75, width: 75 }}></img>
          </div>
        </div>
        <div className='topBlock__middle'>
          <div>{itemPost.title}</div>
          <div>{itemPost.text}</div>
        </div>
      </div>  
      <div className='topBlock__comment'>
        {comments?.map((el) => (
          <div key={el._id}>
            <img src={`${el.author.avatar}`} />
            <div>{el.author.name}</div>
            <div> {el.title}</div>
            <div>{el.text}</div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  </div>   
}
    
  </>
  )
}
    