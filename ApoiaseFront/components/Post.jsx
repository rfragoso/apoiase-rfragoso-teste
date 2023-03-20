import React from 'react';
import Link from 'next/link';
import { BsFillTrash3Fill } from 'react-icons/bs';
import {
  Box, Flex, Button, Card,
} from 'rebass/styled-components';
import Datetime from 'react-datetime';
import moment from 'moment';
import {
  H2, H3, P1, EditLink,
} from './style/sharedstyles';
import { deletePost } from '../services/api';

async function onDelete(params, onDeletePostCallback) {
  console.log(`onDelete:${params}`);
  await deletePost(params);
  onDeletePostCallback();
}

export default function Post({ post, onDeletePostCallback }) {
  return (
    <Card width={1 / 2} mb={4} p={3} sx={{ backgroundColor: '#fcfcfc' }}>
      <H2>{post.title}</H2>
      <H3>Post Id</H3>
      <P1>{post.id}</P1>
      <H3>Conteúdo</H3>
      <P1>{post.body}</P1>
      <H3>Data e horário</H3>
      <P1>{moment(post.publishDate).format('DD/MM/YYYY hh:mm:ss')}</P1>
      <Flex mt={4}>
        <Box width={1 / 4}>
          <EditLink><Link variant="nav" href={`/edit/${post.id}`}>Editar</Link></EditLink>
        </Box>
        <Box
          width={3 / 4}
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button onClick={() => onDelete(post.id, onDeletePostCallback)} value={post.id}><i><BsFillTrash3Fill /></i></Button>
        </Box>
      </Flex>
    </Card>

  );
}
