const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosisController');

router.get('/:patient_id', diagnosisController.getDiagnosesByPatient);
router.post('/add', diagnosisController.addDiagnosis);
router.post('/edit', diagnosisController.updateDiagnosis);
router.get('/delete/:id', diagnosisController.deleteDiagnosis);

module.exports = router;
