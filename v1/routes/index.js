const express = require('express');
const router = express.Router()

const Roles = require("../routes/roles.route"),
Users = require("../routes/users.route"),
Patients = require("../routes/patients.route"),
Centers = require("../routes/centers.route"),
Chemist = require("../routes/chemist.route"),
Prescription = require("../routes/prescriptions.route"),
Bills = require("../routes/bills.route");

router.use('/roles', Roles)
router.use('/users', Users)
router.use('/patients', Patients)
router.use('/centers', Centers)
router.use('/chemist', Chemist)
router.use('/prescription', Prescription)
router.use('/bills', Bills)

module.exports = router


