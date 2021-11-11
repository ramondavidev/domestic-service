const mongoose = require('mongoose');

const PrestadorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        required: false,
        unique: true
    },
    address: {
        rua: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true
    },
    phone2: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('prestador', PrestadorSchema);