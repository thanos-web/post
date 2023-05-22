import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { PostDetails } from '../../сomponents/post-details';
import { Spinner } from '../../сomponents/spinner';
import { NotFound } from '../../сomponents/not-found';
import { PostsContext } from '../../contexts/posts-context';

export const PostPage = () => {

    const { postID } = useParams()
    const [postDetails, setPostDetails] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsloading] = useState(false)
    const [errorState, setErrorState] = useState(null)
    const { handleLike } = useContext(PostsContext);


    function handlePostLike(post) {
        handleLike(post).then(updatePost => {
            setPostDetails(updatePost)
        })
    }

    function handleCreateComment(_id, data) {
        api.createPostComment(_id, data)
            .then((postData) => {
                setPostDetails(postData)
            })
    }

    function handleDeleteComment(postId, commentId) {
        api.deletePostComment(postId, commentId)
        .then((updatedPost) => {
            setPostDetails(updatedPost)

        })
    }
    
    useEffect(() => {
        setIsloading(true)
        api.getInfoPost(postID)
            .then(([postData, userData]) => {
                setCurrentUser(userData);
                setPostDetails(postData);
                
            })
            .catch((err) => {
                setErrorState(err)
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
                : !errorState && <PostDetails
                    {...postDetails}
                    currentUser={currentUser}
                    onPostLike={handlePostLike}
                    handleCreateComment={handleCreateComment}
                    handleDeleteComment={handleDeleteComment}                                

                />
            }
            {!isLoading && errorState && <NotFound title="Пост не найден" />}
        </>
    )
}