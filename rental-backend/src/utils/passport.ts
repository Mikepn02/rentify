import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { generateToken } from "./jwt";

dotenv.config();
const prisma = new PrismaClient();

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CLIENT_CALLBACK as string,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await prisma.user.findUnique({
            where: { email: profile.emails?.[0].value },
          });
  
          if (!user) {
            user = await prisma.user.create({
              data: {
                firstName: profile.name?.givenName || "GoogleUser",
                lastName: profile.name?.familyName || "",
                email: profile.emails?.[0].value || "",
                password: null,
                role: "RENTER",
              },
            });
          }
          const payload = {
            id: user.id,
            role: user.role,
            email: user.email,
          }
          const token = generateToken(payload);
          return done(null, { user, token });
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id as string } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
