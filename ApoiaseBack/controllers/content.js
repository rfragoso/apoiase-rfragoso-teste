const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const moment = require('moment')

function checkIfIsValidPublishDate(publishDate, actionMode){
  const diffMinutes = moment(publishDate).diff(moment(), "minutes")
  return diffMinutes >= 5 || actionMode == "post-now"
}
async function checkIfIsLessThanThree(actionMode){
  date = moment(new Date() ).toDate()
  count = await prisma.content.count({
    where: {
        publishDate: { gt: date}
    }
    });
    return (count < 3);
}


const create = async (req, res) => {
    let { title, body, publishDate, actionMode } = req.body;
    publishDate = moment(publishDate);    
    
    const isValidPublishDate = checkIfIsValidPublishDate(publishDate, actionMode);
    const isLessThanThree = await checkIfIsLessThanThree(actionMode);
   
    if(!isValidPublishDate){
        return res.json({ error: "Por favor, selecione um horário pelo menos 5 minutos no futuro." });
    }
    if(!isLessThanThree && actionMode == "post-future"){
      return res.json({ error: "É permitido agendar somente 3 postagens." });  
    }
    
    publishDate = publishDate.format();
    const content = await prisma.content.create({
        data: {
            title,
            body,
            publishDate,
        },
    })
    res.json(content)
}

const edit = async (req, res) => {
    const { id } = req.params
    let { title, body, publishDate } = req.body;
    try {    
        const updatedContent = await prisma.content.update({
        where: { id },
        data: { title, body, publishDate: new Date(publishDate) },
        })
        res.json(updatedContent)
    } catch (error) {
        if (error.message === 'NOTFOUND') res.status(404).json({ error: 'content not found' })
    }
}

const getPending = async(req, res) => {
  contents = await prisma.content.findMany({
      where: {
        publishDate: { gt: new Date() }
      }
    }
  )
  res.send(contents)
}

const getPosted = async(req, res) => {
  contents = await prisma.content.findMany({
      where: {
        publishDate: { lt: new Date() }
      }
    }
  )
  res.send(contents)
}

const getUnique = async(req, res) => {
  const { id } = req.params
  content = await prisma.content.findUnique({
    where: {
      id: id,
    },
  })
  res.send(content)
}

const deletePost = async (req, res) => {
    const { id } = req.params
    const content = await prisma.content.delete({
      where: {
        id: id,
      },
    })
    res.json(content)
}

module.exports = {
    create, edit, getPending, getPosted, getUnique, deletePost
}