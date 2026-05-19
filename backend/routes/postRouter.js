const express = require("express");
const postRouter = express.Router();
const { prisma } = require("../lib/prisma");
const { passport } = require("../util/auth");

postRouter.get(
  "/drafts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // fetches all unpublished posts by user
    try {
      const drafts = await prisma.post.findMany({
        where: {
          author_id: req.user.id,
          published: false,
        },
      });
      return res.json({ drafts });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);
postRouter.post(
  "/drafts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newDraft = await prisma.post.create({
        author: {
          connect: { id: req.user.id },
        },
        data: {
          published: false,
          content: req.body.content,
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);
postRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { content, published } = req.body;
      let newPost = {
        author: {
          connect: { id: req.user.id },
        },
      };
      if (content) newPost.content = content;
      newPost.published = true;
      newPost.published_time = new Date();
      const createPost = await prisma.post.create({ data: newPost });
      return res.json({ message: "Post creation successful" });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);
postRouter.patch(
  "/drafts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // update existing draft
    try {
      const draft = await prisma.post.findUnique({
        where: {
          id: req.body.id,
        },
      });
      if (!draft) {
        throw new Error("Draft not found");
      }
      if (draft.author_id !== req.user.id) {
        throw new Error("User not authorized to edit this post");
      }
      const updatedPost = await prisma.post.update({
        where: {
          id: req.body.id,
        },
        data: {
          content: req.body.content,
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);
postRouter.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // edit existing post
  },
);
postRouter.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // TODO delete function
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);

module.exports = postRouter;
