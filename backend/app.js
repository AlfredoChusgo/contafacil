import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import ExcelJS from 'exceljs'
//import {ExcelJS} from 'exceljs'

const prisma = new PrismaClient()
const app = express()
//const ExcelJS = require('exceljs/dist/es5');

app.use(cors());
app.use(express.json())

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  const user = await prisma.user.delete({
    where: {
      id:idNumber,
    }
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

app.get('/product/:id', async (req, res) => {
  const { id} = req.params
  const entity = await prisma.product.findUnique({
    where: {
      id:+id
    } 
  });
  res.json(entity)
})

app.delete('/product/:id', async (req, res) => {
  const { id } = req.params
  const entity = await prisma.product.delete({
    where: {
      id:+id,
    },
  })
  res.json(entity)
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

app.put('/product/', async (req, res) => {
  const { id,code,name } = req.body
  const entity = await prisma.product.update({
    where: {
      id:+id,
    },
    data:{
      code,name,
    },
  })
  res.json(entity)
})

app.get('/company', async (req, res) => {
  const entities = await prisma.company.findMany();
  res.json(entities)
})

app.put('/company/', async (req, res) => {
  const { id,nit,name } = req.body
  const entity = await prisma.company.update({
    where: {
      id:+id,
    },
    data:{
      nit,name,
    },
  })
  res.json(entity)
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

app.delete('/company/:id', async (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  const company = await prisma.company.delete({
    where: {
      id:idNumber,
    },
  })
  res.json(company)
})

app.get('/accountingRecord', async (req, res) => {
  const entities = await prisma.accountingRecord.findMany({
    include: {
      user: true,
      product: true,
      company:true,
    },
  })
  res.json(entities)
})

app.delete('/accountingRecord/:id', async (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  const accountingRecord = await prisma.accountingRecord.delete({
    where: {
      id:idNumber,
    },
  })
  res.json(accountingRecord)
})

app.post('/accountingRecord', async (req, res) => {
  const { date, total,recordType,userId,companyId,productId } = req.body
  //date should be in isoTimestamp
  const prismaDate = new Date(date)
  const entity = await prisma.accountingRecord.create({
    data: {
      date: prismaDate,
      total:total,
      recordType:recordType,
      userId:userId,
      companyId:companyId,
      productId:productId
    },
  })
  res.json(entity)
})

app.get('/accountingRecords', async (req, res) => {
  const entities = await prisma.accountingRecord.findMany({
    where:{
      date:{
        lte: req.query.endDate,
        gte: req.query.startDate
      }
    },
    include: {
      user: true,
      product: true,
      company:true,
    },
  })
  res.json(entities)
});

app.get('/accountingRecordsExcel', async (req, res) => {

  const workbook = await exportdata(req.query.startDate, req.query.endDate);
  const fileName = `account_record_${Date.now()}.xlsx`;
  res.setHeader(
    "Content-Type",
    "application/vnd. openxmlformats-officedocument.spreadsheetml.sheet");
  
  res.setHeader(
    "Content-Disposition",
    `attachment;filename=${fileName}`);
  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
});

const exportdata = async (startdate,endDate) =>{

  const entities = await prisma.accountingRecord.findMany({
    where:{
      date:{
        lte: endDate,
        gte: startdate
      }
    },
    include: {
      user: true,
      product: true,
      company:true,
    },
  });
  
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Account Record ', {properties:{tabColor:{argb:'FFC0000'}}});
  workbook.creator = 'conta_facil';
  workbook.lastModifiedBy = 'conta_facil';
  workbook.properties.date1904 = true;

  worksheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Date', key: 'date', width: 15 },
    { header: 'User Name', key: 'userName', width: 15 },
    { header: 'Company Name', key: 'companyName', width: 20 },
    { header: 'Record Type', key: 'recordType', width: 20 },
    { header: 'Company Nit', key: 'companyNit', width: 15 },
    { header: 'Product Name', key: 'productName', width: 15 },
    { header: 'Product Code', key: 'productCode', width: 15 },
    { header: 'Amount', key: 'amount', width: 15 }
    ];
  entities.forEach(async (entity)=>{
    let total = entity.recordType == 'incoming' ? entity.total : entity.total*-1;
    worksheet.addRow({ id: entity.id, 
      date: entity.date, 
      userName: entity.user.userName, 
      companyName: entity.company.name,
      recordType: entity.recordType,
      companyNit: entity.company.nit,
      productName:entity.product.name,
      productCode:entity.product.code,
      amount:total
    });
  });
  let endRow = entities.length + 2;
  let totalFormulaCell = worksheet.getCell(`I${endRow}`);
  let totalLabelCell = worksheet.getCell(`H${endRow}`);
  totalFormulaCell.value = { formula: `SUM(I2:I${endRow-1})`, date1904: false };
  totalLabelCell.value = "Total :";

  //formatting
  let format = {
    type: 'pattern',
    pattern:'darkTrellis',
    fgColor:{argb:'FFFFFF00'},
    bgColor:{argb:'ffa4ffa4'}
  };
  totalFormulaCell.fill = format;
  totalLabelCell.fill = format;


  return workbook;
};

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`ContaFacil backend app listening on port ${port}`)
})

