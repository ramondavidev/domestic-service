const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Contratante = require('../models/contratante');
const Prestador = require('../models/prestador');


// @route    POST api/users
// @desc     Register user
// @access   Public
// tested
router.post('/',
    [
        check('name', 'O nome é requerido!').not().isEmpty(),
        check('email', 'Por favor, inclua um email válido!').isEmail(),
        check(
          'password',
          'Por favor, digita uma senha com um mínimo de 8 dígitos!'
        ).isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password, phone, address } =  req.body;

            let user = new Contratante({
                name,
                email,
                password,
                phone,
                address
            });

            const salt = await bcrypt.genSalt(15);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1hr' },
                (err, token) => {
                  if (err) throw err;
                  res.json({ token });
                }
            );

        } catch (err) {
            console.log(err);
            return res.status(400).json({ errors: [{msg: 'Erro inesperado, talvez um usuário já esteja cadastrado com essa matrícula!'}] });
        }
    }
);


router.post('/prestador',
    [
        check('name', 'O nome é requerido!').not().isEmpty(),
        check('email', 'Por favor, inclua um email válido!').isEmail(),
        check(
          'password',
          'Por favor, digita uma senha com um mínimo de 8 dígitos!'
        ).isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password, phone, address } =  req.body;

            let user = new Prestador({
                name,
                email,
                password,
                phone,
                address
            });

            const salt = await bcrypt.genSalt(15);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1hr' },
                (err, token) => {
                  if (err) throw err;
                  res.json({ token });
                }
            );

        } catch (err) {
            console.log(err);
            return res.status(400).json({ errors: [{msg: 'Erro inesperado, talvez um usuário já esteja cadastrado com essa matrícula!'}] });
        }
    }
);

module.exports = router;