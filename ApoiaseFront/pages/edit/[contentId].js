import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import MainTemplate from '../../templates/MainTemplate';
import preset from '@rebass/preset'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../../components/style/globalstyles'
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
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
} from '@rebass/forms';
import { useRouter } from 'next/router';
import {Seed} from '../../seed';
import {Container, Title} from '../../components/style/sharedstyles';
import Post from '../../components/Post';
import SchedulePostForm from '../../components/SchedulePostForm';

const theme = {
  ...preset,
}

export default function Detail() {
  const router = useRouter()
  const {contentId} = router.query
  let post = null
  for (let index = 0; index < Seed.length; index++) {
    const element = Seed[index];
    if(element.id == contentId){
      post = element
    }
  } 
  if(post != null){

  
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [publishDate, setPublishDate] = useState(post.publishDate);
  const isEditable = true;

    return (<ThemeProvider theme={theme}>
      <GlobalStyle />
          <MainTemplate>
              <Container>
                <Box px={6}>
                  <Title>Editar post do mural</Title>
                </Box>
                
              </Container>
              <SchedulePostForm isDateReadOnly={true} isEdit={true} post={post}></SchedulePostForm>
          </MainTemplate>
    </ThemeProvider>)
      }else{
        return(<div>Vazio</div>)
      }
}