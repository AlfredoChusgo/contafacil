const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  const products = [{code:"x313",name:"product1"},{code:"x314",name:"product1"},{code:"x315",name:"product2"},{code:"x316",name:"product3"},{code:"x317",name:"product4"},{code:"x318",name:"product5"}]
  const companies = [{nit:145634,name:"company1"},{nit:145635,name:"company1"},{nit:145636,name:"company2"},{nit:145637,name:"company3"},{nit:145638,name:"company4"},{nit:145639,name:"company5"}]
  const users = [{userName:'user1',password:'password'},{userName:'user2',password:'password'},{userName:'user3',password:'password'},{userName:'user4',password:'password'},{userName:'user5',password:'password'}]
  
  products.forEach(async (item)=> await prisma.product.create({data:item}))
  companies.forEach(async (item)=> await prisma.company.create({data:item}))
  users.forEach(async (item)=> await prisma.user.create({data:item}))
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