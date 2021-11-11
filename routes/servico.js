const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Contratante = require('../models/contratante');
const Prestador = require('../models/prestador');
const Servico = require('../models/servico');


//get all serviços
router.get('/', async(req, res) => {
    try {
        const servicos = await Servico.find();
        return res.json(servicos);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const servico = Servico.findById(req.params.id);
        return servico;
    } catch (error) {
        throw error;
    }
});

router.get('/search/:servico', async(req, res) => {
    try {
        const descricao = req.params.pedido;
        const servicos = await Servico.find({ descricao: { "$regex": descricao, "$options": "i" } });
        return res.json(servicos);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async(req, res) => {
    try {
        const { prestador, tipoServico, descricao, data } = req.body;
        const servico = new Servico({
            prestador,
            tipoServico,
            descricao,
            data
        });

    await servico.save();

    return res.json(servico);
    } catch (error) {
        throw error;
    }
});

router.delete('/:id', async(req, res) => {
    try {
        await Servico.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Serviço removido com sucesso' });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;