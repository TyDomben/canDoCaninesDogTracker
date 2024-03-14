const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated() || !req.user) {
    return res.sendStatus(401);
  }

  const sqlText = `
  SELECT
    dh."id" AS hosting_id,
    dh."start_date",
    dh."end_date",
    dh."date_comments",
    dh."appointments",
    dh."status",
    d."dog_name",
    d."age",
    br."breed",
    d."spayed_neutered",
    ft."food_type",
    d."food_amount",
    d."meals_per_day",
    d."eating_times",
    d."medical_conditions",
    d."medications",
    ih."condition" AS in_heat_condition,
    d."potty_routine",
    d."exercise_equipment",
    ee."exercise_equipment" AS exercise_equipment_name,
    d."crate_manners",
    d."house_manners",
    bc_dogs."behavior_category_name" AS behavior_with_other_dogs,
    bc_cats."behavior_category_name" AS behavior_with_cats,
    bc_children."behavior_category_name" AS behavior_with_children,
    u."name" AS owner_name,
    u."phone" AS owner_phone,
    u."email" AS owner_email
FROM "hosting_request" dh
INNER JOIN "dogs" d ON dh."dog_id" = d."id"
INNER JOIN "user" u ON dh."user_id" = u."id"
LEFT JOIN "breed" br ON d."breed" = br."id"
LEFT JOIN "food_type" ft ON d."food_type" = ft."id"
LEFT JOIN "in_heat" ih ON d."in_heat" = ih."id"
LEFT JOIN "exercise_equipment" ee ON d."exercise_equipment" = ee."id"
LEFT JOIN "behavior" bc_dogs ON d."behavior_with_other_dogs" = bc_dogs."id"
LEFT JOIN "behavior" bc_cats ON d."behavior_with_cats" = bc_cats."id"
LEFT JOIN "behavior" bc_children ON d."behavior_with_children" = bc_children."id"
WHERE dh."status" = 'not confirmed'
ORDER BY dh."start_date";
`;

  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("Error fetching user's dogs with SQL:", error);
      res.sendStatus(500); // Send a server error status code
    });
});

module.exports = router;
