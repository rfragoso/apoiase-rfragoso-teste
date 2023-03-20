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

  // Extrair a chamada do axios para uma função
  // Criar o onDeletePostCallback e nele chamar a função do axios
  // passar o callback como parametro de postlist e repassar para o post
  // ao clicar no delete executar o delete e ao final chamar o callback

  async function loadPosts() {
    const postList = await getPostList();
    setPosts(postList.data);

    const postedPostList = await getPostedPostList();
    setPostedPosts(postedPostList.data);
  }
  function onDeletePostCallback() {
    loadPosts();
  }
  // loadPosts();
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
