
const { PrismaClient } = require('@prisma/client')
var express = require('express');
var router = express.Router();

const prisma = new PrismaClient();
router.use(express.json())

router.route('/')
    .get(async (req, res) => {
        try {
            const entities = await prisma.product.findMany();
            res.json(entities)
        } catch (error) {
            res.json(error)
        }
    })
    .post(async (req, res) => {
        try {
            const { code, name } = req.body
            const entity = await prisma.product.create({
                data: {
                    code,
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
            const { id, code, name } = req.body
            const entity = await prisma.product.update({
                where: {
                    id: +id,
                },
                data: {
                    code, name,
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
            const entity = await prisma.product.findUnique({
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
        const { id } = req.params;
        const params = {
            where: {
                id: +id,
            },
        };
        try {
            const entity = await prisma.product.delete(params);
            res.json(entity);
        } catch (error) {
            res.json(error);
        }
    })

module.exports = router;
