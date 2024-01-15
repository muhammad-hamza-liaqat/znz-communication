const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  // Store only the email in the session
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  // Retrieve user details using the stored email
  const user = {
    email: email,
    // Add other user details as needed
  };
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.client_ID_google,
      clientSecret: process.env.client_secret_google,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // Save only necessary information to the session
      const user = {
        email: profile.email,
        // Add other user details as needed
      };
      return done(null, user);
    }
  )
);
