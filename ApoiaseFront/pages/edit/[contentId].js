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
import {Container} from '../../components/style/sharedstyles';
import Post from '../../components/Post';

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
              <Box
                  as='form'
                  onSubmit={e => e.preventDefault()}
                  py={3}>
                  <Flex mx={-2} mb={3}>
                      <Box width={1} px={2}>
                          <Label htmlFor='title'>Título</Label>
                          <Input
                              type='text'
                              id='title'
                              name='title'
                              placeholder='Título'
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                          />
                      </Box>
                  </Flex>
                  <Flex mx={-2} mb={3}>
                      <Box width={1} px={2}>
                          <Label htmlFor='body'>Conteúdo</Label>
                          <Textarea
                              id='body'
                              name='body'
                              placeholder='Conteúdo'
                              value={body}
                              onChange={(e) => setBody(e.target.value)}
                          />
                      </Box>
                  </Flex>
                  <Flex mx={-2} mb={3}>
                      <Box width={1/4} px={2}>
                          <Label htmlFor='publishDate'>Data e hora</Label>
                          <Input
                              type='datetime-local'
                              id='publishDate'
                              name='publishDate'
                              value={publishDate}
                              onChange={(e) => setPublishDate(e.target.value)}
                              readOnly={!isEditable}
                          />
                      </Box>
                      <Box width={1/4} px={2} mt='auto'>
                          <Button type="submit">
                              Atualizar post
                          </Button>
                      </Box>
                  </Flex>
                  
              </Box>
          </Container>
        </MainTemplate>
      </ThemeProvider>)
      }else{
        return(<div>Vazio</div>)
      }
}