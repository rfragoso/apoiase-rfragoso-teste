import React from 'react'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MainTemplate from '../templates/MainTemplate';
import preset from '@rebass/preset'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../components/style/globalstyles'
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
import {Seed} from '../seed';

const theme = {
  ...preset,
}

/*const contents = [{ id: 'post-1', title: 'Titulo 1', body: 'conteudo 1', publishDate: '2023-03-16T13:07z' }, { id: 'post-2', title: 'Titulo 2', body: 'conteudo 2', publishDate: '2023-03-16T13:07z' }, { id: 'post-3', title: 'Titulo 3', body: 'conteudo 3', publishDate: '2023-03-16T13:07z' }]*/



export default function List() {
    return (<ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainTemplate>
          <PostsList posts={Seed} ></PostsList>
        </MainTemplate>
      </ThemeProvider>)
}
