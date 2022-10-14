
const { PrismaClient } = require('@prisma/client')
const { ExcelJS } = require('exceljs')
var express = require('express');
var router = express.Router();

const prisma = new PrismaClient();
router.use(express.json())

router.route('/')
    .get(async (req, res) => {
        try {
            const entities = await prisma.accountingRecord.findMany({
                include: {
                  user: true,
                  product: true,
                  company:true,
                },
              })
              res.json(entities)
        } catch (error) {
            res.json(error)
        }
    })
    .post(async (req, res) => {
        try {
            const { date, total,recordType,userId,companyId,productId } = req.body
            //date should be in isoTimestamp
            const prismaDate = new Date(date)
            const entity = await prisma.accountingRecord.create({
              data: {
                date: prismaDate,
                total:+total,
                recordType:recordType,
                userId:+userId,
                companyId:+companyId,
                productId:+productId
              },
            })
            res.json(entity)
        } catch (error) {
            res.json(error);
        }
    })
    .put(async (req, res) => {
        try {
            const { id,date, total,recordType,userId,companyId,productId } = req.body
            const prismaDate = new Date(date)
            const entity = await prisma.accountingRecord.update({
              where: {
                id:+id,
              },
              data: {
                date: prismaDate,
                total:+total,
                recordType:recordType,
                userId:+userId,
                companyId:+companyId,
                productId:+productId
              },
            })
            res.json(entity)
        } catch (error) {
            res.json(error)
        }
    })

router.route('/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params
            const entity = await prisma.accountingRecord.findUnique({
                where: {
                    id: +id
                }
            });
            res.json(entity)
        } catch (error) {
            res.json(error)
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.params;
            const idNumber = Number(id);
            const accountingRecord = await prisma.accountingRecord.delete({
              where: {
                id:idNumber,
              },
            })
            res.json(accountingRecord)
        } catch (error) {
            res.json(error);
        }
    })
    
module.exports = router;
