import React, { useState, useEffect} from 'react';
import Post from './Post';
import { Container } from './style/sharedstyles';
import { getPostList } from '../services/api';

export default function PostsList({ posts, onEdit, onDeletePostCallback }) {
    
    return (
        <Container>
        {posts.map((post) => (
            <Post key={post.id} post={post} onDeletePostCallback={onDeletePostCallback} />
        ))}
        </Container>
      
    );
  }