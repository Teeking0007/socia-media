const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const AuthRoute = require('./Routes/AuthRoute.js')
const UsersRoute = require('./Routes/UsersRoute.js');
const PostsRoute = require('./Routes/PostsRoute.js');
const UploadRoute = require('./Routes/UploadRoute.js');

const app = express();

// to serve images to the react app
app.use(express.static('public'))
app.use('/images', express.static('images'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
    app.listen(process.env.PORT, () => console.log("app is listening"))
  )
  .catch((err) => console.log(err));

  app.use('/auth', AuthRoute)
  app.use('/user', UsersRoute)
  app.use('/post', PostsRoute)
  app.use('/upload', UploadRoute)
