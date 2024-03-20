const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated() || !req.user) {
    return res.sendStatus(401);
  }

  const userId = req.user.id; // Get the current user's ID

  let sqlText = `
  SELECT
    "dogs"."user_id",
    "dogs"."id" AS "dog_id",
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
    "dogs"."living_with_children_ten_and_up",
    "dogs"."living_with_children_younger_ten",
    "dogs"."living_with_adults",
    "dogs"."living_with_small_animals",
    "dogs"."living_with_large_animals",
    "behavior_dog"."behavior_category_name" AS "behavior_with_other_dogs",
    "behavior_cat"."behavior_category_name" AS "behavior_with_cats",
    "behavior_child"."behavior_category_name" AS "behavior_with_children",
    "photo"."photo" AS "photo"
    FROM
    "user"
  JOIN
    "dogs" ON "user"."id" ="dogs"."user_id"
  JOIN
    "exercise_equipment" AS "exercise_equipment" ON "dogs"."exercise_equipment" = "exercise_equipment"."id"
  JOIN
    "behavior" AS "behavior_dog" ON "dogs"."behavior_with_other_dogs" = "behavior_dog"."id"
  JOIN
    "behavior" AS "behavior_cat" ON "dogs"."behavior_with_cats" = "behavior_cat"."id"
  JOIN
    "behavior" AS "behavior_child" ON "dogs"."behavior_with_children" = "behavior_child"."id"
    LEFT JOIN LATERAL (
      SELECT "photo"."photo" FROM "photo" WHERE "photo"."dog_id" = "dogs"."id"
      ORDER BY "photo"."id" DESC
      LIMIT 1) "photo" ON true
    WHERE
    "dogs"."user_id" = $1;`



  const sqlParams = [userId]; // Use the current user's ID as the parameter for the query

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(
        "Error fetching user's dogs with SQL:",
        sqlText,
        "Parameters:",
        sqlParams,
        "Error:",
        error
      );
      res.sendStatus(500); // Send a server error status code
    });
});

router.get("/:id", (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated() || !req.user) {
    return res.sendStatus(401);
  }

  const userId = req.user.id; // Get the current user's ID
  const dogId = req.params.id; // Extract the dog ID from the route parameter

  let sqlText = `
  SELECT
  "dogs"."user_id",
  "dogs"."id" AS "dog_id",
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
  "exercise_equipment"."exercise_equipment",
  "dogs"."crate_manners",
  "dogs"."house_manners",
  "dogs"."living_with_other_dogs",
  "dogs"."living_with_cats",
  "dogs"."living_with_children_ten_and_up",
  "dogs"."living_with_children_younger_ten",
  "dogs"."living_with_adults",
  "dogs"."living_with_small_animals",
  "dogs"."living_with_large_animals",
  "behavior_dog"."behavior_category_name" AS "behavior_with_other_dogs",
  "behavior_cat"."behavior_category_name" AS "behavior_with_cats",
  "behavior_child"."behavior_category_name" AS "behavior_with_children",
  "hosting_request"."id" AS "hosting_id",
  "hosting_request"."start_date",
  "hosting_request"."end_date",
  "hosting_request"."date_comments",
  "hosting_request"."appointments",
  "hosting_request"."status"
  "photo"."photo" AS "photo"

  FROM
  "user"
JOIN
  "dogs" ON "user"."id" = "dogs"."user_id"
JOIN
  "exercise_equipment" ON "dogs"."exercise_equipment" = "exercise_equipment"."id"
JOIN
  "behavior" AS "behavior_dog" ON "dogs"."behavior_with_other_dogs" = "behavior_dog"."id"
JOIN
  "behavior" AS "behavior_cat" ON "dogs"."behavior_with_cats" = "behavior_cat"."id"
JOIN
  "behavior" AS "behavior_child" ON "dogs"."behavior_with_children" = "behavior_child"."id"
JOIN
  "hosting_request" ON "dogs"."id" = "hosting_request"."dog_id"
  LEFT JOIN LATERAL (
    SELECT "photo"."photo" FROM "photo" WHERE "photo"."dog_id" = "dogs"."id"
    ORDER BY "photo"."id" DESC
    LIMIT 1) "photo" ON true
  WHERE
  "dogs"."user_id" = $1 AND "dogs"."id" = $2;
  `;

  const sqlParams = [userId, dogId]; // Use the current user's ID and the dog ID as parameters for the query

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(
        "Error fetching user's dog with SQL:",
        sqlText,
        "Parameters:",
        sqlParams,
        "Error:",
        error
      );
      res.sendStatus(500); // Send a server error status code
    });
});


//Update Dog Router

router.put('/:id', (req, res) => {
  console.log('in dog UPDATE route')
  console.log('req.body', req.user.id, req.body, req.params.id)
if (req.isAuthenticated()) {
  const dogId = req.params.id;
  const user = req.user.id
  const dogData = [
    req.body.dog_name,
    req.body.age,
    req.body.breed_id, 
    req.body.spayed_neutered,
    req.body.food_type_id,
    req.body.food_amount,
    req.body.meals_per_day,
    req.body.eating_times,
    req.body.medical_conditions,
    req.body.recovering_from_surgery,
    req.body.medications,
    req.body.in_heat_id,
    req.body.potty_routine,
    req.body.potty_habits_notes,
    req.body.limit_water,
    req.body.limit_toy_play,
    req.body.watch_carefully,
    req.body.ingest_toys,
    req.body.keep_away,
    req.body.shares_toys,
    req.body.exercise_equipment_id,
    req.body.crate_manners,
    req.body.house_manners,
    req.body.living_with_other_dogs_id,
    req.body.living_with_cats_id,
    req.body.living_with_children_ten_and_up,
    req.body.living_with_children_under_ten,
    req.body.living_with_adults,
    req.body.living_with_small_animals,
    req.body.living_with_large_animals,
    req.body.behavior_with_other_dogs_id,
    req.body.behavior_with_cats_id,
    req.body.behavior_with_children


  ]
      
  
  const queryText =`
  UPDATE "dogs" 
  SET 
  "user_id"=$1,
  "dog_name" =$2,
  "age" =$3,
  "breed"=$4,
  "spayed_neutered"=$5,
  "food_type"=$6,
  "food_amount"=$7,
  "meals_per_day" =$8,
  "eating_times" =$9,
  "medical_conditions"=$10,
  "recovering_from_surgery"=$11,
  "medications"=$12,
  "in_heat"=$13,
  "potty_routine"=$14,
  "potty_habits_notes"=$15,
  "limit_water"=$16,
  "limit_toy_play"=$17,
  "watch_carefully"=$18,
  "ingest_toys"=$19,
  "keep_away"=$20,
  "shares_toys"=$21,
  "exercise_equipment"=$22,
  "crate_manners"=$23,
  "house_manners"=$24,
  "living_with_other_dogs"=$25,
  "living_with_cats"=$26,
  "living_with_children_ten_and_up"=$27,
  "living_with_children_younger_ten"=$28,
  "living_with_adults"=$29,
  "living_with_small_animals"=$30,
  "living_with_large_animals"=$31,
  "behavior_with_other_dogs"=$32,
  "behavior_with_cats"=$33,
  "behavior_with_children"=$34


  

  WHERE "id" = $35;
  `
 queryParams =[user,
  req.body.dog_name,
  req.body.age,
  req.body.breed_id, 
  req.body.spayed_neutered,
  req.body.food_type_id,
  req.body.food_amount,
  req.body.meals_per_day,
  req.body.eating_times,
  req.body.medical_conditions,
  req.body.recovering_from_surgery,
  req.body.medications,
  req.body.in_heat_id,
  req.body.potty_routine,
  req.body.potty_habits_notes,
  req.body.limit_water,
  req.body.limit_toy_play,
  req.body.watch_carefully,
  req.body.ingest_toys,
  req.body.keep_away,
  req.body.shares_toys,
  req.body.exercise_equipment_id,
  req.body.crate_manners,
  req.body.house_manners,
  req.body.living_with_other_dogs,
  req.body.living_with_cats,
  req.body.living_with_children_ten_and_up,
  req.body.living_with_children_younger_ten,
  req.body.living_with_adults,
  req.body.living_with_small_animals,
  req.body.living_with_large_animals,
  req.body.behavior_with_other_dogs_id,
  req.body.behavior_with_cats_id,
  req.body.behavior_with_children_id,
  dogId]
  pool 
      .query(queryText, queryParams)
      .then((result)=> {
          res.sendStatus(200);
      })
      .catch((err) => {
          console.log('error updating dog', err)
      })
  }else {
      sendStatus(403)
  }
})
module.exports = router;
