const express = require('express'),
    router = express.Router();

const { getSearch, getUserById, userCreate, userEdit, userDelete, login } = require("../controllers/users.controller")
const { checkAuthToken: checkAuth} = require('../../middleware/checkauth')

router.get("/search", getSearch);
router.get('/:id', checkAuth, getUserById)
router.post('/', checkAuth, userCreate)
router.patch('/', checkAuth, userEdit)
router.delete('/:id', checkAuth, userDelete)
router.post('/login', login)
module.exports = router;