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
indexRouter.get("/login/google", passport.authenticate("google"));

indexRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const secure_cookie = await signToken({ id: req.user.user.id });
      res.cookie("secure_session", secure_cookie, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      res.cookie("session_time", "", {
        maxAge: 1000 * 60 * 60,
        sameSite: "strict",
      });
      return res.redirect(process.env.FRONTEND);
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
);
indexRouter.get("/login/guest", async (req, res) => {
  try {
    const guest = await prisma.user.upsert({
      where: {
        username: "Guest",
      },
      update: {},
      create: {
        username: "Guest",
      },
    });
    const secure_cookie = await signToken({ id: guest.id });
    res.cookie("secure_session", secure_cookie, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.cookie("session_time", "", {
      maxAge: 1000 * 60 * 60,
      sameSite: "strict",
    });
    return res
      .status(200)
      .json({ message: "Logging in as guest", error: null });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});

indexRouter.post(
  "/login/local",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    try {
      const secure_cookie = await signToken({ id: req.user.id });
      res.cookie("secure_session", secure_cookie, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      res.cookie("session_time", "", {
        maxAge: 1000 * 60 * 60,
        sameSite: "strict",
      });
      return res.status(200).json({ message: "Logging in user", error: null });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
);
indexRouter.get("/logout", (req, res) => {
  try {
    res.cookie("secure_session", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.cookie("session_time", "", {
      maxAge: 0,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logging out user" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});
module.exports = indexRouter;
