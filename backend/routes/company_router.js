
const { PrismaClient } = require('@prisma/client')
var express = require('express');
var router = express.Router();

const prisma = new PrismaClient();
router.use(express.json())

router.route('/')
    .get(async (req, res) => {
        try {
            const entities = await prisma.company.findMany();
            res.json(entities)
        } catch (error) {
            res.json(error)
        }
    })
    .post(async (req, res) => {
        try {
            const { nit, name } = req.body
            const entity = await prisma.company.create({
                data: {
                  nit,
                  name,
                },
              })
            res.json(entity);
        } catch (error) {
            res.json(error);
        }
    })
    .put(async (req, res) => {
        try {
            const { id, nit, name } = req.body
            const entity = await prisma.company.update({
                where: {
                    id: +id,
                },
                data: {
                    nit, name,
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
            const entity = await prisma.company.findUnique({
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
            const company = await prisma.company.delete({
              where: {
                id:idNumber,
              },
            })
            res.json(company)
        } catch (error) {
            res.json(error);
        }
    })

module.exports = router;
