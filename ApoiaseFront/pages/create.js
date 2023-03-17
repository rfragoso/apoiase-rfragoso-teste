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
import SchedulePostForm from '../components/SchedulePostForm';
import { Container, Title } from '../components/style/sharedstyles';


const theme = {
  ...preset,
}


export default function Create() {
    return (<ThemeProvider theme={theme}>
        <GlobalStyle />
            <MainTemplate>
                <Container>
                  <Box px={6}>
                    <Title>Postar no mural da campanha!</Title>
                  </Box>
                  
                </Container>
                <SchedulePostForm isDateReadOnly={false} isEdit={false}></SchedulePostForm>
            </MainTemplate>
      </ThemeProvider>)
}
