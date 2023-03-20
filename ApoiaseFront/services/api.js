import axios from "axios";

export async function createPost(title, body, publishDate, actionMode)
{
    console.log("createPost")
    console.log(title)
    console.log(body)
    console.log(publishDate)
    return await axios({
        method: 'post',
        url: 'http://localhost:3333/content/',
        data: {"title": title, "body": body, "publishDate" : publishDate, "actionMode": actionMode }
    })
    /*
    .then(function (response) {
        //alert(response.data);
    });
    */
}

export async function getPostList(){
    return await axios({
        method: 'get',
        url: 'http://localhost:3333/content/',
      })
      /*
        .then(function (response) {
          //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
          response => response.data;
        });*/
}

export async function editPost(id, title, body, publishDate)
{
    console.log("editPost")
    console.log(title)
    console.log(body)
    return await axios({
        method: 'put',
        url: 'http://localhost:3333/content/' + id,
        data: {"title": title, "body": body, "publishDate" : publishDate }
    })
}

export async function deletePost(id)
{
    //console.log("deletePost")
    return await axios({
        method: 'delete',
        url: 'http://localhost:3333/content/' + id
    })
}