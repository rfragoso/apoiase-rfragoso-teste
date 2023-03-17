import React from 'react'
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



const theme = {
  ...preset,
}

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <MainTemplate>
          <PostsList posts={Seed} ></PostsList>
          <PostsList posts={SeedHistorico} ></PostsList>
        </MainTemplate>
    </ThemeProvider>
  )
}
