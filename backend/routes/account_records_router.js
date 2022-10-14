
const { PrismaClient } = require('@prisma/client')
var express = require('express');
var router = express.Router();

const prisma = new PrismaClient();
router.use(express.json())

router.route('/')
  .get(async (req, res) => {
    console.log('Time: ', Date.now())
    try {
      const entities = await prisma.accountingRecord.findMany({
        where: {
          date: {
            lte: req.query.endDate,
            gte: req.query.startDate
          }
        },
        include: {
          user: true,
          product: true,
          company: true,
        },
      })
      res.json(entities)
    } catch (error) {
      res.json(error)
    }
  });

module.exports = router;
