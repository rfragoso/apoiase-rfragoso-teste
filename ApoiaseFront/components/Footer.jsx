import React from 'react'
import { Box, Flex, Image } from 'rebass/styled-components';
import { Container } from './style/sharedstyles';

export default function Footer() {
  return (
    <Flex px={2} bg='#394447' alignItems='center'>
      <Container>
        <Flex justifyContent='center'>
          <Box 
            p={3} 
            width={1/2}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
            <Image src="/logo-apoiase-branca.png"
              sx={{
                width: [ '100%', '50%' ],
                justifyContent: 'center',
                textAlign: 'center'
              }}
            />
          </Box>
        </Flex>
      </Container>
    </Flex>
  )
}