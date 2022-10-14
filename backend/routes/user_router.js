
const { PrismaClient } = require('@prisma/client')
var express = require('express');
var router = express.Router();

const prisma = new PrismaClient();
router.use(express.json())

/* GET users listing. */
router.route('/')
  .get(async (req, res) => {
    try {
      const entities = await prisma.user.findMany();
      res.json(entities)
    } catch (error) {
      res.json(error)
    }
  })

  .post(async (req, res) => {
    try {
      const { userName, password } = req.body
      const entity = await prisma.user.create({
        data: {
          userName,
          password,
        },
      })
      res.json(entity)
    } catch (error) {
      res.json(error)
    }
  })

router.route('/:id')
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const idNumber = Number(id);
      const user = await prisma.user.delete({
        where: {
          id: idNumber,
        }
      })
      res.json(user)
    } catch (error) {
      res.json(error)
    }
  })
module.exports = router;
