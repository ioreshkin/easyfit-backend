const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    db.run(`CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_ru TEXT NOT NULL,
	      description_ru TEXT NOT NULL,
        short_description_off_page_ru TEXT NOT NULL,
        short_description_on_page_ru TEXT NOT NULL,
	      name_en	TEXT NOT NULL,
	      description_en TEXT NOT NULL,
        short_description_off_page_en TEXT NOT NULL,
        short_description_on_page_en TEXT NOT NULL,
	      muscles TEXT NOT NULL,
        preview TEXT NOT NULL,
        gif TEXT NOT NULL

    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created or already exists.');
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_ru	TEXT NOT NULL,
	      description_ru TEXT NOT NULL,
        short_description_ru TEXT NOT NULL,
        time_ru TEXT NOT NULL,
        name_en	TEXT NOT NULL,
	      description_en TEXT NOT NULL,
	      short_description_en TEXT NOT NULL,
        time_en TEXT NOT NULL,
	      categories TEXT NOT NULL,
	      exercises TEXT NOT NULL,
        exercises_repeats TEXT NOT NULL,
        preview TEXT NOT NULL

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