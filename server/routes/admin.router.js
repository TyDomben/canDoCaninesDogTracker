const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//This GET router is for the AdminHome page GETTING the host requests requests
router.get("/", (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated() || !req.user) {
    return res.sendStatus(401);
  }

  const sqlText = `
  SELECT 
  "volunteer_hosting"."id" AS "hosting_id",  -- Aliased for clarity
  "dogs"."dog_name",
  "volunteer_hosting"."request_id",
  "hosting_request"."start_date" AS "host_start_date",
  "hosting_request"."end_date" AS "host_end_date",
  "volunteer_hosting"."start_date" AS "volunteer_start_date",
  "volunteer_hosting"."end_date" AS "volunteer_end_date",
  "volunteer_user"."name" AS "volunteer_name",
  "host_user"."name" AS "host_name",
  "host_user"."id" AS "host_user_id",
  "hosting"."status"
FROM
  "volunteer_hosting"
JOIN 
  "user" AS "volunteer_user" ON "volunteer_hosting"."user_id" = "volunteer_user"."id"
JOIN 
  "hosting_request" ON "volunteer_hosting"."request_id" = "hosting_request"."id"
JOIN
  "dogs" ON "hosting_request"."dog_id" = "dogs"."id"
JOIN 
  "user" AS "host_user" ON "dogs"."user_id" = "host_user"."id"
LEFT JOIN "hosting" hosting ON "volunteer_hosting"."id" = "hosting"."hosting_id";
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

router.put("/confirm/:id", async (req, res) => {
  const hostingId = req.params.id;
  const { status } = req.body;
  console.log("Updating status for hostingId:", hostingId, "New status:", status);

  try {
    const result = await pool.query(
      `UPDATE hosting SET status = $1 WHERE id = $2;`,
      [status, hostingId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Hosting request not found.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    res.sendStatus(500);
  }
});



router.post('/confirm', async (req, res) => {

  const { requestId, hostingId, status } = req.body;

console.log("req.body", req.body)
console.log("requestId", requestId)
console.log("hostingId", hostingId)

  try {
      const queryResult = await pool.query(`
      INSERT INTO hosting (request_id, hosting_id, status)
      VALUES ($1, $2, $3);
      `, [requestId, hostingId, status]);

      res.json(queryResult.rows[0]);
    } catch (error) {
      console.error("Error creating hosting status:", error);
      res.sendStatus(500);
    }
  });


module.exports = router;
