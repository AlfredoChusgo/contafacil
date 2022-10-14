const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  const products = [{code:"600f0264",name:"Towels"},{code:"b6936210",name:"Chips"},{code:"fd394730",name:"Gloves"},{code:"2fed3df0",name:"Car"},{code:"c36b2d8c",name:"Hat"},{code:"3a89c368",name:"Keyboard"}]
  const companies = [{nit:1665773661,name:"Mayert Group"},{nit:1665773678,name:"Walter - Dibber"},{nit:1665773687,name:"Hammes Inc"},{nit:1665773698,name:"Bruen and Sons"},{nit:1665773707,name:"Botsford - Turcotte"},{nit:1665773718,name:"Cassin and Sons"}]
  const users = [{userName:'Keon_Pollich',password:'password'},{userName:'Kailee.Jenkins26',password:'password'},{userName:'Austyn.Ondricka',password:'password'},{userName:'Mathew_Farrell',password:'password'},{userName:'Alan_Marks57',password:'password'}]
  const accountRecords = [
    {
        date: "2022-10-01T19:06:56.545Z",
        total: 17.84,
        recordType: "outgoing",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-02T19:07:14.031Z",
        total: 284.44,
        recordType: "incoming",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-03T19:07:29.570Z",
        total: 299.34,
        recordType: "outgoing",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-04T19:07:56.741Z",
        total: 547.54,
        recordType: "incoming",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-05T19:08:02.639Z",
        total: 993.27,
        recordType: "outgoing",
        userId: 1,
        companyId: 1,
        productId: 1
    },
    {
        date: "2022-10-06T19:08:08.209Z",
        total: 338.26,
        recordType: "incoming",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-06T19:08:24.771Z",
        total: 67.97,
        recordType: "outgoing",
        userId: 4,
        companyId: 4,
        productId: 4
    },
    {
        date: "2022-10-07T19:08:31.241Z",
        total: 229.33,
        recordType: "incoming",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-08T19:08:39.233Z",
        total: 449.42,
        recordType: "outgoing",
        userId: 5,
        companyId: 5,
        productId: 5
    },
    {
        date: "2022-10-09T19:08:46.382Z",
        total: 509.7,
        recordType: "incoming",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-10T19:08:53.875Z",
        total: 726.97,
        recordType: "outgoing",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-11T19:09:00.337Z",
        total: 424.71,
        recordType: "incoming",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-12T19:09:07.095Z",
        total: 519.47,
        recordType: "outgoing",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-13T19:09:44.381Z",
        total: 787.09,
        recordType: "incoming",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-14T19:09:49.940Z",
        total: 307.74,
        recordType: "outgoing",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-15T19:09:56.508Z",
        total: 814.5,
        recordType: "incoming",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-16T19:09:56.891Z",
        total: 975.41,
        recordType: "outgoing",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-17T19:09:57.527Z",
        total: 127.81,
        recordType: "incoming",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-17T19:09:58.097Z",
        total: 602.77,
        recordType: "outgoing",
        userId: 4,
        companyId: 4,
        productId: 4
    },
    {
        date: "2022-10-18T19:09:58.475Z",
        total: 783.31,
        recordType: "incoming",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-19T19:09:58.912Z",
        total: 304.98,
        recordType: "outgoing",
        userId: 5,
        companyId: 5,
        productId: 5
    },
    {
        date: "2022-10-19T19:09:59.322Z",
        total: 116.67,
        recordType: "incoming",
        userId: 5,
        companyId: 5,
        productId: 5
    },
    {
        date: "2022-10-20T19:09:59.712Z",
        total: 63.69,
        recordType: "outgoing",
        userId: 5,
        companyId: 5,
        productId: 5
    },
    {
        date: "2022-10-21T19:10:00.136Z",
        total: 787.85,
        recordType: "incoming",
        userId: 4,
        companyId: 4,
        productId: 4
    },
    {
        date: "2022-10-22T19:10:00.493Z",
        total: 582.06,
        recordType: "outgoing",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-23T19:10:02.148Z",
        total: 972.25,
        recordType: "incoming",
        userId: 1,
        companyId: 1,
        productId: 1
    },
    {
        date: "2022-10-24T19:10:02.795Z",
        total: 889.58,
        recordType: "outgoing",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-25T19:10:03.262Z",
        total: 316.59,
        recordType: "incoming",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-26T19:10:03.725Z",
        total: 179.56,
        recordType: "outgoing",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-27T19:10:04.192Z",
        total: 479.18,
        recordType: "incoming",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-28T19:10:04.653Z",
        total: 474.79,
        recordType: "outgoing",
        userId: 1,
        companyId: 1,
        productId: 1
    },
    {
        date: "2022-10-29T19:10:05.118Z",
        total: 32.66,
        recordType: "incoming",
        userId: 4,
        companyId: 4,
        productId: 4
    },
    {
        date: "2022-10-30T19:10:05.589Z",
        total: 574.48,
        recordType: "outgoing",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-14T19:10:06.038Z",
        total: 759.97,
        recordType: "incoming",
        userId: 5,
        companyId: 5,
        productId: 5
    },
    {
        date: "2022-10-14T19:10:06.465Z",
        total: 490.59,
        recordType: "outgoing",
        userId: 2,
        companyId: 2,
        productId: 2
    },
    {
        date: "2022-10-14T19:10:06.888Z",
        total: 162.05,
        recordType: "incoming",
        userId: 5,
        companyId: 5,
        productId: 5
    },
    {
        date: "2022-10-14T19:10:07.303Z",
        total: 196.29,
        recordType: "outgoing",
        userId: 1,
        companyId: 1,
        productId: 1
    },
    {
        date: "2022-10-14T19:10:07.678Z",
        total: 798.74,
        recordType: "incoming",
        userId: 3,
        companyId: 3,
        productId: 3
    },
    {
        date: "2022-10-14T19:10:08.053Z",
        total: 883.29,
        recordType: "outgoing",
        userId: 1,
        companyId: 1,
        productId: 1
    },
    {
        date: "2022-10-14T19:10:08.417Z",
        total: 822.5,
        recordType: "incoming",
        userId: 4,
        companyId: 4,
        productId: 4
    },
    {
        date: "2022-10-14T19:10:08.859Z",
        total: 319.21,
        recordType: "outgoing",
        userId: 4,
        companyId: 4,
        productId: 4
    }
];
  products.forEach(async (item)=> await prisma.product.create({data:item}))
  companies.forEach(async (item)=> await prisma.company.create({data:item}))
  users.forEach(async (item)=> await prisma.user.create({data:item}))
  setTimeout(()=>{
    accountRecords.forEach(async (item)=> await prisma.accountingRecord.create({data:item}))
  },2000);
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