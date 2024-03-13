const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
    // This endpoint doesn't require authentication to see all dog hosting requests
    let sqlText = `
      SELECT
        "dog_hosting"."id" AS "hosting_id",
        "dog_hosting"."dog_id",
        "dog_hosting"."user_id",
        "dog_hosting"."start_date",
        "dog_hosting"."end_date",
        "dog_hosting"."date_comments",
        "dog_hosting"."appointments",
        "dog_hosting"."status",
        "dogs"."name" AS "dog_name",
        "user"."name" AS "user_name"
      FROM
        "dog_hosting"
      JOIN
        "dogs" ON "dog_hosting"."dog_id" = "dogs"."id"
      JOIN
        "user" ON "dog_hosting"."user_id" = "user"."id";
    `;
  
    pool.query(sqlText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.error("Error fetching all dog hosting requests", error);
        res.sendStatus(500); // Send a server error status code
      });
  });
  

module.exports = router;
