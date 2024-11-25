const { database } = require('../models/database');

// fetch diagnoses for a specific patient
exports.getDiagnosesByPatient = (req, res) => {
  const { patient_id } = req.params;

  database.getAll('diagnoses WHERE patient_id = ?', [patient_id], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.render('diagnoses', { diagnoses: rows });
  });
};

// add a diagnosis
exports.addDiagnosis = (req, res) => {
  const { patient_id, diagnosis, date } = req.body;
  const data = [patient_id, diagnosis, date];
  const fields = ['patient_id', 'diagnosis', 'date'];

  database.add('diagnoses', data, fields, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect(`/diagnoses/${patient_id}`);
  });
};

// edit a diagnosis
exports.updateDiagnosis = (req, res) => {
  const { id, diagnosis, date } = req.body;
  const data = [diagnosis, date];
  const fields = ['diagnosis', 'date'];

  database.update('diagnoses', data, fields, id, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect(`/diagnoses/${req.body.patient_id}`);
  });
};

// delete a diagnosis
exports.deleteDiagnosis = (req, res) => {
  const { id } = req.params;

  database.delete('diagnoses', id, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect(`/diagnoses/${req.query.patient_id}`);
  });
};
