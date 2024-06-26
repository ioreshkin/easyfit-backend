const express = require('express');
const db = require('./db');

const port = 3002;
const app = express();

app.listen(port);

const getExercises = async (sqlReq) => {
  const result = [];

  await new Promise((resolve, reject) => {
    db.all(sqlReq, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
        return;
      }
      
      // обработка всех записей
      rows.forEach((row) => {
        result.push({
          "id": row.id,
          "name_ru": row.name_ru,
          "description_ru": row.description_ru,
          "short_description_off_page_ru": row.short_description_on_page_ru,
          "short_description_on_page_ru": row.short_description_off_page_ru,
          "name_en": row.name_en,
          "description_en": row.description_en,
          "short_description_off_page_en": row.short_description_on_page_en,
          "short_description_on_page_en": row.short_description_off_page_en,
          "muscles": row.muscles,
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

app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  next();
});

app.get("/exercises", (req, res) => {
  const result = getExercises("SELECT * FROM exercises")
  result.then(arr => {
    
    res.status(200);
    res.json(arr);
  })
});

app.get("/exercises/chest", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'chest'")
  result.then(arr => {
    res.status(200);
    res.json(arr)
  })
});

app.get("/exercises/legs", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'legs'");
  result.then(arr => {
    res.status(200);
    res.json(arr);
  })
});

app.get("/exercises/abs", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'abs'");
  result.then(arr => {
    res.status(200);
    res.json(arr);
  })
});

app.get("/exercises/arms", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'arms'");
  result.then(arr => {
    res.status(200);
    res.json(arr);
  })
});

app.get("/exercises/back", (req, res) => {
  const result = getExercises("SELECT * FROM exercises WHERE muscles = 'back'");
  result.then(arr => {
    res.status(200);
    res.json(arr);
  })
});


app.get("/programs", (req, res) => {
  const result = getPrograms("SELECT * FROM programs");
  result.then(arr => {
    res.status(200);
    res.json(arr);
  })
})

app.get("/programs/home", (req, res) => {
  const result = getPrograms("SELECT * FROM programs WHERE categories = 'home'");
  result.then(arr => {
    res.status(200);
    res.json(arr);
  })
})

app.get("/programs/gym", (req, res) => {
  const result = getPrograms("SELECT * FROM programs WHERE categories = 'gym'");
  result.then(arr => {
    res.status(200);
    res.json(arr);
  })
})

