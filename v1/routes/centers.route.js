const express = require('express'),
    router = express.Router();
    
const { getSearch, getCenterById, centerCreate, centerEdit, centerDelete } = require('../controllers/centers.controller');
const { checkAuthToken: checkAuth} = require('../../middleware/checkauth')

router.get('/search', checkAuth, getSearch)
router.get('/:id', checkAuth, getCenterById)
router.post('/', checkAuth, centerCreate)
router.patch('/', checkAuth, centerEdit)
router.delete('/:id', checkAuth, centerDelete)
module.exports = router;