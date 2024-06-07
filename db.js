const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    db.run(`CREATE TABLE IF NOT EXISTS exercises (
      id_exercises INTEGER PRIMARY KEY AUTOINCREMENT,
      name_exercises_ru	text NOT NULL,
	    description_exercises_ru	text NOT NULL,
	    muscles_exercises_ru	text NOT NULL,
	    name_exercises_en	TEXT NOT NULL,
	    description_exercises_en	TEXT NOT NULL,
	    muscles_exercises_en	TEXT NOT NULL,
	    small_description_exercises_ru	TEXT NOT NULL,
	    small_description_exercises_en	TEXT NOT NULL,
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created or already exists.');
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS programs (
        id_programs INTEGER PRIMARY KEY AUTOINCREMENT,
        name_programs_ru	text NOT NULL,
	      description_programs_ru	text NOT NULL,
	      categories_programs_ru	text NOT NULL,
	      exercises_programs_ru	text NOT NULL,
	      name_programs_en	TEXT NOT NULL,
	      description_programs_en	TEXT NOT NULL,
	      categories_programs_en	TEXT NOT NULL,
	      exercises_programs_en	TEXT NOT NULL,
	      small_description_programs_ru	TEXT NOT NULL,
	      small_description_programs_en	TEXT NOT NULL,
      )`, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table created or already exists.');
        }
      });

      db.run(`CREATE TABLE IF NOT EXISTS users (
        id_users INTEGER PRIMARY KEY AUTOINCREMENT,
        token	text NOT NULL,
	      email	TEXT NOT NULL,
      )`, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table created or already exists.');
        }
      });
  }
});

module.exports = db;