const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');

const dogRouter = require('./routes/dog.router')
const raiserRouter = require('./routes/raiserDog.router')
const sitterRequestRouter = require('./routes/sitterRequest.router')
const adminRouter = require('./routes/admin.router')
const sitterRouter = require('./routes/sitter.router');
const profilesRouter = require('./routes/profiles.router')
// const mailRouter = require('./routes/mail.router');


// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/dog', dogRouter);
app.use('/api/sitterRequest', sitterRequestRouter)
app.use('/api/raiser-dog', raiserRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin-profile', profilesRouter);
app.use('/api/sitter', sitterRouter);

// app.use('/api/mail', mailRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
