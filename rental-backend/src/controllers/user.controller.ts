import { Request, Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
  /*
    #swagger.tags = ['User']
     */
  public static getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await UserService.findUserById(id);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
}
