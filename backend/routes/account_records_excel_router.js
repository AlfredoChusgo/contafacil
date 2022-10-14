
const { PrismaClient } = require('@prisma/client')
const ExcelJS = require('exceljs');
var express = require('express');
var router = express.Router();

const prisma = new PrismaClient();
router.use(express.json())

router.route('/')
.get(async (req, res) => {
    try {
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
    } catch (error) {
        res.json(error)
    }
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

module.exports = router;
