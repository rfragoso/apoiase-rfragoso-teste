const express = require('express')
const { PrismaClient } = require('@prisma/client')
const app = express()
app.use(express.json())
const port = 3000

const prisma = new PrismaClient()


// aqui é o express e a implementação do crud da API
app.post(`/content`, async (req, res) => {
  let { title, body, publishDate } = req.body;

  /*
  só cadastra se:
  não tiver 3 posts com data de publicação futura
  for para mais de daqui a 5 minutos

  se não, retorna o erro que aconteceu
  */
  

  
  publishDate = new Date(publishDate);
  const content = await prisma.content.create({
    data: {
      title,
      body,
      publishDate,
    },
  })
  res.json(content)
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
  


  const d1 = new Date(2017, 2, 11, 11, 30);
  console.log(d1.toString());

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