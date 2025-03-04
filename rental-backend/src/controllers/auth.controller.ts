import { Request, Response} from "express";
import { validateUser } from "../utils/validator";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class AuthController {
  /*
    #swagger.tags = ['Auth']
     */

  public static register = async (req: Request, res: Response) => {
    try {
      
      const { firstName , lastName , email, password, role} = req.body
      const user = validateUser({ firstName, lastName, email, password, role });

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
        user: newUser
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
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({
        success: true,
        message: "successfully logged in",
        token,
      });
    } catch (error: any) {
      console.log("Error while logging in: ", error?.message)
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}
