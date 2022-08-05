const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.set("view engine", "ejs");
app.get("/here", (req, res) => {
  console.log("here");
  res.render("usersDisplay", { text: "user" });
});

const userRouter = require("./routes/users");
// define some user related routing rules in file users.js under the folder routes and then use all the routing rules under path "/users"
app.use("/users", userRouter);

app.listen(3000);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}
