const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    contratante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contratante',
        required: true
    },
    prestador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prestador',
        required: true
    },
    servico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'servico',
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    cancelado: {
        type: Boolean,
        default: false
    },
    data: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('pedido', PedidoSchema);