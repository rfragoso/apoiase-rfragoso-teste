import axios from "axios";

export function createPost(title, body, publishDate)
{
    console.log("createPost")
    console.log(title)
    console.log(body)
    console.log(publishDate)
    axios({
        method: 'post',
        url: 'http://localhost:3333/content/',
        data: {"title": title, "body": body, "publishDate" : publishDate }
    }).then(function (response) {
        alert(response.data);
    });
}

export function getPostList(){
    axios({
        method: 'get',
        url: 'http://localhost:3333/content/',
        /*responseType: 'stream',
        data: {}*/
      })
        .then(function (response) {
          //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
          response => response.data;
        });
}

export function editPost(id, title, body, publishDate)
{
    console.log("editPost")
    console.log(title)
    console.log(body)
    axios({
        method: 'put',
        url: 'http://localhost:3333/content/' + id,
        data: {"title": title, "body": body, "publishDate" : publishDate }
    }).then(function (response) {
        alert(response.data);
    });
}

export function deletePost(id)
{
    console.log("deletePost")
    axios({
        method: 'delete',
        url: 'http://localhost:3333/content/' + id
    }).then(function (response) {
        alert(response.data);
    });
}