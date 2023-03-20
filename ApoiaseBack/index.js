
const express = require('express')
const moment = require('moment')
const { PrismaClient } = require('@prisma/client')
var cors = require('cors');
const {create, edit, getPending, getPosted, getUnique, deletePost} = require ('./controllers/content')

const port = 3333
const app = express()

app.use(cors());
app.use(express.json())
const prisma = new PrismaClient()

app.post(`/content`, create)
app.put('/content/:id', edit)
app.get('/content', getPending)
app.get('/content/posted', getPosted)
app.get('/content/:id', getUnique)
app.delete('/content/:id', deletePost)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})