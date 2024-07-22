const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User");
require("dotenv").config();
passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const domain = email.split("@")[1];

        // Check if the email domain is "srmap.edu.in"
        if (domain !== "srmap.edu.in") {
          return done(null, false, { message: "Unauthorized domain" });
        }

        const displayName =
          profile.displayName.split(" | ")[0] || profile.displayName;
        const rollNo = profile.displayName.split(" | ")[1] || "";
        const photoUrl = profile.photos[0].value;
        const role = assignRole(email);
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName.split(" | ")[0];

        const user = await User.findOneAndUpdate(
          { email },
          {
            email,
            displayName,
            photoUrl,
            rollNo,
            role,
            firstName,
            lastName,
          },
          { new: true, upsert: true } // `upsert: true` will create a new document if no match is found
        );

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Functions

const assignRole = (email) => {
  const domain = email.split("@")[1];
  if (domain !== "srmap.edu.in") {
    return "Unknown";
  }
  const localPart = email.split("@")[0];
  if (localPart.includes("_")) {
    return "Student";
  } else if (localPart.includes(".")) {
    return "Faculty";
  } else {
    return "Unknown";
  }
};

module.exports = passport;
