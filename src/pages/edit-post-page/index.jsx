import { Button } from '@mui/material';
import {  useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PostsContext } from '../../contexts/posts-context';
import api from '../../utils/api';
import EditPostForm from '../../сomponents/edit-post-form';
import s from './styles.module.css';


export const EditPostPage = () => {

    const navigate = useNavigate();
    const { postID } = useParams()
    const [postDetails, setPostDetails] = useState(null);
    const [errorState, setErrorState] = useState(null)
    const { handleUpdatedPost } = useContext(PostsContext);

    function handleEditPostById(postId, data) {
        return api.editPostbyId(postId, data)
            .then((updatePost) => {
                setPostDetails(updatePost)
                handleUpdatedPost(updatePost)
                return updatePost;
            })
    }

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
                <Button variant="outlined" href="#outlined-buttons" sx={{ marginTop: '20px' }} onClick={() => navigate(`/postPage/${postID}`)}>
                    Назад
                </Button>
                <EditPostForm
                 {...postDetails}
                 handleEditPost={handleEditPostById}
                />
            </div>

        </>
    )
}