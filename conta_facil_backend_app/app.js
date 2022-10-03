import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: {
      id,
    },
  })
  res.json(user)
})

app.get('/user', async (req, res) => {
  const entities = await prisma.user.findMany();
  res.json(entities)
})

app.post('/user', async (req, res) => {
  const { userName, password } = req.body
  const entity = await prisma.user.create({
    data: {
      userName,
      password,
    },
  })
  res.json(entity)
})

app.get('/product', async (req, res) => {
  const entities = await prisma.product.findMany();
  res.json(entities)
})

app.post('/product', async (req, res) => {
  const { code, name } = req.body
  const entity = await prisma.product.create({
    data: {
      code,
      name,
    },
  })
  res.json(entity)
})

app.get('/company', async (req, res) => {
  const entities = await prisma.company.findMany();
  res.json(entities)
})

app.post('/company', async (req, res) => {
  const { nit, name } = req.body
  const entity = await prisma.company.create({
    data: {
      nit,
      name,
    },
  })
  res.json(entity)
})

app.get('/accountingRecord', async (req, res) => {
  const entities = await prisma.accountingRecord.findMany();
  res.json(entities)
})

app.post('/accountingRecord', async (req, res) => {
  const { date, total,recordType,userId,companyId,productId } = req.body
  //date should be in isoTimestamp
  const prismaDate = new Date(date)
  const entity = await prisma.accountingRecord.create({
    data: {
      date: prismaDate,
      total,
      recordType,
      userId,
      companyId,
      productId
    },
  })
  res.json(entity)
})

const port = 3000
const server = app.listen(port, () => {
  console.log(`ContaFacil backend app listening on port ${port}`)
})
