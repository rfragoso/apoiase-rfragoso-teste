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
import PostsList from '../components/PostsList';
import { Seed } from '../seed';
import api, { getPostList } from '../services/api';

const theme = {
  ...preset,
};

export default function List() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3333/content/')
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((err) => {
        console.error('erro');
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainTemplate>
        <PostsList posts={posts} />
      </MainTemplate>
    </ThemeProvider>
  );
}
