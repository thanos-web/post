import React from 'react'
import Button from '@mui/material/Button';
import "./index.css"
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const handleClick = () =>{

  }


  const navigate = useNavigate()
  return (
    <div>
    <Button className='btn' type='submit' variant="contained" onClick={()=>{
      navigate("/posts/create")
    }}>
      Создать пост
        </Button>
        </div>
  )
}