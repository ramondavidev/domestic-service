const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { isLogged } = require('../middleware/middleware');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Contratante = require('../models/contratante');
const Prestador = require('../models/prestador');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', isLogged, async(req, res) => {
    try {
        let user = await Contratante.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Login -> Authenticate user & get token
// @access   Public
router.post(
    '/',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await Contratante.findOne({ email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Dados incorretos!' }] });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Dados incorretos!' }] });
        }
  
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
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );


  // @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', isLogged, async(req, res) => {
  try {
      let user = await Prestador.findById(req.user.id).select('-password');
      res.json(user);
  } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
  }
});




  router.post(
    '/prestador',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await Prestador.findOne({ email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Dados incorretos!' }] });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Dados incorretos!' }] });
        }
  
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
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

module.exports = router;