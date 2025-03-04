import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function main(){
    try{
        await prisma.$connect();
        console.log('Connected to the database successfully!');
    }catch(error: any){
        console.error('Error connecting to the database:', error);
        process.exit(1); 
    }finally{
        await prisma.$disconnect();
    }
}


main().catch((e) => {
    console.error(e);
    process.exit(1);
});