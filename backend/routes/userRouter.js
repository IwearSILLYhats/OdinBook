const express = require("express");
const userRouter = express.Router();
const { prisma } = require("../lib/prisma");
const { passport } = require("../util/auth");

userRouter.get("/:userid", async (req, res) => {
  try {
    // Fetches user's profile, posts, and replies
    const [user, posts, replies] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: req.params.userid,
        },
        select: {
          id: true,
          username: true,
          profile_img_url: true,
          _count: {
            select: {
              following: true,
              followed_by: true,
              posts: {
                where: {
                  published: true,
                },
              },
            },
          },
        },
      }),
      prisma.post.findMany({
        where: {
          author_id: req.params.userid,
          published: true,
          parent_id: null,
        },
        select: {
          content: true,
          published_time: true,
          edited: true,
          id: true,
          likes: {
            where: {
              user_id: req.params.userid,
            },
          },
          _count: {
            select: {
              likes: true,
              replies: true,
            },
          },
          author: {
            select: {
              id: true,
              profile_img_url: true,
              username: true,
            },
          },
        },
        orderBy: {
          published_time: "desc",
        },
        take: 25,
      }),
      prisma.post.findMany({
        where: {
          author_id: req.params.userid,
          published: true,
          parent_id: {
            not: null,
          },
        },
        select: {
          content: true,
          published_time: true,
          edited: true,
          id: true,
          likes: {
            where: {
              user_id: req.params.userid,
            },
          },
          _count: {
            select: {
              likes: true,
              replies: true,
            },
          },
          author: {
            select: {
              id: true,
              profile_img_url: true,
              username: true,
            },
          },
          parent: {
            select: {
              content: true,
              published_time: true,
              edited: true,
              id: true,
              likes: {
                where: {
                  user_id: req.params.userid,
                },
              },
              _count: {
                select: {
                  likes: true,
                  replies: true,
                },
              },
              author: {
                select: {
                  id: true,
                  profile_img_url: true,
                  username: true,
                },
              },
            },
          },
        },
        orderBy: {
          published_time: "desc",
        },
        take: 25,
      }),
    ]);

    if (!user) throw new Error("User not found");
    return res.json({ user, posts, replies });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

module.exports = userRouter;
