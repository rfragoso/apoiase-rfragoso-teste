import React from 'react';
import Link from 'next/link';
import { BsFillTrash3Fill } from "react-icons/bs";
/*import DeletePostButton from './DeletePostButton';*/
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
import { deletePost } from '../services/api';
import Datetime from 'react-datetime';
import moment from 'moment';

export default function Post({ post, onDeletePostCallback }) {
  const handleEdit = () => {
    // Aqui você pode fazer algo com o objeto post, como navegar para a página de edição do post
  };

  function onDelete(params) {
    deletePost(params);
    onDeletePostCallback();
  }
  return (
        <Card 
        width={1/2}
        mb={2}
        >
            <p>{post.id}</p>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>{moment(post.publishDate).format('DD/MM/YYYY hh:mm:ss')}</p>
            <Link variant='nav' href={'/edit/' + post.id}>Editar</Link>
            <Button  onClick={() => onDelete(post.id) } value={post.id}><i><BsFillTrash3Fill /></i></Button>
            
        </Card>
    
  );
}
