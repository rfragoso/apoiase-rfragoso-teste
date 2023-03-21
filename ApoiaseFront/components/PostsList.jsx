import React from 'react';
import Post from './Post';
import { Container, Title } from './style/sharedstyles';

export default function PostsList({
  title, posts, onDeletePostCallback,
}) {
  return (
    <Container>
      <Title>{title}</Title>
      {posts.map((post) => (
        <Post key={post.id} post={post} onDeletePostCallback={onDeletePostCallback} />
      ))}
    </Container>
  );
}
