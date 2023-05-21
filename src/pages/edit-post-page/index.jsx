import { Button } from '@mui/material';
import {  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../../utils/api';
import EditPostForm from '../../сomponents/edit-post-form';
import s from './styles.module.css';


export const EditPostPage = () => {

    const navigate = useNavigate();
    const { postID } = useParams()
    const [postDetails, setPostDetails] = useState(null);
    const [errorState, setErrorState] = useState(null)

    useEffect(() => {
        api.getInfoPost(postID)
            .then(([postData]) => {
                setPostDetails(postData)
            })
            .catch((err) => {
                setErrorState(err)
                console.log('Ошибка на стороне сервера');
            })
    }, [])

    return (
        <>
            <div className={s.wrapper}>
                <Button variant="outlined" href="#outlined-buttons" sx={{ marginTop: '20px' }} onClick={() => navigate(-1)}>
                    Назад
                </Button>
                <EditPostForm {...postDetails} />
            </div>

        </>
    )
}