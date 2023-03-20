import React from 'react';
import Post from './Post';
import { Container } from './style/sharedstyles';

export default function PostsList({
  title, posts, onDeletePostCallback,
}) {
  return (
    <Container>
      <h2>{title}</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} onDeletePostCallback={onDeletePostCallback} />
      ))}
    </Container>

  );
}
