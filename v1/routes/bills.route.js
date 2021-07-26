const express = require('express'),
    router = express.Router();
    
const { getSearch, getBillById, billCreate, billEdit, billDelete } = require('../controllers/bills.controller');
const { checkAuthToken: checkAuth} = require('../../middleware/checkauth')

router.get('/search', checkAuth, getSearch)
router.get('/:id', checkAuth, getBillById)
router.post('/', checkAuth, billCreate)
router.patch('/', checkAuth, billEdit)
router.delete('/:id', checkAuth, billDelete)
module.exports = router;