const express = require("express");
const userRouter = express.Router();
const { prisma } = require("../lib/prisma");
const { passport } = require("../util/auth");

userRouter.get(
  "/explore",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          id: {
            not: req.user.id,
          },
          followed_by: {
            none: {
              follower_id: req.user.id,
            },
          },
        },
        take: 50,
      });
      if (!users) throw new Error("No users found");
      return res.json({ users });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);
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
          avatar: true,
          banner: true,
          bio: true,
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
              avatar: true,
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
              avatar: true,
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
                  avatar: true,
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
userRouter.post(
  "/follow/:userid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const follow = await prisma.follow.findUnique({
        where: {
          follower_id_following_id: {
            follower_id: req.user.id,
            following_id: req.params.userid,
          },
        },
        select: {
          follower_id: true,
          following_id: true,
        },
      });
      if (follow) {
        await prisma.follow.delete({
          follower_id: req.user.id,
          following_id: req.params.userid,
        });
        return res.json({ message: "User unfollowed" });
      } else {
        await prisma.follow.create({
          data: {
            follower: {
              connect: {
                id: req.user.id,
              },
            },
            following: {
              connect: {
                id: req.params.userid,
              },
            },
          },
        });
        return res.json({ message: "User followed successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);
userRouter.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { avatar, banner, bio } = req.body;
      if (!avatar && !banner && !bio) {
        throw new Error("No profile changes sent in request");
      }
      let data = {};
      if (bio) data.bio = bio;
      if (banner && !req.user.banner) data.banner = true;
      if (avatar && !req.user.avatar) data.avatar = true;
      if (avatar || banner) data.profile_updated = new Date();
      const updatedProfile = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: data,
      });
      if (updatedProfile) {
        return res.json({ success: updatedProfile });
      }
      throw new Error("Issue updating user profile");
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
);
module.exports = userRouter;
