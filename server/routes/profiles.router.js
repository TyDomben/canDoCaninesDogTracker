const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated() || !req.user) {
    return res.sendStatus(401);
  }

  const sqlText = `
  SELECT * FROM "user"
`;

  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("Error user with SQL:", error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const requestId = req.params.id;
  const sqlText = `
    UPDATE "user"
    SET "admin" = $1
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
