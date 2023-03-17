import React from 'react'
import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Card,
} from 'rebass/styled-components';
import { Container } from './style/sharedstyles';

export default function Menu() {
    return (
    <Flex
      px={2}
      color='white'
      bg='#eb4a3b'
      alignItems='center'>
      <Container>
        <Flex>
          <Box p={3} width={1/2}>
            <Text fontWeight='bold'>Rebass</Text>
          </Box>
          <Box p={3} width={1/2}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: '1rem'
            }}>
            <Link variant='nav' href='/'>Home</Link> | 
            <Link variant='nav' href='/create'>Create</Link> | 
            <Link variant='nav' href='/list'>List</Link> | 
          </Box>
        </Flex>
      </Container>
    </Flex>
    )
  }
