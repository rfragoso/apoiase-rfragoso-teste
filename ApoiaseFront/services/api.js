import axios from 'axios';

export async function createPost(title, body, publishDate, actionMode) {
  return axios({
    method: 'post',
    url: 'http://localhost:3333/content/',
    data: {
      title, body, publishDate, actionMode,
    },
  });
}

export async function getPostList() {
  return axios({
    method: 'get',
    url: 'http://localhost:3333/content/',
  });
}

export async function getPostedPostList() {
  return axios({
    method: 'get',
    url: 'http://localhost:3333/content/posted/',
  });
}

export async function getUniquePost(loadcontentId) {
  return axios({
    method: 'get',
    url: `http://localhost:3333/content/${loadcontentId}`,
  });
}

export async function editPost(id, title, body, publishDate) {
  return axios({
    method: 'put',
    url: `http://localhost:3333/content/${id}`,
    data: { title, body, publishDate },
  });
}

export async function deletePost(id) {
  return axios({
    method: 'delete',
    url: `http://localhost:3333/content/${id}`,
  });
}
