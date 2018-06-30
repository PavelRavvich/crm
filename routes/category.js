const express = require('express');
const passport = require('passport');
const upload = require('../middlware/upload');
const router = express.Router();
const controller = require('../controllers/category');



router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create);
router.post('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);



module.exports = router;