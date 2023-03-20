import React, { useState, useEffect } from 'react';
/*import Head from 'next/head';*/
import preset from '@rebass/preset';
import { ThemeProvider } from 'styled-components';
import { Box } from 'rebass/styled-components';
import { useRouter } from 'next/router';
import MainTemplate from '../../templates/MainTemplate';
import GlobalStyle from '../../components/style/globalstyles';
import { Container, Title } from '../../components/style/sharedstyles';
import SchedulePostForm from '../../components/SchedulePostForm';
import { getUniquePost } from '../../services/api';

const theme = {
  ...preset,
};

export default function Detail() {
  const router = useRouter();
  const { contentId } = router.query;
  const [post, setPost] = useState();

  useEffect(() => {
    loadPostDetail(contentId);
  }, []);

  async function loadPostDetail(loadcontentId) {
    const postEdit = await getUniquePost(loadcontentId);
    setPost(postEdit.data);
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
  return (
    <div>Post não encontrado </div>
    );
}
