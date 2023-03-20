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
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
} from '@rebass/forms';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Home.module.css';
import MainTemplate from '../../templates/MainTemplate';
import GlobalStyle from '../../components/style/globalstyles';
import { Seed } from '../../seed';
import { Container, Title } from '../../components/style/sharedstyles';
import Post from '../../components/Post';
import SchedulePostForm from '../../components/SchedulePostForm';

const theme = {
  ...preset,
};

export default function Detail() {
  const router = useRouter();
  const { contentId } = router.query;
  // console.log("contentId: " + contentId);
  // loadPostDetail(contentId);
  const [post, setPost] = useState();

  useEffect(() => {
    loadPostDetail(contentId);
  }, []);

  /* axios.get("http://localhost:3333/content/" + contentId)
      .then((response) => {
        console.log(response.data)
        setPost(response.data)
      })
    .catch((err) => {
      console.error("erro")
    }); */

  function loadPostDetail(loadcontentId) {
    axios.get(`http://localhost:3333/content/${loadcontentId}`)
      .then((response) => {
        // console.log(response.data)
        setPost(response.data);
      });
  }

  if (post != null) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainTemplate>
          <Container>
            <Box px={6}>
              <Title>Editar post do mural</Title>
            </Box>

          </Container>
          <SchedulePostForm isDateReadOnly isEdit post={post} />
        </MainTemplate>
      </ThemeProvider>
    );
  }
  return (<div>Vazio</div>);
}
