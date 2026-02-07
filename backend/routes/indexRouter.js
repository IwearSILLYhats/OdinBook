const express = require("express");
const indexRouter = express.Router();
const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

indexRouter.post("/signup", (req, res) => {
  try {
    return res.json({ message: "Signing up new user" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});
indexRouter.login("/login", (req, res) => {
  try {
    return res.json({ message: "Logging in user" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});

module.exports = indexRouter;
