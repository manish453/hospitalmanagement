const express = require('express'),
    router = express.Router();
    
const { getSearch, getPrescriptionById, prescriptionCreate, prescriptionEdit, prescriptionDelete } = require('../controllers/prescriptions.controller');
const { checkAuthToken: checkAuth} = require('../../middleware/checkauth')

router.get('/search', checkAuth, getSearch)
router.get('/:id', checkAuth, getPrescriptionById)
router.post('/', checkAuth, prescriptionCreate)
router.patch('/', checkAuth, prescriptionEdit)
router.delete('/:id', checkAuth, prescriptionDelete)
module.exports = router;