import React from 'react';
import preset from '@rebass/preset';
import { ThemeProvider } from 'styled-components';
import { Box } from 'rebass/styled-components';
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
          <Box px={6}>
            <Title>Postar no mural da campanha!</Title>
          </Box>
        </Container>
        <SchedulePostForm isEdit={false} />
      </MainTemplate>
    </ThemeProvider>
  );
}
