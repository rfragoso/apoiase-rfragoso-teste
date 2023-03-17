import React from 'react';
import Post from './Post';
import { Container } from './style/sharedstyles';

export default function PostsList({ posts, onEdit, onDelete }) {
    return (
        <Container>
        {posts.map((post) => (
            <Post key={post.id} post={post} />
        ))}
        </Container>
      
    );
  }