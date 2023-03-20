import axios from 'axios';

export async function createPost(title, body, publishDate, actionMode) {
  return await axios({
    method: 'post',
    url: 'http://localhost:3333/content/',
    data: {
      title, body, publishDate, actionMode,
    },
  });
}

export async function getPostList() {
  return await axios({
    method: 'get',
    url: 'http://localhost:3333/content/',
  });
}

export async function getPostedPostList() {
  return await axios({
    method: 'get',
    url: 'http://localhost:3333/content/posted/',
  });
}

export async function editPost(id, title, body, publishDate) {
  console.log('editPost');
  console.log(title);
  console.log(body);
  return await axios({
    method: 'put',
    url: `http://localhost:3333/content/${id}`,
    data: { title, body, publishDate },
  });
}

export async function deletePost(id) {
  // console.log("deletePost")
  return await axios({
    method: 'delete',
    url: `http://localhost:3333/content/${id}`,
  });
}
