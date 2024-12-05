const express = require('express');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');
const diagnosisRoutes = require('./routes/diagnosisRoutes');
const patientController = require('./controllers/patientController');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./emr.db');

const app = express();
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/patients', patientRoutes);
app.use('/diagnoses', diagnosisRoutes);
app.post('/add', patientController.addPatient);

// main page route
app.get('/', (req, res) => {
    db.all('SELECT * FROM patients', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Database error');
        }
        res.render('index', { patients: rows }); // render index with patients
    });
});

// home page route
app.get('/home', (req, res) => {
    res.render('home'); //
});

// Rx page route
app.get('/Rx', (req, res) => {
    res.render('Rx'); // 
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));