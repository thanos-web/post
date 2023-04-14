import api from '../utils/apiPosts';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../contexts/postsContext';
import { PostList } from '../сomponents/postList/postList';
import { NotFound } from '../сomponents/notFound/notFound';
import { Post } from '../сomponents/post/post';
import { Sort } from '../сomponents/sort';
import { Spinner } from '../сomponents/spinner';

import { isLiked } from '../utils/posts';

export const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const { handleLike } = useContext(PostsContext)

  function handlePostLike(post) {
      handleLike(post).then(updatePost => {
        setPost(updatePost)
      });
  }

  useEffect(() => {
    setIsLoading(true)
    api.getI
  }
  ) 

}
