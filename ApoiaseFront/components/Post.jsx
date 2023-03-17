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

export default function Post({ post }) {
  const handleEdit = () => {
    // Aqui você pode fazer algo com o objeto post, como navegar para a página de edição do post
  };

  function onDelete(params) {
    console.log(params)
  }
  return (
        <Card 
        width={1/2}
        mb={2}
        >
            <p>{post.id}</p>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>{post.publishDate}</p>
            <Link variant='nav' href={'/edit/' + post.id}>Editar</Link>
            <Button onClick={e => onDelete(e.target.value) } value={post.id}>Deletar</Button>
            <i onClick={e => onDelete(e.target.value) } value={post.id}><BsFillTrash3Fill /></i>
        </Card>
    
  );
}
