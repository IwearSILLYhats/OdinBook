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
      return res.json({ error: error });
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
      newPost.published = published || true;
      const createPost = await prisma.post.create({ data: newPost });
      return res.json({ message: "Post creation successful" });
    } catch (error) {
      console.log(error);
      return res.json({ message: error });
    }
  },
);

module.exports = postRouter;
