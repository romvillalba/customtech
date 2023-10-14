const { body } = require('express-validator');
const db = require("../database/models");
const path = require('path');

module.exports = [
    // body('nombre').exists().notEmpty().withMessage('El nombre no puede estar vacio').isLength({ min: 2 }).withMessage('Longitud de nombre demasiado corto'),
    // body('email').exists().notEmpty().withMessage('El correo no puede estar vacio').isEmail().withMessage('Indicá un email valido').custom(async (value, { req }) => {
    //     const existingUser = await db.User.findAll({ where: { email: value } }).then(usuarios => usuarios[0]);
    //     if (existingUser) {
    //         throw new Error('Ya existe un usuario registrado con ese correo electronico');
    //     }
    //     req.body = { "user": existingUser, ...req.body }
    //     console.log(req.body)
    // }),
    // body('contrasenia').exists().isStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('La contraseña debe contener letras en Mayuscula y minuscula, al menos un numero y un caracter especial'),
    // body('fotoPerfil').custom(async (_, { req }) => {
    //     if (!(['.jpg', '.jpeg', '.png', '.gif'].includes((path.extname(req.file.path)).toLowerCase()))) {
    //         throw new Error('Formato imagen no valido (solo JPG, JPEG, PNG, GIF)')
    //     }
    // })
]