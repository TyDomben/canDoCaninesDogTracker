const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated() || !req.user) {
    return res.sendStatus(401);
  }

  const sqlText = 
//   `

//   SELECT 
//     hr."id" AS "request_id",
//     hr."dog_id",
//     d."dog_name",
//     hr."user_id",
//     u."name" AS "requester_name",
//     hr."start_date",
//     hr."end_date",
//     hr."date_comments",
//     hr."appointments",
//     hr."status"
// FROM 
//     "hosting_request" hr
// JOIN 
//     "dogs" d ON hr."dog_id" = d."id"
// JOIN 
//     "user" u ON hr."user_id" = u."id";
// `;
`
SELECT 
"volunteer_hosting"."id" as "volunteer_id",
"volunteer_hosting"."user_id" as "volunteer_user_id",

"dogs"."dog_name",
"volunteer_hosting"."request_id",
"hosting_request"."start_date" as "host_start_date",
"hosting_request"."end_date" as "host_end_date",
"volunteer_hosting"."start_date" as "volunteer_start_date",
"volunteer_hosting"."end_date" as "volunteer_end_date",
"volunteer_user"."name" as "volunteer_name",
"volunteer_user"."email" as "volunteer_email",
"host_user"."name" as "host_name",
"user"."id"
FROM
"volunteer_hosting"
JOIN 
"user" AS "volunteer_user" on "volunteer_hosting"."user_id" = "volunteer_user"."id"
JOIN 
"hosting_request" on "volunteer_hosting"."request_id" = "hosting_request"."id"
JOIN
"user" AS "host_user" on "hosting_request"."user_id" = "host_user"."id" 
JOIN 
"dogs" on "hosting_request"."dog_id" = "dogs"."id"
JOIN 
"user" on "dogs"."user_id" = "user"."id"
`

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

router.put("/:id", async (req, res) => {
  console.log(req.body)
  const requestId = req.params.id;
  const sqlText = `
    UPDATE "hosting_request"
    SET "status" = $1,
        "confirmed_volunteer_id" = $2
    WHERE "id" = $3;
  `;

    
  const status = req.body.status;
  const confirmed_volunteer_id =req.body.confirmed_volunteer_id
  const sqlParams = [status, confirmed_volunteer_id, requestId];

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
