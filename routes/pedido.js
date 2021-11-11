const express = require('express');
const router = express.Router();

const Pedido = require('../models/pedido');


//get all pedidos
router.get('/', async(req, res) => {
    try {
        const pedidos = await Pedido.find().populate('servico').populate('contratante').populate('prestador');
        return res.json(pedidos);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const pedido = Pedido.findById(req.params.id);
        return pedido;
    } catch (error) {
        throw error;
    }
});

//cancelar pedido
router.put('/:id', async(req, res) => {
    try {
        const { cancelar } = req.body;
        const pedido = await Pedido.findByIdAndUpdate(req.params.id, { cancelado: cancelar });
        res.json(pedido);
    } catch (error) {
        console.error(error);
    }
});


router.get('/search/:pedido', async(req, res) => {
    try {
        const descricao = req.params.pedido;
        const pedidos = await Pedido.find({ descricao: { "$regex": descricao, "$options": "i" } });
        return res.json(pedidos);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async(req, res) => {
    try {
        const { contratante, prestador, servico, descricao } = req.body;
        const pedido = new Pedido({
            contratante,
            prestador,
            servico,
            descricao
        });

    await pedido.save();

    return res.json(pedido);
    } catch (error) {
        throw error;
    }
});

router.delete('/:id', async(req, res) => {
    try {
        await Pedido.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Pedido removido com sucesso' });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;