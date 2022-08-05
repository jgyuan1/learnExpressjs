const express = require("express");

const router = express.Router();
const users = [{ name: "Kyle" }, { name: "Sally" }];
router.get("/", (req, res) => {
  res.send("user list");
});

router.get("/new", logger, (req, res) => {
  res.render("newUserSubmit");
});

router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ name: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("error");
    res.render("newUserSubmit", { firstName: req.body.firstName });
  }
});
// routing rules go top to bottom
// static routing rule /new will run before this dynamic routing rule
router.get("/:id", (req, res) => {
  res.send(`Get user with id ${req.params.id}`);
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(`Get user with id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with id ${req.params.id}`);
  });

function logger(req, res, next) {
  console.log("customed middleware in /users path");
  next();
}
module.exports = router;
