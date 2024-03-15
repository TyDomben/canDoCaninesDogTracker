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
    hr."id" AS "request_id",
    hr."dog_id",
    d."dog_name",
    hr."user_id",
    u."name" AS "requester_name",
    hr."start_date",
    hr."end_date",
    hr."date_comments",
    hr."appointments",
    hr."status"
FROM 
    "hosting_request" hr
JOIN 
    "dogs" d ON hr."dog_id" = d."id"
JOIN 
    "user" u ON hr."user_id" = u."id";
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

router.put("/:id", (req, res) => {
  const requestId = req.params.id;
  const sqlText = `
    UPDATE "hosting_request"
    SET "status" = $1
    WHERE "id" = $2;
  `;

  const status = req.body.status;
  const sqlParams = [status, requestId];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      console.log("success!");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
