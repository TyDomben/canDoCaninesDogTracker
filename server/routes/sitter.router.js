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
 * GET route to retrieve all sitter requests
 */
router.get("/requests", async (req, res) => {
  console.log("/sitter/requests GET route");
  console.log("is authenticated?", req.isAuthenticated());
  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const userId = req.user.id;
      const query = `
        SELECT * FROM "dog_hosting"
        WHERE "user_id" = $1;
      `;
      const result = await connection.query(query, [userId]);
      res.json(result.rows);
    } catch (error) {
      console.error("Error in GET /sitter/requests", error);
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
 * Input fields from the user:
 * Start Date, End date, Comments, Appointment Notes
 * :id is the dogId of the associated dog 
 */
router.post("/request/:id", async (req, res) => {
  console.log("/sitter/request/:id POST route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (!req.isAuthenticated()) {
    return res.sendStatus(403);
  }

  const userId = req.user.id;
  const dogId = req.params.id;
  console.log("dogId server side", dogId);

  const { start_date, end_date, date_comments, appointments, status } =
    req.body;
  console.log("req.body", req.body);

  let connection;

  try {
    connection = await pool.connect();

    const query = `
      INSERT INTO "hosting_request" 
      ( "dog_id",
        "user_id",
        "start_date",
        "end_date",
        "date_comments",
        "appointments",
        "status"
      ) VALUES ('1', '1', '4-10-2024', '4-17-2024', 'going on vacation', 'no appointments', false)
      RETURNING "id";`;

    const values = [
      dogId,
      userId,
      start_date,
      end_date,
      date_comments,
      appointments,
      status,
    ];
    const result = await connection.query(query, values);

    const hostingId = result.rows[0].id;
    console.log("hosting request created id:", hostingId);

    res.status(201).json({ hostingId });
  } catch (error) {
    console.error("error requesting sitter", error);
    res.sendStatus(500);
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

/**
 * GET route to view a submitted hosting request for single dog (POST sitter/request/:id)
 *  the :id here is the requestId of the corresponding request (hosting_request)
 */
router.get("/request/volunteer/:id", async (req, res) => {
  console.log("/sitter/request/volunteer/:id GET route");

  if (!req.isAuthenticated()) {
    return res.sendStatus(403);
  }
  const hostingId = req.params.id;
  console.log("fetching hosting request for id:", hostingId);

  let connection;

  try {
    connection = await pool.connect();

    const query = ` SELECT 
    "dogs"."id" AS "dog_id",
    "user"."id" AS "user_id",
    "hosting_request"."start_date",
    "hosting_request"."end_date",
    "hosting_request"."date_comments",
    "hosting_request"."appointments",
    "hosting_request"."status"
    FROM 
    "hosting_request"
    JOIN 
    "dogs" ON "dogs"."id" = "hosting_request"."dog_id"
    JOIN 
    "user" ON "user"."id" = "hosting_request"."user_id"
    WHERE 
    "hosting_request"."id" = $1;`;

    const values = [hostingId];
    const result = await connection.query(query, values);

    if (result.rows.length > 0) {
      const hostingRequest = result.rows[0];
      res.json(hostingRequest);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log("error", error);
    res.sendStatus(500);
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

/**
 * POST route to volunteer to be a sitter for the corresponding request id
 * Input fields from the user:
 * Start Date, End date, Comments
 * the :id here is the requestId of the corresponding request for a host (hosting_request)
 */
router.post("/volunteer/:id", async (req, res) => {
  console.log("/sitter/volunteer/:id POST route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (!req.isAuthenticated()) {
    return res.sendStatus(403);
  }

  const userId = req.user.id;
  const requestId = req.params.id;
  console.log("hostingId server side", requestId);

  const { start_date, end_date, comments, status } = req.body;
  console.log("req.body", req.body);

  let connection;

  try {
    connection = await pool.connect();

    const query = `
    INSERT INTO "volunteer_hosting" (
      "request_id",
      "user_id",
      "start_date",
      "end_date",
      "comments",
      "status"
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING "id";`;

    const values = [
      dogId,
      userId,
      start_date,
      end_date,
      comments,
      status,
    ];
    const result = await connection.query(query, values);

    const hostingId = result.rows[0].id;
    console.log("hosting request created id:", hostingId);

    res.status(201).json({ hostingId });
  } catch (error) {
    console.error("error requesting sitter", error);
    res.sendStatus(500);
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

/**
 * GET route to view a submitted request a volunteer sends for single dog hosting experience (POST sitter/volunteer/:id)
 *  the :id here is the hostingId of the corresponding request (volunteer_hosting)
 */
router.get("/request/volunteer/:id", async (req, res) => {
  console.log("/sitter/request/volunteer/:id GET route");

  if (!req.isAuthenticated()) {
    return res.sendStatus(403);
  }
  const hostingId = req.params.id;
  console.log("fetching volunteer hosting for id:", hostingId);

  let connection;

  try {
    connection = await pool.connect();

    const query = ` SELECT 
    "dogs"."id" AS "dog_id",
    "user"."id" AS "user_id",
    "hosting_request"."start_date",
    "hosting_request"."end_date",
    "hosting_request"."date_comments",
    "hosting_request"."appointments",
    "hosting_request"."status"
    FROM 
    "hosting_request"
    JOIN 
    "dogs" ON "dogs"."id" = "hosting_request"."dog_id"
    JOIN 
    "user" ON "user"."id" = "hosting_request"."user_id"
    WHERE 
    "hosting_request"."id" = $1;`;

    const values = [hostingId];
    const result = await connection.query(query, values);

    if (result.rows.length > 0) {
      const hostingRequest = result.rows[0];
      res.json(hostingRequest);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log("error", error);
    res.sendStatus(500);
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

/**
 * DELETE route to cancel a sitter request
 */
router.delete("/request/:id", async (req, res) => {
  console.log("/sitter/request DELETE route");
  console.log("is authenticated?", req.isAuthenticated());
  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const hostingId = req.params.id;
      const userId = req.user.id;
      const query = `
        DELETE FROM "dog_hosting"
        WHERE "id" = $1 AND "user_id" = $2;
      `;
      await connection.query(query, [hostingId, userId]);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error in DELETE /sitter/request", error);
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
