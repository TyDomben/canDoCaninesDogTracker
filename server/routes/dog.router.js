const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const multer = require("multer");
const path = require('path');

//! clean up console logs and comments before client handoff
/**
 * GET route to retrieve the "dog" table from the DB
 */
router.get("/", async (req, res) => {
  console.log("/dog GET route ");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);


  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const userId = req.user.id;


      const query = `
      SELECT
      "dogs"."id",
      "dogs"."user_id",
      "dogs"."dog_name", 
      "dogs"."age", 
      "dogs"."breed", 
      "dogs"."spayed_neutered", 
      "dogs"."food_type", 
      "dogs"."food_amount", 
      "dogs"."meals_per_day", 
      "dogs"."eating_times", 
      "dogs"."medical_conditions", 
      "dogs"."recovering_from_surgery", 
      "dogs"."medications", 
      "dogs"."in_heat", 
      "dogs"."potty_routine", 
      "dogs"."potty_habits_notes", 
      "dogs"."limit_water",
      "dogs"."limit_toy_play",
      "dogs"."watch_carefully",
      "dogs"."ingest_toys",
      "dogs"."keep_away",
      "dogs"."shares_toys", 
      "exercise_equipment"."exercise_equipment", 
      "dogs"."crate_manners", 
      "dogs"."house_manners", 
      "dogs"."living_with_other_dogs", 
      "dogs"."living_with_cats", 
      "living_with_children_ten_and_up",
      "living_with_children_younger_ten", 
      "dogs"."living_with_adults", 
      "dogs"."living_with_small_animals", 
      "dogs"."living_with_large_animals", 
      "behavior_dog"."behavior_category_name" AS "behavior_with_other_dogs",
      "behavior_cat"."behavior_category_name" AS "behavior_with_cats",
      "behavior_child"."behavior_category_name" AS "behavior_with_children"
  FROM 
      "dogs"
  
  JOIN 
      "exercise_equipment" AS "exercise_equipment" ON "dogs"."exercise_equipment" = "exercise_equipment"."id"
  JOIN 
      "behavior" AS "behavior_dog" ON "dogs"."behavior_with_other_dogs" = "behavior_dog"."id"
  JOIN 
      "behavior" AS "behavior_cat" ON "dogs"."behavior_with_cats" = "behavior_cat"."id"
  JOIN 
      "behavior" AS "behavior_child" ON "dogs"."behavior_with_children" = "behavior_child"."id"
  WHERE
      "dogs"."user_id" = $1;
            `;

      const result = await connection.query(query, [userId]);
      const dogsResult = result.rows;
      console.log(dogsResult);
      res.json(dogsResult);

    } catch (error) {
      console.error("error fetching dogs", error);
      res.sendStatus(500);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } else {
    res.sendStatus(403);
  }
});

/**
 * GET route to retrieve a single dog from "dogs" table from the DB
 * The dog's ID is passed as a URL parameter named 'id'
*/
router.get("/:id", async (req, res) => {
  console.log("/dog/:id GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const dogId = req.params.id;

      console.log("dogId server", dogId)
      const query = `SELECT
        "dogs"."user_id",
        
        "dogs"."dog_name", 
        "dogs"."age", 
        "breed"."breed" as "breed", 
        "dogs"."breed" as "breed_id",
        "dogs"."spayed_neutered", 
        "food_type"."food_type" AS "food_type", 
        "dogs"."food_type" AS "food_type_id",
        "dogs"."food_amount", 
        "dogs"."meals_per_day", 
        "dogs"."eating_times", 
        "dogs"."medical_conditions", 
        "dogs"."recovering_from_surgery", 
        "dogs"."medications", 
        "in_heat"."in_heat", 
        "dogs"."in_heat" AS "in_heat_id",
        "dogs"."potty_routine", 
        "dogs"."potty_habits_notes",  
        "dogs"."limit_water",
        "dogs"."limit_toy_play",
        "dogs"."watch_carefully",
        "dogs"."ingest_toys",
        "dogs"."keep_away",
        "dogs"."shares_toys",
        "exercise_equipment"."exercise_equipment", 
        "dogs"."exercise_equipment" AS "exercise_equipment_id", 
        "dogs"."crate_manners", 
        "dogs"."house_manners", 
        "dogs"."living_with_other_dogs", 
        "dogs"."living_with_cats", 
        "living_with_children_ten_and_up",
        "living_with_children_younger_ten", 
        "dogs"."living_with_adults", 
        "dogs"."living_with_small_animals", 
        "dogs"."living_with_large_animals", 
        "behavior_dog"."behavior_category_name" AS "behavior_with_other_dogs",
        "dogs"."behavior_with_other_dogs" AS "behavior_with_other_dogs_id",
        "behavior_cat"."behavior_category_name" AS "behavior_with_cats",
        "dogs"."behavior_with_cats" AS  "behavior_with_cats_id",
        "behavior_child"."behavior_category_name" AS "behavior_with_children",
        "dogs"."behavior_with_children" AS "behavior_with_children_id",
        "photo"."photo" AS "photo"
    FROM 
        "dogs"
    JOIN
        "food_type" AS "food_type" ON "dogs"."food_type" = "food_type"."id"
    JOIN 
        "breed" AS "breed" ON "dogs"."breed" = "breed"."id"
   Join
        "exercise_equipment" AS "exercise_equipment" ON "dogs"."exercise_equipment" = "exercise_equipment"."id"
    JOIN 
        "behavior" AS "behavior_dog" ON "dogs"."behavior_with_other_dogs" = "behavior_dog"."id"
    JOIN 
        "behavior" AS "behavior_cat" ON "dogs"."behavior_with_cats" = "behavior_cat"."id"
    JOIN 
        "behavior" AS "behavior_child" ON "dogs"."behavior_with_children" = "behavior_child"."id"
    JOIN "in_heat" AS "in_heat" ON "dogs"."in_heat" = "in_heat"."id"
    LEFT JOIN LATERAL (
      SELECT "photo"."photo" FROM "photo" WHERE "photo"."dog_id" = "dogs"."id"
      ORDER BY "photo"."id" DESC
      LIMIT 1) "photo" ON true
        WHERE
        "dogs"."id" = $1;
        `;
      const result = await connection.query(query, [dogId]);
      const dog = result.rows[0];

      console.log("dog result.rows", dog)

      if (dog) {
        res.json(dog);
      } else {
        res.status(404).send('Dog not found');
      }
    } catch (error) {
      console.error("Error fetching dog", error);
      res.sendStatus(500);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } else {
    res.sendStatus(403);
  }
});

/**
 * POST route to create a new dog profile
 */
router.post("/", (req, res) => {
  console.log("/dog POST router");
  console.log("req body", req.body);
  console.log("Is authenticated?", req.isUnauthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()) {
    const user = req.user.id;

    const dogData = [
      req.user.id, 
      req.body.dog_name,
      req.body.age,
      req.body.breed,
      req.body.spayed_neutered,
      req.body.food_type,
      req.body.food_amount,
      req.body.meals_per_day,
      req.body.eating_times,
      req.body.medical_conditions,
      req.body.recovering_from_surgery,
      req.body.medications,
      req.body.in_heat,
      req.body.potty_routine,
      req.body.potty_habits_notes,
      req.body.limit_water,
      req.body.limit_toy_play,
      req.body.watch_carefully,
      req.body.ingest_toys,
      req.body.keep_away,
      req.body.shares_toys,
      req.body.exercise_equipment,
      req.body.crate_manners,
      req.body.house_manners,
      req.body.living_with_other_dogs,
      req.body.living_with_cats,
      req.body.living_with_children_ten_and_up,
      req.body.living_with_children_younger_ten,
      req.body.living_with_adults,
      req.body.living_with_small_animals,
      req.body.living_with_large_animals,
      req.body.behavior_with_other_dogs,
      req.body.behavior_with_cats,
      req.body.behavior_with_children,
    ];

    console.log("dog data", dogData);
    console.log("req.user.id", user);

    const queryText = `
            INSERT INTO "dogs" (
                "user_id",
                "dog_name",
                "age",
                "breed",
                "spayed_neutered",
                "food_type",
                "food_amount",
                "meals_per_day",
                "eating_times",
                "medical_conditions",
                "recovering_from_surgery",
                "medications",
                "in_heat",
                "potty_routine",
                "potty_habits_notes",
                "limit_water",
                "limit_toy_play",
                "watch_carefully",
                "ingest_toys",
                "keep_away",
                "shares_toys",
                "exercise_equipment",
                "crate_manners",
                "house_manners",
                "living_with_other_dogs",
                "living_with_cats",
                "living_with_children_ten_and_up",
                "living_with_children_younger_ten",
                "living_with_adults",
                "living_with_small_animals",
                "living_with_large_animals",
                "behavior_with_other_dogs",
                "behavior_with_cats",
                "behavior_with_children")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34);
            `;

    pool
      .query(queryText, dogData)
      .then(() => res.sendStatus(201))
      .catch((error) => {
        console.log("Adding a dog failed", error);
        res.sendStatus(500);
      });
  }
});

router.delete("/:id", (req, res) => {
  const dogId = req.params.id;
  if (req.isAuthenticated()) {
    const deleteDogQuery = `
        DELETE FROM "dogs"
        WHERE "id" = $1;`;

    pool
      .query(deleteDogQuery, [dogId])
      .then(() => res.sendStatus(201))
      .catch((error) => {
        console.log("Failed to delete dog profile", error);
        res.sendStatus(500);
      });
  }
});

router.put("/:id", async (req, res) => {
  console.log("/dog PUT route");
  const dogId = req.params.id;
  const updates = req.body; // All available fields to update ("dogs" table)

  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();

      //Build the SQL update statement based on the fields the user updates
      //keys are the db property names  of the fields the user is trying to update

      const setClause = Object.keys(updates)
        .map((key, index) => `"${key}" = $${index + 1}`) //iterate over the keys(db fields) to create an array of string segments for the SET clause
        //Each segment maps a field name to a placeholder value ($1, $2`).
        .join(", "); // this combines the segments above and creates a single string. This forms the SET piece of the queryText

      const values = Object.values(updates); //This takes the SetClause object and creates an array. Corresponds to new data being put in the db

      //construct the SQL Query Text using setClause and values.length +1 = dog id
      //RETURNING is just asking PostgreSQL to return the updated row of data
      const queryText = `UPDATE "dogs" SET ${setClause} WHERE "id" = $${values.length + 1
        } RETURNING *;`;

      // Execute the update query ...values = placeholder values ($1, $2, $3, etc.)
      const result = await connection.query(queryText, [...values, dogId]);

      if (result.rows.length > 0) {
        // If the update was successful, return the updated dog profile
        res.json(result.rows[0]);
      } else {
        // If no rows were updated, it means the dog ID was not found
        res.status(404).send({ message: "Dog not found" });
      }
    } catch (error) {
      console.error("Error updating dog profile", error);
      res.sendStatus(500);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } else {
    res.sendStatus(403); // Not authenticated
  }
});



// Set up multer storage
const storage = multer.diskStorage({
  destination: path.resolve(__dirname,'../..', 'public/Images/'),
  filename: function (req, file, cb) {
    // Define how files should be named
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  }
});

// Configure multer instance
const upload = multer({ storage: storage });


router.post("/photo/:id", upload.single('photo'), async (req,res) => {
  console.log("uploaded file:", req.file)

if(req.isAuthenticated()){
  let connection;

  try{

    const photoUrl = req.file ? `/Images/${req.file.filename}` : null;

    console.log("photoUrl", photoUrl);
    connection = await pool.connect();

    const dogId = req.params.id;
    // const photoPath = `/public/Images/`; // Adjust path as necessary


    console.log("req.body", JSON.stringify(req.body));
    
    console.log("Dog ID:", dogId);



    const queryText = `
    INSERT INTO "photo"("dog_id", "photo")
    VALUES ($1, $2)
    RETURNING "id";
  `;
    
  const result = await connection.query(queryText, [dogId, photoUrl]);


    console.log("result", result)

    const photoResults = result.rows;
    res.json(photoResults)
  } catch(error){
    console.error("error adding photo")
    console.error(error.stack)
    res.sendStatus(500)
  }finally {
    if(connection){
      connection.release();
    }
  }
}else{res.sendStatus(403);
}})


module.exports = router;
