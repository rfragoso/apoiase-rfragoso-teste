const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const contentData = [
  {
    title: 'titulo 1',
    body: "<h1>Olá, mundo!</h1> siga o teste 1",
    publishDate: new Date("2020-03-19T14:21:00+0200") 
  },
  {
    title: 'titulo 2',
    body: "<h1>Olá, mundo!</h1> siga o teste 2",
    publishDate: new Date("2020-03-19T14:21:00+0200")   
  },
  {
    title: 'titulo 3',
    body: "<h1>Olá, mundo!</h1> siga o teste 3",
    publishDate: new Date("2020-03-19T14:21:00+0200")    
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const c of contentData) {
    const content = await prisma.content.create({
      data: c,
    })
    console.log(`Created content with id: ${content.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
