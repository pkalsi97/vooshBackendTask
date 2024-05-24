const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'That email is not registered' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { githubId: profile.id } });
      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          githubId: profile.id
        });
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
