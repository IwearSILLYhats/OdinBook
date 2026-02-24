const passport = require("passport");
const oauthStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const { prisma } = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
}

async function encryptPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}
async function verifyPassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
async function signToken(payload) {
  const secret = process.env.SECRET;
  const token = await jwt.sign(payload, secret);
  return token;
}

passport.use(
  new LocalStrategy(async function verify(username, password, done) {
    try {
      const user = await prisma.auth.findUnique({
        where: {
          provider: "LOCAL",
          provider_id: username,
        },
        include: {
          user: true,
        },
      });
      if (!user) {
        return done(null, false);
      }
      if (!verifyPassword(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done({ error });
    }
  }),
);

passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.SECRET,
    },
    async function verify(payload, done) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            username: payload.username,
          },
        });
        if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
        return done({ error });
      }
    },
  ),
);
module.exports = { passport, encryptPassword, verifyPassword, signToken };
