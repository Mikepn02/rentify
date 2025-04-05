import { PrismaClient } from "@prisma/client";
import { validateProperty } from "../utils/validator"


const prisma = new PrismaClient();

export default class PropertyService{
    

    public static createProperty = async(data: any) => {
        try{

            const property = validateProperty(data);
            return await prisma.property.create({
                data: property
            })

        }catch(error: any){
            console.error("Error while creating property: ", error)
        }
    }


    public static findPropertyById = async(id: string) => {
        try{
            const property = await prisma.property.findUnique({
                where: {
                    id
                }
            })

            return property;
        }catch(error: any){
            console.error("Error while create property: ", error?.message)
        }
    }


    public static findAllProperties = async() => {
        try{
            const properties = await prisma.property.findMany();
        return properties;
        }catch(error: any){
            console.error("Error while retrieving all properties: ", error?.message)
        }
    }


    public static updateProperty = async(id: string , data: any) => {
        try{
            const property = validateProperty(data);
            const updatedProperty = await prisma.property.update({
                where: {
                    id
                },
                data: property
            })

            return updatedProperty
        }catch(error: any){
            console.error("Error while updating the property: ", error?.message)
        }
    }

    public static deleteProperty = async(id: string) => {
        try{
            return prisma.property.delete({
                where: { 
                    id
                }
            })
        }catch(error: any){
            console.error("Error while deleting property: ", error?.message)
        }
    }
}