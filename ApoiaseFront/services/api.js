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