import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { isLiked } from '../../utils/posts';
import { PostDetails } from '../../сomponents/post-details';
import { Spinner } from '../../сomponents/spinner';
import s from './styles.module.css';

// const ID_POST = '642ede00aa39712183b8789d'

export const PostPage = () => {

    const {postID} = useParams()
    console.log(postID)
    const [postDetails, setPostDetails] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsloading] = useState(false)

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id)
        api.changeLikePost(post._id, like)
            .then((updatePost) => {
                setPostDetails(updatePost)
            })
    }

    useEffect(() => {
        setIsloading(true)
        api.getInfoPost(postID)
            .then(([postData, userData]) => {
                setCurrentUser(userData);
                setPostDetails(postData)
            })
            .catch(() => {
                console.log('Ошибка на стороне сервера');
            })
            .finally(() => {
                setIsloading(false);
            })
    }, [])
    return (
        <>
            {isLoading
                ? <Spinner />
                : <PostDetails {...postDetails} currentUser={currentUser} onPostLike={handlePostLike} />
            }

        </>
    )
}