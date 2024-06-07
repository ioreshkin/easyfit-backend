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

const getExercises = async (sqlReq) => {
  const result = [];
  

  await new Promise((resolve, reject) => {
    db.all(sqlReq, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
        return;
      }
      
      // Вывод всех записей
      rows.forEach((row) => {
        result.push({
          "name": row.name_exersises,
          "description": row.discription_exersises,
          "muscles": row.muscles_exersises
        });
      });
      resolve();
    });
  });
  return result;
};

app.get("/exercises", (req, res) => {
  const result = getExercises("SELECT * FROM exersises")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
  
});

app.get("/exercises/chest", (req, res) => {
  const result = getExercises("SELECT * FROM exersises WHERE muscles_exersises = 'Грудь'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/legs", (req, res) => {
  const result = getExercises("SELECT * FROM exersises WHERE muscles_exersises = 'Ноги'")
  result.then(arr => {
    console.log(arr);
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/abs", (req, res) => {
  const result = getExercises("SELECT * FROM exersises WHERE muscles_exersises = 'Пресс'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/arms", (req, res) => {
  const result = getExercises("SELECT * FROM exersises WHERE muscles_exersises = 'Руки'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/back", (req, res) => {
  const result = getExercises("SELECT * FROM exersises WHERE muscles_exersises = 'Спина'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});


app.get("/programs", (req, res) => {
  db.all('SELECT * FROM programs', [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    let result = [];
    // Вывод всех записей
    rows.forEach((row) => {
      result.push(
        {
          "name": row.name,
          "description": row.	discription,
          "categories": row.categories
        }
      )
    });
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(result)
  });
})

app.listen(port);