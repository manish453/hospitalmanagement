const express = require('express'),
    router = express.Router();
    
const { getSearch, getChemistById, chemistCreate, chemistEdit, chemistDelete } = require('../controllers/chemist.controller');
const { checkAuthToken: checkAuth} = require('../../middleware/checkauth')

router.get('/search', checkAuth, getSearch)
router.get('/:id', checkAuth, getChemistById)
router.post('/', checkAuth, chemistCreate)
router.patch('/', checkAuth, chemistEdit)
router.delete('/:id', checkAuth, chemistDelete)
module.exports = router;