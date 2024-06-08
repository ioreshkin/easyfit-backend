const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = require('./db');

const port = 3002;
const app = express();
const jsonParser = express.json();

// const string1 = "Наклоны головы — техника выполнения упражнения:\n1. Встаньте прямо.\n2. Медленно наклоните голову вперед, пытаясь прижать подбородок к груди. Затем отведите голову назад, стараясь не перегружать шею\n3. Медленно наклоните голову к левому плечу, стараясь прижать ухо к плечу. Вернитесь в исходное положение и повторите наклон к правому плечу.\n4. Повторите несколько раз для каждой стороны."
const sql = `INSERT INTO exercises (name_en, name_ru, description_ru, short_description_ru, short_description_en, description_en, muscles) VALUES ('Sit-ups', 'Приседания', 'похуй', 'Ну там присесть, а потом ну это самое.. О! Встать', 'Fxck fxck fxck fxck fxck fxck fxck fxck fxck', 'похуй', 'Спина')`;
// const sql = `INSERT INTO programs (name_ru, name_en, description_ru, short_description_ru, short_description_en, description_en, categories, exercises) VALUES ('Приседания)', 'Sit-ups', 'похуй', 'Ну там присесть, а потом ну это самое.. О! Встать', 'Fxck fxck fxck fxck fxck fxck fxck fxck fxck', 'похуй', 'Дом', 'Приседания')`;

// db.run(sql, function(err) {
//   if (err) {
//     console.error(err.message);
//   }
//   // Вывод сообщения об успешном выполнении операции
//   console.log(`Row inserted with key: ${this.lastID}`);
// });

// const sql = `DROP TABLE exercises`;

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
          "name_ru": row.name_ru,
          "description_ru": row.description_ru,
          "short_description_ru": row.short_description_ru,
          "name_en": row.name_en,
          "description_en": row.description_en,
          "short_description_en": row.short_description_en,
          "muscles": row.muscles_ru
        });
      });
      resolve();
    });
  });
  return result;
};

const getPrograms = async (sqlReq) => {
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
          "name_ru": row.name_ru,
          "description_ru": row.description_ru,
          "short_description_ru": row.short_description_ru,
          "name_en": row.name_en,
          "description_en": row.description_en,
          "short_description_en": row.short_description_en,
          "categories": row.categories,
          "exercises": row.exercises
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
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'Грудь'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/legs", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'Ноги'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/abs", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'Пресс'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/arms", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'Руки'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/back", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'Спина'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});


app.get("/programs", (req, res) => {
  const result = getPrograms("SELECT * FROM programs")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
})

app.get("/programs/home", (req, res) => {
  const result = getPrograms("SELECT * FROM programs WHERE categories = 'Дом'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
})

app.get("/programs/gym", (req, res) => {
  const result = getPrograms("SELECT * FROM programs WHERE categories = 'Зал'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
})

app.listen(port);