const { database } = require('../models/database');

// fetch all patients rec
exports.getAllPatients = (req, res) => {
  const db = require('../models/database').db; // Import the database connection
  db.all('SELECT * FROM patients', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Database error');
    }
    res.render('index', { patients: rows }); // Render the correct view and pass rows
  });
};

// add a new patient rec
exports.addPatient = (req, res) => {
  const { name, birth_date, gender, contact_info } = req.body;
  const data = [name, birth_date, gender, contact_info];
  const fields = ['name', 'birth_date', 'gender', 'contact_info'];

  database.add('patients', data, fields, (err) => {
      if (err) {
          console.error(err.message);
          return res.status(500).send('Database error');
      }
      res.render('index', { patients: rows }); // Redirect to patients list after adding
  });
};

// edit a patient rec
exports.updatePatient = (req, res) => {
  const { id, name, birth_date, gender, contact_info } = req.body;
  const data = [name, birth_date, gender, contact_info];
  const fields = ['name', 'birth_date', 'gender', 'contact_info'];

  database.update('patients', data, fields, id, (err) => {
    if (err) return res.status(500).send(err);
    res.render('index', { patients: rows });
  });
};

// delete a patient rec
exports.deletePatient = (req, res) => {
  const { id } = req.params;

  database.delete('patients', id, (err) => {
    if (err) return res.status(500).send(err);
    res.render('index', { patients: rows });
  });
};