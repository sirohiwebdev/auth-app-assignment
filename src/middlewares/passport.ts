import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { UserModel } from "../lib/db/models";

import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { UserLoginType } from "../lib/db/entities";

const verifySocialLogin = (
  email: string,
  firstName: string,
  lastName: string,
  displayName: string,
  type: UserLoginType,
  cb: VerifyCallback,
) => {
  const userModel = new UserModel();
  try {
    userModel.get(email).then((cred) => {
      if (!cred) {
        // The account at Google has not logged in to this app before.  Create a
        // new user record and associate it with the Google account.

        userModel
          .insert({
            email,
            loginType: type,
            password: "",
            firstName,
            lastName,
          })
          .then((d) => {
            const user = {
              id: d.insertedId,
              name: displayName,
            };
            return cb(null, user);
          })
          .catch((e) => {
            cb(e);
          });
      } else {
        // The account at Google has previously logged in to the app.  Get the
        // user record associated with the Google account and log the user in.
        const user = {
          id: cred.email,
          name: displayName,
        };
        return cb(null, user);
      }
    });
  } catch (e) {
    return cb(e as any);
  }
};

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env["FACEBOOK_CLIENT_ID"] as string,
      clientSecret: process.env["FACEBOOK_CLIENT_SECRET"] as string,
      callbackURL:
        `${process.env["SERVER_HOST"]}/v1/auth/redirect/facebook` as string,
      state: true,
    },
    function verify(accessToken, refreshToken, profile, done) {
      console.log(profile);
      const email = profile._json.email as string;
      const fName = profile.displayName.split(" ")[0];
      const lName = profile.displayName.split(" ")[1] || " ";

      verifySocialLogin(email, fName, lName, profile.displayName, "fb", done);
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string,
      callbackURL:
        `${process.env["SERVER_HOST"]}/v1/auth/redirect/google` as string,
      scope: ["profile"],
      state: true,
    },
    function verify(accessToken, refreshToken, profile, done) {
      const email = profile._json.email as string;
      const fName = profile.displayName.split(" ")[0];
      const lName = profile.displayName.split(" ")[1] || " ";

      verifySocialLogin(
        email,
        fName,
        lName,
        profile.displayName,
        "google",
        done,
      );
    },
  ),
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    // @ts-ignore
    cb(null, { id: user.id, username: user.email, name: user.firstName });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    // @ts-ignore
    return cb(null, user);
  });
});

export default passport;
