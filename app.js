const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = require('./db');

const port = 3002;
const app = express();
const jsonParser = express.json();

// const string1 = "Наклоны головы — техника выполнения упражнения:\n1. Встаньте прямо.\n2. Медленно наклоните голову вперед, пытаясь прижать подбородок к груди. Затем отведите голову назад, стараясь не перегружать шею\n3. Медленно наклоните голову к левому плечу, стараясь прижать ухо к плечу. Вернитесь в исходное положение и повторите наклон к правому плечу.\n4. Повторите несколько раз для каждой стороны."
// const sql = `INSERT INTO exercises (name_en, name_ru, description_ru, short_description_ru, short_description_en, description_en, muscles, preview, gif) 
// VALUES ('Sit-ups', 'Приседания', 'похуй', 'Ну там присесть, а потом ну это самое.. О! Встать', 'Fxck fxck fxck fxck fxck fxck fxck fxck fxck', 'похуй', 'back', '/images/exercises/exercises4.png', '/images/programs/gif.gif')`;
// const sql = `INSERT INTO programs (name_ru, name_en, description_ru, short_description_ru, short_description_en, description_en, categories, exercises, exercises_repeats, preview, time_ru, time_en)
//  VALUES ('Приседания)', 'Sit-ups', 'похуй', 'Ну там присесть, а потом ну это самое.. О! Встать', 'Fxck fxck fxck fxck fxck fxck fxck fxck fxck', 'похуй', 'home', '1', '20', '/images/programs/Picture.png', '15 мин', '15 mins')`;

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
          "muscles": row.muscles_ru,
          "gif": row.gif,
          "preview": row.preview
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
          "time_ru": row.time_ru,
          "name_en": row.name_en,
          "description_en": row.description_en,
          "short_description_en": row.short_description_en,
          "time_en": row.time_en,
          "categories": row.categories,
          "exercises": row.exercises,
          "exercises_repeats": row.exercises_repeats,
          "preview": row.preview
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
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'chest'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/legs", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'legs'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/abs", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'abs'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/arms", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'arms'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
});

app.get("/exercises/back", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'back'")
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
  const result = getPrograms("SELECT * FROM programs WHERE categories = 'home'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
})

app.get("/programs/gym", (req, res) => {
  const result = getPrograms("SELECT * FROM programs WHERE categories = 'gym'")
  result.then(arr => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(arr)
  })
})

app.listen(port);