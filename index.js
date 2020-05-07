require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const passport = require('passport');
// const expressSession = require('express-session');

const app =express();


//Importing My routes
const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postsRoute');



//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.use(expressSession({secret: 'mySecretKey'}));
// app.use(passport.initialize());
// app.use(passport.session());


//My Routes
app.use("/api", authRoute);
app.use("/api", userRoute);
// app.use("/api", postRoute);


//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
