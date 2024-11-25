const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./emr.db');

//DATABASE TABLES
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      birth_date TEXT,
      gender TEXT,
      contact_info TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS diagnoses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      diagnosis TEXT,
      date TEXT,
      FOREIGN KEY (patient_id) REFERENCES patients (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS prescriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      medication TEXT,
      dosage TEXT,
      prescribed_date TEXT,
      FOREIGN KEY (patient_id) REFERENCES patients (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS medical_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      event TEXT,
      date TEXT,
      FOREIGN KEY (patient_id) REFERENCES patients (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS lab_tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      test_name TEXT,
      results TEXT,
      date_conducted TEXT,
      FOREIGN KEY (patient_id) REFERENCES patients (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS billing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      amount FLOAT,
      date_billed TEXT,
      FOREIGN KEY (patient_id) REFERENCES patients (id)
    )
  `);
});

//CRUD OPERATIONS
const database = {
  getAll: (table, callback) => {
    db.all(`SELECT * FROM ${table}`, callback);
  },
  getById: (table, id, callback) => {
    db.get(`SELECT * FROM ${table} WHERE id = ?`, [id], callback);
  },
  add: (table, data, fields, callback) => {
    const placeholders = fields.map(() => '?').join(', ');
    db.run(
      `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders})`,
      data,
      callback
    );
  },
  update: (table, data, fields, id, callback) => {
    const updates = fields.map((field) => `${field} = ?`).join(', ');
    db.run(
      `UPDATE ${table} SET ${updates} WHERE id = ?`,
      [...data, id],
      callback
    );
  },
  delete: (table, id, callback) => {
    db.run(`DELETE FROM ${table} WHERE id = ?`, [id], callback);
  },
};

module.exports = { db, database };
