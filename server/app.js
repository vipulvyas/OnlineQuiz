const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth/auth");
const quizRouter = require("./routes/quiz");

mongoose.connect(
  process.env.MONGO_URL_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log("error occured is:", err);
    } else {
      console.log("connected to database successfully");
    }
  }
);


const app = express();



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/userAuth", authRouter);
app.use("/quiz", quizRouter);

