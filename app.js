const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = require('./db');

const port = 3002;
const app = express();
const jsonParser = express.json();

// const string1 = "Наклоны головы — техника выполнения упражнения:\n1. Встаньте прямо.\n2. Медленно наклоните голову вперед, пытаясь прижать подбородок к груди. Затем отведите голову назад, стараясь не перегружать шею\n3. Медленно наклоните голову к левому плечу, стараясь прижать ухо к плечу. Вернитесь в исходное положение и повторите наклон к правому плечу.\n4. Повторите несколько раз для каждой стороны."
// const sql = `INSERT INTO programs (name, description, categories) VALUES ('пук', 'пукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпукпук', 'Спина')`;

// db.run(sql, function(err) {
//   if (err) {
//     console.error(err.message);
//   }
//   // Вывод сообщения об успешном выполнении операции
//   console.log(`Row inserted with key: ${this.lastID}`);
// });

// const sql = `DROP TABLE programs`;

// db.run(sql, function(err) {
//   if (err) {
//     console.error(err.message);
//   }
//   // Вывод сообщения об успешном выполнении операции
//   console.log(`Row inserted with key: ${this.lastID}`);
// });

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
          "name": row.name,
          "description": row.description,
          "muscles": row.muscles
        });
      });
      resolve();
    });
  });
  return result;
};

app.get("/exercises", (req, res) => {
  const result = getExercises("SELECT * FROM exercises")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
  
});

app.get("/exercises/chest", (req, res) => {
  const result = getExercises("SELECT * FROM exerсises WHERE muscles_exersises = 'Грудь'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/legs", (req, res) => {
  const result = getExercises("SELECT * FROM exerсises WHERE muscles_exersises = 'Ноги'")
  result.then(arr => {
    console.log(arr);
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/abs", (req, res) => {
  const result = getExercises("SELECT * FROM exerсises WHERE muscles_exersises = 'Пресс'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/arms", (req, res) => {
  const result = getExercises("SELECT * FROM exerсises WHERE muscles_exersises = 'Руки'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/back", (req, res) => {
  const result = getExercises("SELECT * FROM exerсises WHERE muscles_exersises = 'Спина'")
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
          "description": row.description,
          "categories": row.categories
        }
      )
    });
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(result)
  });
})

app.listen(port);