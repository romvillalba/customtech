const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/apis/userApiController')


router.get('/', userApiController.list)
router.get('/:id', userApiController.detail)


module.exports = router