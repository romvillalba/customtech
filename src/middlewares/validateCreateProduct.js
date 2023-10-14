const { body } = require('express-validator');
const db = require("../database/models");
const path = require('path');

module.exports = [
    body('name').exists().notEmpty().withMessage('El nombre no puede estar vacio').isLength({ min: 5 }).withMessage('Longitud de nombre demasiado corto'),
    body('descripcion').exists().notEmpty().withMessage('La descripción no puede estar vacia').isLength({ min: 20 }).withMessage('Longitud de descripción demasiado corto'),
    body('image').custom(async (_, {req}) => {
        console.log(req.method)
        if (!(req.file)) {
            if(req.method!='PUT'){
                throw new Error('Debe seleccionar una imagen')
            }
        } else {
            if (!(['.jpg', '.jpeg', '.png', '.gif'].includes((path.extname(req.file.path)).toLowerCase()))) {
                throw new Error('Formato imagen no valido (solo JPG, JPEG, PNG, GIF)')
            }
        }
    }),
    body('productCantidad').exists().isInt().withMessage('La cantidad debe ser un valor numerico'),
    body('categories').custom(async (value) => {
        const existingcategory = await db.Category.findAll({ where: { id: value } }).then(categoria => categoria[0]);
        if (!existingcategory) {
            throw new Error('No existe esa categoria');
        }
    }),
    body('precio').exists().isCurrency({ allow_negatives: false, decimal_separator: '.', allow_decimal: true, allow_space_after_digits: false, digits_after_decimal: [2] }).withMessage('El precio debe ser un valor numerico, con 2 decimales, el separador decimal es ","')
]