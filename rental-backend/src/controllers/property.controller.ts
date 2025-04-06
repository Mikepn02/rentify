import { Request, Response } from "express";
import PropertyService from "../services/property.service";
import cloudinary from "../utils/cloudinary";

export default class PropertyController {
  /*
    #swagger.tags = ['Property']
     */

  public static createProperty = async (req: Request, res: Response) => {

    if(!req.user){
      throw new Error("User not authenticated");
    }
    //@ts-ignore
    const userId = req.user;
    console.log("User ID: ", userId);
    try {
      const files = req.files as Express.Multer.File[];

     const imageUploadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result?.secure_url || "");
          }
        );
        if (file.buffer) {
          uploadStream.end(file.buffer);
        } else {
          reject(new Error("File buffer is missing"));
        }
      });
    });
      const imageUrls = await Promise.all(imageUploadPromises);
      const propertyData = {
        ...req.body,
        images: imageUrls,
      }
      
      console.log("Property data: ", propertyData);
      const newProperty = await PropertyService.createProperty(userId,propertyData);
      res.status(200).json({
        success: true,
        message: "Property created successfully",
        property: newProperty,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  public static getPropertyById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const property = await PropertyService.findPropertyById(id);
      res.status(200).json({
        success: true,
        property,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  public static getAllProperties = async (req: Request, res: Response) => {
    try {
      const properties = await PropertyService.findAllProperties();
      res.status(200).json({
        success: true,
        properties,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  public static updateProperty = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const property = await PropertyService.updateProperty(id, req.body);
      res.status(200).json({
        success: true,
        property,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  public static deleteProperty = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const property = await PropertyService.deleteProperty(id);
      res.status(200).json({
        success: true,
        message: "Successfully deleted Property",
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}
