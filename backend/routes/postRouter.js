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
postRouter.get("/:postid", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      select: {
        id: true,
        published_time: true,
        edited: true,
        parent: true,
        author: {
          include: {
            id: true,
            username: true,
            profile_img_url: true,
          },
        },
      },
      where: {
        published: true,
        id: req.params.postid,
      },
    });
    if (!post) throw new Error("Post not found");
    return res.json({ post });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});
postRouter.post(
  "/drafts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newDraft = await prisma.post.create({
        data: {
          author: {
            connect: { id: req.user.id },
          },
          published: false,
          content: req.body.content,
        },
      });
      return res.json({
        message: "Draft created successfully!",
        draft: newDraft,
        error: null,
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
      let data = {};
      if (req.body.content) data.content = req.body.content;
      if (req.body.published === true) {
        data.published = true;
        data.published_time = new Date();
      }
      const updatedPost = await prisma.post.update({
        where: {
          id: req.body.id,
        },
        data: data,
      });
      return res.json({
        message: "Draft updated successfully!",
        draft: updatedPost,
        error: null,
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
    try {
      const originalPost = await prisma.post.findUnique({
        where: {
          id: req.body.id,
        },
      });
      if (!originalPost) {
        throw new Error("Post not found");
      }
      if (originalPost.author_id !== req.user.id) {
        throw new Error("User not authorized to edit this post");
      }
      await prisma.post.update({
        where: {
          id: req.body.id,
        },
        data: {
          content: req.body.content,
          edited: new Date(),
        },
      });
      return res.json({ message: "Post updated successfully" });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);
postRouter.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: req.body.id,
        },
      });
      if (!post) {
        throw new Error("Post not found");
      }
      if (post.author_id !== req.user.id) {
        throw new Error("User not authorized to delete this post");
      }
      await prisma.post.delete({
        where: {
          id: req.body.id,
        },
      });
      return res.json({ success: "Post successfully deleted." });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);

module.exports = postRouter;
