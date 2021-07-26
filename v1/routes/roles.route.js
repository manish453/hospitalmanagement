const express = require('express'),
    router = express.Router();
    
const { getSearch, getRoleById, roleCreate, roleEdit, roleDelete } = require('../controllers/roles.controller');
const { checkAuthToken: checkAuth} = require('../../middleware/checkauth')

router.get('/search', checkAuth, getSearch)
router.get('/:id', checkAuth, getRoleById)
router.post('/', checkAuth, roleCreate)
router.patch('/', checkAuth, roleEdit)
router.delete('/:id', checkAuth, roleDelete)
module.exports = router;