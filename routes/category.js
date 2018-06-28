const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');

router.get('/category', controller.getAll);
router.get('/:id', controller.getById);
router.patch('/', controller.create);
router.post('/:id', controller.update);
router.delete('/:id', controller.remove);



module.exports = router;