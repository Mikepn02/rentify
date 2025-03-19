import { PrismaClient } from "@prisma/client"




const prisma = new PrismaClient()
export default class UserService{

    public static findUserById = async(id: string) => {
        try{
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            return user;
        }catch(error: any){
            console.error("Error while getting by Id: ", error?.message)
        }
    }
}