import React from 'react';
import Link from 'next/link';
import { Box, Flex, Image } from 'rebass/styled-components';
import { Container } from './style/sharedstyles';

export default function Menu() {
  return (
    <Flex
      px={2}
      color="#555555"
      bg="#fbf6f3"
      alignItems="center"
    >
      <Container>
        <Flex>
          <Box p={3} width={1 / 2}>
            <Image
              src="/logo-apoiase.png"
              sx={{
                width: ['100%', '50%'],
              }}
            />
          </Box>
          <Box
            p={3}
            width={1 / 2}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: '1rem',
              alignItems: 'center',
              fontSize: '1.1rem',
            }}
          >
            <Link variant="nav" href="/">Home</Link>
            {' '}
            |
            <Link variant="nav" href="/create">Agendar postagem</Link>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
}
