
const express = require('express')
const moment = require('moment')
const { PrismaClient } = require('@prisma/client')
var cors = require('cors');
const {create, edit, getAll, getUnique, deletePost} = require ('./controllers/content')
const app = express()


app.use(cors());

app.use(express.json())
const port = 3333

const prisma = new PrismaClient()





app.post(`/content`, create)
// aqui é o express e a implementação do crud da API
/*app.post(`/content`, async (req, res) => {
  let { title, body, publishDate, actionMode } = req.body;
  console.log("publishDate: " + publishDate)
  publishDate = moment(publishDate);
  console.log("ActionMode: " + actionMode)
  console.log("Titulo: " + title)
  
  
  const isValidPublishDate = checkIfIsValidPublishDate(publishDate, actionMode);
  const isLessThanThree = await checkIfIsLessThanThree();

  let errMsg = "";
  if(!isValidPublishDate)
  {
    errMsg += "<p>Por favor, selecione um horário pelo menos 5 minutos no futuro.</p>"
  }
  if(!isLessThanThree)
  {
    errMsg += "<p>Não é possível agendar mais de 3 postagens.</p>"
  }

  if(isValidPublishDate && isLessThanThree){
  
  //console.log("diffMinutes: " + diffMinutes)
  publishDate = publishDate.format();
  //if(diffMinutes >= 5){
  const content = await prisma.content.create({
    data: {
      title,
      body,
      publishDate,
    },
  })
  res.json(content)
  }else
  {res.json('"data" : {"erro":"'+errMsg+'"}')}
})*/

app.put('/content/:id', edit)
/*app.put('/content/:id', async (req, res) => {
  const { id } = req.params
  let { title, body, publishDate } = req.body;
  try {    
    console.log("antes")
    const updatedContent = await prisma.content.update({
      where: { id },
      data: { title, body, publishDate: new Date(publishDate) },
    })
    console.log("depois")
    res.json(updatedContent)
  } catch (error) {
    //res.json({ error: error })
    //res.status(404).json({ error: 'Content not found' })
    if (error.message === 'NOTFOUND') res.status(404).json({ error: 'content not found' })
  }
})*/

app.get('/content', getAll)
/*app.get('/content', async(req, res) => {
contents = await prisma.content.findMany()
res.send(contents)
})*/

app.get('/content/:id', getUnique)
/*app.get('/content/:id', async(req, res) => {
  const { id } = req.params
  content = await prisma.content.findUnique({
    where: {
      id: id,
    },
  })
  res.send(content)
  })*/

app.delete('/content/:id', deletePost)
/*app.delete(`/content/:id`, async (req, res) => {
    const { id } = req.params
    const content = await prisma.content.delete({
      where: {
        id: id,
      },
    })
    res.json(content)
})*/


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/*function checkIfIsValidPublishDate(publishDate, actionMode)
{
  console.log("publishDate:" + moment(publishDate))
  const diffMinutes = moment(publishDate).diff(moment(), "minutes")
  console.log("diffMinutes:" + diffMinutes)
  if(diffMinutes >= 5 || actionMode == "postar-agora")
    {
      return true;
    }
    else
    {
      return false;
    }
}


async function checkIfIsLessThanThree()
{
  count = await prisma.content.count();
  console.log(count);
  if(count < 3)
  {return true;}
  else{return false;}
}*/
