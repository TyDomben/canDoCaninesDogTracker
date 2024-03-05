const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const phone = req.body.phone;
  const address = req.body.address;
  const email = req.body.email;

  const queryText = `INSERT INTO "user" ("name", "username", "password", "phone", "address", "email")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [name, username, password, phone, address, email])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.patch("/:id", async (req, res) => {
  // Extract the user ID from the request parameters
  const userId = req.params.id;
  // Extract the updates from the request body
  const updates = req.body;

  try {
    // Start building the SQL query to update the user
    let queryText = `UPDATE "user" SET `;
    // Initialize an array to hold the query parameters
    const queryParams = [];

    // Loop through each property in the updates object
    for (const key in updates) {
      // Log the current property being processed
      console.log("key:", key);

      // Check if the current property is directly owned by the updates object
      if (updates.hasOwnProperty(key)) {
        // Add the property name and a placeholder for its value to the SQL query
        queryText += `"${key}" = $${queryParams.length + 1}, `;
        // Add the property value to the query parameters array
        queryParams.push(updates[key]);
      }
    }
    // Remove the extra comma and spaces from the end of the query
    queryText = queryText.slice(0, -2);

    // Add the WHERE clause to specify which user to update
    queryText += ` WHERE "id" = $${queryParams.length + 1}`;
    // Add the user ID as the last query parameter
    queryParams.push(userId);

    // Log the final SQL query
    console.log("Query Text:", queryText);

    // Execute the SQL query with the provided parameters
    pool
      .query(queryText, queryParams)
      .then((result) =>
        // Send a 200 OK response if the update was successful
        res.sendStatus(200)
      )
      .catch((error) => {
        // Log any errors that occur during the database operation
        console.log("Error updating user profile:", error);
        // Send a 500 Internal Server Error response if an error occurs
        res.sendStatus(500);
      });
  } catch (err) {
    // Catch any errors that occur during the try block (unlikely in this case)
    console.log("Error updating user profile:", err);
    // Send a 500 Internal Server Error response if an error occurs
    res.sendStatus(500);
  }
});

module.exports = router;
