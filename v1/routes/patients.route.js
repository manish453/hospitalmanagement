const express = require('express'),
    router = express.Router();

const { getSearch, getPatientById, patientCreate, patientEdit, patientDelete } = require("../controllers/patients.controller")
const { checkAuthToken: checkAuth} = require('../../middleware/checkauth')

router.get("/search", checkAuth, getSearch);
router.get('/:id', checkAuth, getPatientById)
router.post('/', checkAuth, patientCreate)
router.patch('/', checkAuth, patientEdit)
router.delete('/:id', checkAuth, patientDelete)
module.exports = router;