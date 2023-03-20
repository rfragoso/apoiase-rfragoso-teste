import React, { useState, useEffect } from 'react';
import preset from '@rebass/preset';
import { ThemeProvider } from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import GlobalStyle from '../components/style/globalstyles';
import PostsList from '../components/PostsList';
import { getPostList, getPostedPostList } from '../services/api';

const theme = {
  ...preset,
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [postedPosts, setPostedPosts] = useState([]);

  async function loadPosts() {
    const postList = await getPostList();
    setPosts(postList.data);

    const postedPostList = await getPostedPostList();
    setPostedPosts(postedPostList.data);
  }
  function onDeletePostCallback() {
    loadPosts();
  }
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <MainTemplate>
          <PostsList key="pl-01" title="Posts agendados" posts={posts} onDeletePostCallback={onDeletePostCallback} />
          <PostsList key="pl-02" title="Posts realizados" posts={postedPosts} onDeletePostCallback={onDeletePostCallback} />

        </MainTemplate>
    </ThemeProvider>
  );
}
