import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import asyncHandler from "./asyncHandler.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
// import { sendVerificationEmail } from "../utils/emailFunctions.js";

export const configureFacebookAuth = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
      },
      asyncHandler(async (accessToken, refreshToken, profile, done) => {
        // Check if the user exists in your database, if not, create one
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            // You might want to generate a random password or handle it differently
            isVerified: true, // Assuming Facebook email is already verified
          });

          //   sendVerificationEmail(user.email, user.verificationToken);
        }

        // Log in the user
        generateToken(done, user._id);
      })
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};
