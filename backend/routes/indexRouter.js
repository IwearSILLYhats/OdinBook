const express = require("express");
const indexRouter = express.Router();
const { prisma } = require("../lib/prisma");
const {
  localAuth,
  jwtAuth,
  googleAuth,
  googleRedirect,
  encryptPassword,
  signToken,
} = require("../util/auth");
const postRouter = require("./postRouter");
const userRouter = require("./userRouter");
const supabase = require("../util/supabase");
const crypto = require("crypto");
indexRouter.use("/posts", postRouter);
indexRouter.use("/users", userRouter);

indexRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirm } = req.body;
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
    return res.json({ message: "Signing up new user", error: null });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});
indexRouter.get("/login/google", googleAuth);

indexRouter.get("/oauth2/redirect/google", googleRedirect, async (req, res) => {
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
    return res.redirect(process.env.FRONTEND + "/app");
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});
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

indexRouter.post("/login/local", localAuth, async (req, res) => {
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
    return res.status(200).json({ message: "Logging in user", error: null });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});
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
indexRouter.get("/dashboard", jwtAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });
  return res.status(200).json({ user });
});
indexRouter.get("/upload/:type", jwtAuth, async (req, res) => {
  try {
    const type = req.params.type;
    if (type === "avatars") {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUploadUrl(`${req.user.id}.webp`, {
          upsert: true,
        });
      if (error) throw new Error("Issue fetching signedUploadUrl", error);
      return res.json({ url: data.signedUrl });
    } else if (type === "banners") {
      const { data, error } = await supabase.storage
        .from("banners")
        .createSignedUploadUrl(`${req.user.id}.webp`, {
          upsert: true,
        });
      if (error) throw new Error("Issue fetching signedUploadUrl", error);
      return res.json({ url: data.signedUrl });
    } else if (type === "attachments") {
      const filename = `${crypto.randomUUID()}.webp`;
      const { data, error } = await supabase.storage
        .from("attachments")
        .createSignedUploadUrl(filename);
      if (error) throw new Error("Issue fetching signedUploadUrl", error);
      return res.json({ url: data.signedUrl });
    } else {
      throw new Error("Incorrect/No upload type provided");
    }
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});
module.exports = indexRouter;
