import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import api from '../utils/apiPosts';
import { isLiked } from '../utils/posts';
import { PostDetails } from '../сomponents/postDetails/postDetails';
import { Spinner } from '../сomponents/spinner/spinner';
import { NotFound } from '../сomponents/notFound/notFound';
import { PostsContext } from '../contexts/postContext';

// const ID_POST = '642ede00aa39712183b8789d'

dayjs.locale('ru');
dayjs.extend(relativeTime);

export const PostPage = () => {

    const {postID} = useParams()
    const [postDetails, setPostDetails] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsloading] = useState(false)
    const [errorState,setErrorState] =useState(null)
    const {handleLike} = useContext(PostsContext)


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
                :!errorState && <PostDetails {...postDetails} currentUser={currentUser} onPostLike={handlePostLike} />
            }
            {!isLoading && errorState && <NotFound title="Пост не найден"/>}
        </>
    )
}