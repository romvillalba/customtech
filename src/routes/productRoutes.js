const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');
const validateCreateProduct = require('../middlewares/validateCreateProduct');
const adminMiddleware = require('../middlewares/adminMiddleware');


const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images'))
    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

const fileUpload = multer({
    storage: multerDiskStorage
});


// new product
productRouter.get('/create', adminMiddleware, productController.newProduct);
productRouter.post('/', adminMiddleware, fileUpload.single('image'), validateCreateProduct, productController.processNewProduct);

// edit
productRouter.get('/:id/edit', adminMiddleware, productController.editProduct);
productRouter.put('/:id', adminMiddleware, fileUpload.single('image'), validateCreateProduct, productController.processEditProduct);

// delete 
productRouter.delete('/:id', adminMiddleware, productController.deleteProcess);

// productDetail 
productRouter.get('/:id', productController.productDetail);

// listPorduct
productRouter.get('/', productController.listProducts);

// Search Porducts
productRouter.post('/search', productController.searchProducts);

module.exports = productRouter;