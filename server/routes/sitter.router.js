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
 * GET route to retrieve a specific sitter's data from the "user" table
 */
router.get("/:id", async (req, res) => {
  console.log("/sitter/:id GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const sitterId = req.params.id;

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

      const result = await connection.query(query, [sitterId]);
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

/**
 * POST route to request a sitter
 */
router.post("/request", async (req, res) => {
  console.log("/sitter/request POST route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const { dogId, startDate, endDate, dateComments, appointments, status } = req.body;
      const userId = req.user.id;

      const query = `
        INSERT INTO "dog_hosting" (
          "dog_id",
          "user_id",
          "start_date",
          "end_date",
          "date_comments",
          "appointments",
          "status"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING "id";
      `;

      const result = await connection.query(query, [dogId, userId, startDate, endDate, dateComments, appointments, status]);
      const hostingId = result.rows[0].id;
      res.json({ hostingId });
    } catch (error) {
      console.error("error requesting sitter", error);
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
