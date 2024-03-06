const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route to retrieve the sitter data from the "user" table
 */
router.get("/", async (req, res) => {
  console.log("/sitter GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const userId = req.user.id;

      const query = `
        SELECT
          "user"."id",
          "user"."name",
          "user"."username",
          "user"."phone",
          "user"."address",
          "user"."email"
        FROM
          "user"
        WHERE
          "user"."id" = $1;
      `;

      const result = await connection.query(query, [userId]);
      const sitterResult = result.rows[0];
      res.json(sitterResult);
    } catch (error) {
      console.error("error fetching sitter data", error);
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
 * GET route to retrieve the history of dogs sat by the sitter
 */
router.get("/history", async (req, res) => {
  console.log("/sitter/history GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const userId = req.user.id;

      const query = `
        SELECT
          "dogs"."name",
          "dog_hosting"."start_date",
          "dog_hosting"."end_date"
        FROM
          "dog_hosting"
        JOIN
          "dogs" ON "dog_hosting"."dog_id" = "dogs"."id"
        WHERE
          "dog_hosting"."user_id" = $1;
      `;

      const result = await connection.query(query, [userId]);
      const dogHistory = result.rows;
      res.json(dogHistory);
    } catch (error) {
      console.error("error fetching dog history", error);
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

module.exports = router;