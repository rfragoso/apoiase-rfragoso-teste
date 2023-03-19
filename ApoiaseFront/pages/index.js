import React, { useState, useEffect} from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MainTemplate from '../templates/MainTemplate';
import preset from '@rebass/preset'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../components/style/globalstyles'
import SharedStyle from '../components/style/sharedstyles'
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link,
  Image,
  Card,
} from 'rebass/styled-components'
import PostsList from '../components/PostsList';
import { Seed, SeedHistorico } from '../seed';
import axios from "axios";

const theme = {
  ...preset,
}

export default function Home() {
  const [ posts, setPosts ] = useState([]);
//Extrair a chamada do axios para uma função 
// Criar o onDeletePostCallback e nele chamar a função do axios 
// passar o callback como parametro de postlist e repassar para o post 
// ao clicar no delete executar o delete e ao final chamar o callback

function onDeletePostCallback(){
  console.log("onDeletePostCallback");
  loadPosts();
}
function loadPosts(){
  axios.get("http://localhost:3333/content/")
      .then((response) => {
        console.log(response.data)
        setPosts(response.data)
      })
    .catch((err) => {
      console.error("erro")
    });
}
  //loadPosts();
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <MainTemplate>
          <PostsList key="pl-01" posts={posts} onDeletePostCallback={onDeletePostCallback} ></PostsList>
          
        </MainTemplate>
    </ThemeProvider>
  )
}
