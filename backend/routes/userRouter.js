const express = require("express");
const userRouter = express.Router();
const { prisma } = require("../lib/prisma");
const { passport } = require("../util/auth");

userRouter.get("/:userid", (req, res) => {
  try {
    //TODO - set up pulling individual user
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

module.exports = userRouter;
