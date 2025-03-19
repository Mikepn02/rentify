import { Request, response, Response } from "express";
import { validateUser } from "../utils/validator";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { PrismaClient } from "@prisma/client";
import passport from "../utils/passport";
import UserService from "../services/user.service";

const prisma = new PrismaClient();

export default class AuthController {
  /*
    #swagger.tags = ['Auth']
     */

  public static register = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, phoneNumber, password, role } =
        req.body;
      const user = validateUser({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
      });

      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User with that email already exists",
        });
      }

      const newUser = await prisma.user.create({
        data: {
          ...user,
          password: await hashPassword(user.password),
        },
      });

      res.status(201).json({
        success: true,
        message: "successfully registered!!",
        user: newUser,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  /*
    #swagger.tags = ['Auth']
     */
  public static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({
          message: "Invalid Email or Password",
        });
      }

      if (user.password === null) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const token = generateToken(user.id);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
        secure: true,
        domain:
          process.env.HOST === "development"
            ? "localhost"
            : process.env.PROD_DOMAIN,
      });
      res.status(200).json({
        success: true,
        message: "successfully logged in",
        user,
        token,
      });
    } catch (error: any) {
      console.log("Error while logging in: ", error?.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  public static googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

  public static googleAuthCallback = (req: Request, res: Response) => {
    passport.authenticate("google", { session: false }, (error, data) => {
      if (error) {
        console.error("Google authentication error:", error);
        return res.redirect(
          "http://localhost:5000/login?error=GoogleAuthError"
        );
      }

      if (!data?.user) {
        console.error("Google authentication failed: No user data returned.");
        return res.redirect(
          "http://localhost:5000/login?error=AuthenticationFailed"
        );
      }

      if (!data?.token) {
        console.error("Token generation failed for user:", data.user);
        return res.redirect(
          "http://localhost:5000/login?error=TokenGenerationFailed"
        );
      }

      res.cookie("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain:
          process.env.HOST === "development"
            ? "localhost"
            : process.env.PROD_DOMAIN,
      });

      console.log("Authenticated user:", data?.user);
      console.log("Generated token:", data?.token);

      res.redirect(`http://localhost:5000/dashboard`);
    })(req, res);
  };

  public static logout = async (req: Request, res: Response) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain:
          process.env.HOST === "localhost"
            ? "localhost"
            : process.env.PROD_DOMAIN,
      });

      res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getLoggedInUser = async (req: Request, res: Response) => {

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      return res.status(200).json({
        user,
        success: true,
      });
    } catch (error: any) {
      console.error("Here is error while getting user: ", error?.message);
    }
  };

  public static getUserById = async(req: Request , res:Response) => {
    const id = req.params.id
    try{
      const user = await UserService.findUserById(id);
      res.status(200).json({
        success: true,
        user
      })
    }catch(error: any){
      console.log("Error while getting user by id: ", error?.message)
    }
  }
}
