const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * GET route to retrieve the "dog" table from the DB
 */
router.get('/', async (req, res) => {
    console.log("/dog GET route ");
    console.log("is authenticated?", req.isAuthenticated());
    console.log("user", req.user);
    // console.log("role", req.body.userRole)

    if(req.isAuthenticated()){
        let connection;
        try{
            connection = await pool.connect(); // Get a connection from the pool
            const userId = req.user.id;
            // const userRole = req.body.userRole

            const query = `
            SELECT
            "dogs"."user_id",
            "dogs"."name", 
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
            "exercise_limitations"."exercise_limitations", 
            "exercise_equipment"."exercise_equipment", 
            "dogs"."crate_manners", 
            "dogs"."house_manners", 
            "dogs"."living_with_other_dogs", 
            "dogs"."living_with_cats", 
            "dogs"."living_with_children_>_ten", 
            "dogs"."living_with_children_<_ten", 
            "dogs"."living_with_adults", 
            "dogs"."living_with_small_animals", 
            "dogs"."living_with_large_animals", 
            "behavior_dog"."behavior_category_name" AS "behavior_with_other_dogs",
            "behavior_cat"."behavior_category_name" AS "behavior_with_cats",
            "behavior_child"."behavior_category_name" AS "behavior_with_children"
        FROM 
            "dogs"
        JOIN 
            "dog_hosting" ON "dogs"."id" = "dog_hosting"."dog_id"
        JOIN 
            "exercise_limitations" AS "exercise_limitations" ON "dogs"."exercise_limitations" = "exercise_limitations"."id"
        JOIN 
            "exercise_equipment" AS "exercise_equipment" ON "dogs"."exercise_equipment" = "exercise_equipment"."id"
        JOIN 
            "behavior" AS "behavior_dog" ON "dogs"."behavior_with_other_dogs" = "behavior_dog"."id"
        JOIN 
            "behavior" AS "behavior_cat" ON "dogs"."behavior_with_cats" = "behavior_cat"."id"
        JOIN 
            "behavior" AS "behavior_child" ON "dogs"."behavior_with_children" = "behavior_child"."id"
        WHERE
            "dog_hosting"."user_id" = $1;
            `;

const result = await connection.query(query, [userId]);
const dogsResult = result.rows;

res.json(dogsResult)
    } catch(error){
        console.error("error fetching dogs", error);
        res.sendStatus(500);
    } finally {
        if (connection) {
            connection.release();
        } 
    }}
        else {
        res.sendStatus(403);
        
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;