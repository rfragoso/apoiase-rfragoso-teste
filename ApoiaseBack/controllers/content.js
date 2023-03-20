const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const moment = require('moment')

function checkIfIsValidPublishDate(publishDate, actionMode){
  console.log("publishDate:" + moment(publishDate))
  const diffMinutes = moment(publishDate).diff(moment(), "minutes")
  console.log("diffMinutes:" + diffMinutes)
  return diffMinutes >= 5 || actionMode == "postar-agora"
  /*if(diffMinutes >= 5 || actionMode == "postar-agora"){
      return true;
    }
    else{
      return false;
    }*/
}


async function checkIfIsLessThanThree(actionMode)
{
  count = await prisma.content.count({
    where: {
        publishDate: { gt: new Date() }
    }
    });
    console.log(count);
    
    return (count < 3 || actionMode == "postar-agora");
  
  /*if(count < 3)
  {return true;}
  else{return false;}*/
}


const create = async (req, res) => {
    let { title, body, publishDate, actionMode } = req.body;
    console.log("publishDate: " + publishDate)
    publishDate = moment(publishDate);
    console.log("ActionMode: " + actionMode)
    console.log("Titulo: " + title)
    
    
    const isValidPublishDate = checkIfIsValidPublishDate(publishDate, actionMode);
    const isLessThanThree = await checkIfIsLessThanThree(actionMode);
    console.log("isValidDate: " + isValidPublishDate)
    console.log("isLessThanThree: " + isLessThanThree)
    
    let errMsg = "";
    if(!isValidPublishDate){
        return res.json({ error: "Por favor, selecione um horário pelo menos 5 minutos no futuro." });
        //errMsg += "<p>Por favor, selecione um horário pelo menos 5 minutos no futuro.</p>"
    }
    if(!isLessThanThree){
        return res.json({ error: "É permitido agendar somente 3 postagens." });
        //errMsg += "<p>Não é possível agendar mais de 3 postagens.</p>"
    }
    
    /*if(isValidPublishDate && isLessThanThree){*/
        publishDate = publishDate.format();
        const content = await prisma.content.create({
            data: {
                title,
                body,
                publishDate,
            },
        })
        res.json(content)
    /*}else{
        res.json('"data" : {"erro":"'+errMsg+'"}')
    }*/
}

const edit = async (req, res) => {
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
}

const getAll = async(req, res) => {
    contents = await prisma.content.findMany()
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
    create, edit, getAll, getUnique, deletePost
}