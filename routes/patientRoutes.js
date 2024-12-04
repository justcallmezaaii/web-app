const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getAllPatients);
router.post('/add', patientController.addPatient);
router.post('/edit', patientController.updatePatient);
router.get('/edit', patientController.updatePatient);
router.get('/delete/:id', patientController.deletePatient);

module.exports = router;
