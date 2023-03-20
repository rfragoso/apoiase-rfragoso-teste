import React from 'react';
import Head from 'next/head';
import preset from '@rebass/preset';
import { ThemeProvider } from 'styled-components';
import { Box } from 'rebass/styled-components';
import styles from '../styles/Home.module.css';
import MainTemplate from '../templates/MainTemplate';
import GlobalStyle from '../components/style/globalstyles';
import SchedulePostForm from '../components/SchedulePostForm';
import { Container, Title } from '../components/style/sharedstyles';

const theme = {
  ...preset,
};

export default function Create() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainTemplate>
        <Container>
          <Box px={6} sx={{ fontFamily: 'PT Sans' }}>
            <Title>Postar no mural da campanha!</Title>
          </Box>
        </Container>
        <SchedulePostForm isDateReadOnly={false} isEdit={false} />
      </MainTemplate>
    </ThemeProvider>
  );
}
