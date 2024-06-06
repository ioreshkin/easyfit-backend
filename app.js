const express = require('express');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./easyfit.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

const hostname = '26.79.198.107';
const port = 3002;
const app = express();
const jsonParser = express.json();

app.get("/exercises", (req, res) => {
  db.all('SELECT * FROM exersises', [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    let result = [];
    // Вывод всех записей
    rows.forEach((row) => {
      result.push(
        {
          "name": row.name_exersises,
          "description": row.discription_exersises,
          "muscles": row.muscles_exersises
        }
      )
    });
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(result)
  });
})

app.listen(port);