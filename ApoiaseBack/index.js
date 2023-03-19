const express = require('express')
const moment = require('moment')
const { PrismaClient } = require('@prisma/client')
const app = express()

var cors = require('cors');
app.use(cors());

app.use(express.json())
const port = 3333

const prisma = new PrismaClient()


// aqui é o express e a implementação do crud da API
app.post(`/content`, async (req, res) => {
  let { title, body, publishDate } = req.body;
  console.log("publishDate: " + publishDate)
  publishDate = moment(publishDate);
  
  const isValidPublishDate = checkIfIsValidPublishDate(publishDate);
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
})


app.put('/content/:id', async (req, res) => {
  const { id } = req.params
  let { title, body, publishDate } = req.body;
 
  
  /*
  só cadastra se:
  não tiver 3 posts com data de publicação futura
  for para mais de daqui a 5 minutos

  se não, retorna o erro que aconteceu
  */
  


  try {    
    console.log("antes")
    const updatedContent = await prisma.content.update({
      where: { id: id },
      data: { title: title, body: body, publishDate: new Date(publishDate) },
    })
    console.log("depois")
    res.json(updatedContent)
  } catch (error) {
    res.json({ error: error })
  }
})


app.get('/content', async(req, res) => {
contents = await prisma.content.findMany()
res.send(contents)
})

app.get('/content/:id', async(req, res) => {
  const { id } = req.params
  content = await prisma.content.findUnique({
    where: {
      id: id,
    },
  })
  res.send(content)
  })

app.delete(`/content/:id`, async (req, res) => {
    const { id } = req.params
    const content = await prisma.content.delete({
      where: {
        id: id,
      },
    })
    res.json(content)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function checkIfIsValidPublishDate(publishDate)
{
  console.log("publishDate:" + moment(publishDate))
  const diffMinutes = moment(publishDate).diff(moment(), "minutes")
  console.log("diffMinutes:" + diffMinutes)
  if(diffMinutes >= 5)
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
}
