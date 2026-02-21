const express = require("express");
const indexRouter = express.Router();
const { prisma } = require("../lib/prisma");
const { passport, encryptPassword, signToken } = require("../util/auth");

indexRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirm } = req.body;
    console.log(req.body);
    if (password !== confirm) {
      return res.status(401).json({
        validation: {
          password: "Password and password confirm must match",
        },
      });
    }
    const userCheck = await prisma.auth.findUnique({
      where: {
        provider: "LOCAL",
        provider_id: email,
      },
    });
    if (userCheck) {
      return res
        .status(401)
        .json({ message: "An account with that email already exists" });
    } else {
      const hashedPassword = await encryptPassword(password);
      const newUser = await prisma.user.create({
        data: {
          auths: {
            create: {
              provider: "LOCAL",
              provider_id: email,
              password: hashedPassword,
            },
          },
          username: username,
        },
      });
    }
    return res.json({ message: "Signing up new user" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});
indexRouter.get("/login/google", (req, res) => {
  res.status(200).json({ message: "Google login route" });
});

indexRouter.post(
  "/login/local",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    try {
      const secure_cookie = signToken(req.user.id);
      res.cookie("secure_session", secure_cookie, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      res.cookie("session_time", {
        maxAge: 1000 * 60 * 60,
        sameSite: "strict",
      });
      return res.json({ message: "Logging in user" });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
);
module.exports = indexRouter;
