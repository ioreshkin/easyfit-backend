const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    db.run(`CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_ru text NOT NULL,
	    description_ru text NOT NULL,
        short_description_ru TEXT NOT NULL,
	    name_en	TEXT NOT NULL,
	    description_en TEXT NOT NULL,
        short_description_en TEXT NOT NULL,
	    muscles TEXT NOT NULL,
        preview text NOT NULL,
        gif text NOT NULL

    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created or already exists.');
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_ru	text NOT NULL,
	    description_ru text NOT NULL,
        short_description_ru TEXT NOT NULL,
        time_ru text NOT NULL,
        name_en	TEXT NOT NULL,
	    description_en TEXT NOT NULL,
	    short_description_en TEXT NOT NULL,
        time_en text NOT NULL,
	    categories text NOT NULL,
	    exercises text NOT NULL,
        preview text NOT NULL

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