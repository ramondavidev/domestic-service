const mongoose = require('mongoose');

const ServicoSchema = new mongoose.Schema({
    prestador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prestador'
    },
    tipoServico: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    data :{
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('servico', ServicoSchema);