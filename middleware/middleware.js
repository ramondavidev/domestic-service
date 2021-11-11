const jwt = require('jsonwebtoken');
const Contratante = require('../models/contratante');
const Prestador = require('../models/prestador');

const isLogged = async (req, res, next) => {
    
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({ msg: 'Acesso negado!'});
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if(error){
                console.log(error);
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (error) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
}

const isContratante = async (req, res, next) => {
    try {
        let contratante = await Contratante.findById(req.user.id).select('-password');
        if(!contratante) {
            throw 'Não tem permissão para continuar!';
        }
        next();
    } catch (error) {
        console.error('Não tem permissão para continuar!');
        res.status(400).json({ msg: 'Server Error' });
    }
}

const isPrestador = async (req, res, next) => {
    try {
        let prestador = await Prestador.findById(req.user.id).select('-password');
        if(!prestador) {
            throw 'não tem permissão para continuar!';
        }
        next();
    } catch (error) {
        console.error('Não tem permissão');
        res.status(400).json({ msg: 'Server Error' });
    }
}

module.exports = {
    isLogged,
    isContratante,
    isPrestador
}