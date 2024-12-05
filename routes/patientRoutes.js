const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getAllPatients);
router.post('/add', patientController.addPatient); 
router.post('/edit/:id', patientController.updatePatient); 
router.get('/edit/:id', patientController.getEditPatient);
router.get('/patients/delete/:id', patientController.deletePatient);

module.exports = router;