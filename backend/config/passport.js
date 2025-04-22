const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Your Google OAuth Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google OAuth Client Secret
      callbackURL: "http://localhost:8080/auth/google/callback", // Callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user profile and store the user info (e.g., in a DB)
      // Example: Find or create user in your database
      console.log("Google Profile", profile);
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
