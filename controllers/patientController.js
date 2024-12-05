const { database } = require('../models/database');

// fetch all patients rec
exports.getAllPatients = (req, res) => {
  const db = require('../models/database').db; // import the database connection
  db.all('SELECT * FROM patients', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Database error');
    }
    res.render('index', { patients: rows }); // render the correct view and pass rows
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
      res.render('index', { patients: rows }); // redirect to patients list after adding
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

// get the edit form for a patient
exports.getEditPatient = (req, res) => {
  const { id } = req.params;
  const db = require('../models/database').db;
  db.get('SELECT * FROM patients WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Database error');
    }
    res.render('edit', { patient: row }); // create an edit.ejs view for this
  });
};

// update a patient record
exports.updatePatient = (req, res) => {
  const { id, name, birth_date, gender, contact_info } = req.body;
  const data = [name, birth_date, gender, contact_info];

  database.update('patients', data, id, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect('/patients'); // redirect to the patients list after updating
  });
};


// delete a patient rec
exports.deletePatient = (req, res) => {
  const { id } = req.params;

  database.delete('patients', id, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect('/patients'); // redirect to the patients list after deleting
  });
};
