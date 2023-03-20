import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import preset from '@rebass/preset';
import { ThemeProvider } from 'styled-components';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link,
  Image,
  Card,
} from 'rebass/styled-components';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import MainTemplate from '../templates/MainTemplate';
import GlobalStyle from '../components/style/globalstyles';
import SharedStyle from '../components/style/sharedstyles';
import PostsList from '../components/PostsList';
import { Seed, SeedHistorico } from '../seed';
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

  function onDeletePostCallback() {
    console.log('onDeletePostCallback');
    loadPosts();
  }
  async function loadPosts() {
    try {
      const postList = await getPostList();
      setPosts(postList.data);

      const postedPostList = await getPostedPostList();
      setPostedPosts(postedPostList.data);
    } catch (error) {
      console.error('erro');
    }
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
