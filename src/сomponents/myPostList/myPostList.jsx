import {Grid, Typography} from '@mui/material';
import Post from '../post/post';
import { useContext, useEffect } from 'react';
import { getPostList } from '../../utils/apiPosts';
import { LocalStorageContext } from '../app/index';
import { About } from '../about/about';

export function MyPostList() {
  const { userInfoData, myPosts, setMyPosts } = useContext(LocalStorageContext);

  useEffect(() => {
    async function Posts() {
      const posts = await getPostList()
      const idSort = posts.filter((el) => el.author?._Id === userInfoData?._Id)
      setMyPosts(idSort)
    }

    void Posts()
  }, [userInfoData, setMyPosts])

  return (
    <Grid container spacing={{xs: 2, sm: 2, md: 3}} sx={{justifyContent: 'center'}} columns={{xs: 4, sm: 8, md: 12}}>
      <About/>
      {!!myPosts.length ? myPosts.map((post, index) => (
        <Grid item key={index} xs={12} sm={4} md={4}>
          <Post post={post}/>
        </Grid>
      )) : <Typography variant='h2'> У вас ещё нет постов</Typography>}
    </Grid>
  );
}