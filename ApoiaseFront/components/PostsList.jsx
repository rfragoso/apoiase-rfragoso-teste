import React from 'react';
import Post from './Post';
import { Container } from './style/sharedstyles';

export default function PostsList({ posts, onEdit, onDeletePostCallback }) {
    
    return (
        <Container>
        {posts.map((post) => (
            <Post key={post.id} post={post} onDeletePostCallback={onDeletePostCallback} />
        ))}
        </Container>
      
    );
  }